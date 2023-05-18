import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { gql } from "graphql-request";
import { Link } from "@remix-run/react";
import { FormattedDate } from "../components/FormattedDate";
import { graphcms } from "~/utils/cms";
import { Event } from "~/components/Event";

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
export const meta: MetaFunction = () => ({
  "og:title": `Program`,
  "og:description": `Program för Gamla Bion ${new Date().getFullYear()}`,
});
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
