import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { gql } from "graphql-request";
import { RichText } from "~/components/RichText";
import { graphcms } from "~/utils/cms";

const ArticleQuery = gql`
  query ArticleQuery($article: String!) {
    article(where: { slug: $article }) {
      title
      slug
      body {
        text
        references {
          ... on Event {
            __typename
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
          ... on Carousel {
            __typename
            id
            images {
              id
              url
              height
              width
            }
          }
          ... on Asset {
            __typename
            id
            url
            height
            width
          }
        }
        html
      }
    }
  }
`;

export const meta: MetaFunction = ({ data, location }) => ({
  "og:title": `Gamla Bion — ${data.article.title}`,
  "og:description": `${data.article.body.text.substr(0, 500).replace(
    /\\n/g,
    `
    `
  )}…`,
  "og:type": "article",
});

export let loader = async ({ params }: any) => {
  return json(
    await graphcms.request(ArticleQuery, { article: params.article })
  );
};

export default function ArticleRoute() {
  let { article } = useLoaderData();

  return (
    <article className="mx-auto mb-auto w-full max-w-xl px-6 sm:px-0 md:max-w-2xl">
      <h1>{article.title}</h1>
      <RichText body={article.body} />
    </article>
  );
}
