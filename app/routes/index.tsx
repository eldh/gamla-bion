import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { gql } from "graphql-request";
import { RichText } from "~/components/RichText";
import { graphcms } from "~/utils/cms";
const FrontPageArticleQuery = gql`
  query FrontPageArticleQuery {
    siteInfo(where: { identifier: "main" }) {
      title
      subtitle
      headerImage {
        url
        width
        height
      }
      frontPageText {
        html
        text
      }
    }
  }
`;
export const meta: MetaFunction = ({ data }) => ({
  "og:title": `${data.siteInfo.title}`,
  "og:description": `${data.siteInfo.frontPageText.text.substr(0, 500).replace(
    /\\n/g,
    `
    `
  )}…`,
});
export let loader = async () => {
  return json(await graphcms.request(FrontPageArticleQuery));
};

export default function Index() {
  let data = useLoaderData();
  return (
    <>
      <img
        className="-mt-4 w-screen object-contain"
        width={data.siteInfo.headerImage.width}
        height={data.siteInfo.headerImage.height}
        src={data.siteInfo.headerImage.url}
        alt={data.siteInfo.title}
        style={{
          maxHeight: "calc(100vh - 17rem)",
        }}
      />
      <article className="m-auto mt-14 max-w-xl px-6 sm:px-0 md:max-w-2xl">
        <h1 className={"mb-4 mt-0 justify-center text-center"}>
          {data.siteInfo.title}
        </h1>
        <span className="flex justify-center  text-slate-500">
          {data.siteInfo.subtitle}
        </span>
        <RichText body={data.siteInfo.frontPageText} className="mt-14" />
      </article>
    </>
  );
}
