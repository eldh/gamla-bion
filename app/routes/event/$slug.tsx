import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { gql } from "graphql-request";
import { graphcms } from "~/utils/cms";

const EventQuery = gql`
  query EventQuery($slug: String!) {
    event(where: { slug: $slug }) {
      id
      title
      description
      date
      slug
      image {
        url
        height
        width
      }
    }
  }
`;

export let loader = async ({ params }: any) => {
  return json(await graphcms.request(EventQuery, { slug: params.slug }));
};

export default function EventRoute() {
  let { event } = useLoaderData();
  const date = new Date(event.date);
  return (
    <article className="mx-auto mb-auto w-full max-w-xl px-6 sm:px-0 md:max-w-2xl">
      <h1 className="mb-2">{event.title}</h1>
      <span className="mb-4 flex text-slate-400">
        {date.toLocaleDateString("sv-SE")}{" "}
        {date.toLocaleTimeString("sv-SE", { timeStyle: "short" })}
      </span>{" "}
      {event.image && (
        <img
          className="mb-8 "
          src={event.image.url}
          alt={event.title}
          height={event.image.height}
          width={event.image.width}
        />
      )}
      <p>{event.description}</p>
    </article>
  );
}
