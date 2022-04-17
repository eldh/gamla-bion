import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { gql } from "graphql-request";
import { RichText } from "~/components/RichText";
import { graphcms } from "~/utils/cms";

const ArticleQuery = gql`
  query FrontPageArticleQuery($slug: String!) {
    article(where: { slug: $slug }) {
      title
      slug
      body {
        references {
          ... on Event {
            id
            title
            description
            date
            image {
              url
            }
          }
        }
        html
      }
    }
  }
`;

export let loader = async ({ params }: any) => {
  return json(await graphcms.request(ArticleQuery, { slug: params.slug }));
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
