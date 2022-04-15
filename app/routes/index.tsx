import { useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { GraphQLClient, gql } from "graphql-request";

const GetTopNavQuery = gql`
  query GetTopNavQuery {
    navigation(where: { identifier: "top-nav" }) {
      id
      articles {
        title
        slug
      }
    }
    general(where: { identifier: "main" }) {
      title
      subtitle
      headerImage {
        id
        url
      }
    }
  }
`;

export let loader = async () => {
  const graphcms = new GraphQLClient(
    "https://api-eu-central-1.graphcms.com/v2/cl1zeiza62e4f01xu919b0to2/master"
  );

  const data = await graphcms.request(GetTopNavQuery);

  return json(data);
};

export default function Index() {
  let data = useLoaderData();
  console.log("asas", data);

  return (
    <main className="relative min-h-screen bg-gray-50  dark:bg-gray-900 sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="lg:pb-18 relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pt-32">
              <h1 className=" text-slate-900 dark:text-slate-50">
                {data.general.title}
              </h1>
              <img
                src={data.general.headerImage.url}
                alt={data.general.title}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
