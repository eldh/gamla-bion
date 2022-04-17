import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import customStylesheetUrl from "./styles/extra.css";
import faviconUrl from "~/assets/favicon.png";
import { graphcms } from "./utils/cms";
import { Nav } from "./components/nav";
import { gql } from "graphql-request";
import { Footer } from "./components/footer";

const RootInfoQuery = gql`
  query RootInfoQuery {
    topNav: navigation(where: { identifier: "top-nav" }) {
      id
      articles {
        title
        slug
      }
    }
    footerNav: navigation(where: { identifier: "footer-nav" }) {
      id
      articles {
        title
        slug
      }
    }
    siteInfo(where: { identifier: "main" }) {
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
  return json(await graphcms.request(RootInfoQuery));
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: customStylesheetUrl },
    { rel: "icon", href: faviconUrl },
  ];
};

export const meta: MetaFunction = ({ data }) => {
  return {
    charset: "utf-8",
    title: data.siteInfo.title,
    viewport: "width=device-width,initial-scale=1",
  };
};

export default function App() {
  return (
    <html
      lang="en"
      className="bg-gray-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50"
    >
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <PageWrapper />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function PageWrapper() {
  let data = useLoaderData();
  return (
    <main className="justify-stretch relative flex h-full min-h-screen flex-col content-between items-stretch ">
      <Nav navigation={data.topNav} />
      <Outlet />
      <Footer navigation={data.footerNav} />
    </main>
  );
}
