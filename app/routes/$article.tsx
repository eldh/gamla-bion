import { useLoaderData } from "@remix-run/react";
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
        references {
          ... on Event {
            __typename
            id
            title
            description
            date
            slug
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
