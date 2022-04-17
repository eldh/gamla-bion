import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { gql } from "graphql-request";
import { FormattedDate } from "~/components/FormattedDate";
import { graphcms } from "~/utils/cms";

const EventQuery = gql`
  query EventQuery($event: String!) {
    event(where: { slug: $event }) {
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
  return json(await graphcms.request(EventQuery, { event: params.event }));
};

export default function EventRoute() {
  let { event } = useLoaderData();
  return (
    <article className="mx-auto mb-auto w-full max-w-xl px-6 sm:px-0 md:max-w-2xl">
      <h2 className="mb-1 leading-none">{event.title}</h2>
      <span className="flex capitalize text-slate-400 dark:text-slate-500">
        <FormattedDate date={event.date} />
      </span>
      {event.image && (
        <img
          className="mb-8 mt-2"
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
