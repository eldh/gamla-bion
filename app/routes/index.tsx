import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { gql } from "graphql-request";
import { RichText } from "~/components/RichText";
import { graphcms } from "~/utils/cms";
const FrontPageArticleQuery = gql`
  query FrontPageArticleQuery {
    general(where: { identifier: "main" }) {
      title
      subtitle
      headerImage {
        url
        width
        height
      }
      frontPageText {
        html
      }
    }
  }
`;

export let loader = async () => {
  return json(await graphcms.request(FrontPageArticleQuery));
};

export default function Index() {
  let data = useLoaderData();
  return (
    <>
      <img
        className="-mt-4 w-screen"
        width={data.general.headerImage.width}
        height={data.general.headerImage.height}
        src={data.general.headerImage.url}
        alt={data.general.title}
        style={{
          objectFit: "cover",
          maxHeight: "calc(100vh - 17rem)",
        }}
      />
      <article className="m-auto mt-14 max-w-xl px-6 sm:px-0 md:max-w-2xl">
        <h1 className={"mb-4 mt-0 justify-center text-center"}>
          {data.general.title}
        </h1>
        <span className="flex justify-center  text-slate-500">
          {data.general.subtitle}
        </span>
        <RichText body={data.general.frontPageText} className="mt-14" />
      </article>
    </>
  );
}
