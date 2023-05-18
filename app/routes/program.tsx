import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { gql } from "graphql-request";
import { Link } from "@remix-run/react";
import { FormattedDate } from "../components/FormattedDate";
import { graphcms } from "~/utils/cms";

const ProgramQuery = gql`
  query Events($now: DateTime!, $startOfYear: DateTime!) {
    futureEvents: events(where: { date_gte: $now }, orderBy: date_ASC) {
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
    pastEvents: events(
      where: { date_lt: $now, date_gte: $startOfYear }
      orderBy: date_DESC
    ) {
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
export const meta: MetaFunction = ({ data }) => ({});
export let loader = async () => {
  return json(
    await graphcms.request(ProgramQuery, {
      now: new Date().toISOString(),
      startOfYear: new Date(new Date().getFullYear(), 0, 1).toISOString(),
    })
  );
};

export default function Program() {
  let data = useLoaderData();
  return (
    <article className="mx-auto mb-auto w-full max-w-xl px-6 sm:px-0 md:max-w-2xl">
      <h1>Kommande</h1>
      <div className={`text-slate-800 dark:text-slate-300`}>
        {data.futureEvents.map((e: any, index: number) => (
          <Event key={e.id} event={e} big={index === 0} />
        ))}
      </div>
      <h1 className="mt-24">Tidigare i år</h1>
      <div className={`text-slate-800 dark:text-slate-300`}>
        {data.pastEvents.map((e: any) => (
          <Event key={e.id} event={e} />
        ))}
      </div>
    </article>
  );
}

function Event({ event, big }: { event: any; big?: boolean }) {
  return (
    <div className="mb-8">
      <Link
        to={`/event/${event.slug}`}
        className="mb-0 flex capitalize hover:text-slate-600 hover:dark:text-white"
      >
        <h2 className="mb-1 leading-none">{event.title}</h2>
      </Link>
      <span className="mb-0 flex capitalize text-slate-400 dark:text-slate-500">
        <FormattedDate date={event.date} />
      </span>
      {big && event.image ? (
        <img
          className="mb-8 mt-2"
          src={event.image.url}
          alt={event.title}
          height={event.image.height}
          width={event.image.width}
        />
      ) : null}
      <p className={big ? "" : "line-clamp-3"}>{event.description}</p>
    </div>
  );
}
