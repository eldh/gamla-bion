import { NavLink } from "@remix-run/react";
import { Bio } from "./bio";

export function Nav({ navigation }: any) {
  return (
    <>
      <div className="mb-4 shrink-0 opacity-0" style={{ height: "83px" }} />
      <div className="row fixed left-0 top-0 flex w-full bg-slate-50 bg-opacity-50 py-4 backdrop-blur-md dark:border-b  dark:border-b-slate-800 dark:bg-slate-900 dark:bg-opacity-60">
        <nav
          className="m-auto flex w-full max-w-xl items-center gap-6 px-6 sm:px-0 md:max-w-2xl "
          style={{ gap: 24 }}
        >
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-700  dark:text-blue-300" : ""
            }
            key="home"
            to="/"
          >
            <span className="flex items-center gap-6">
              <Bio
                style={{ maxWidth: "80px" }}
                className="text-slate-900 dark:text-slate-50"
              />
            </span>
          </NavLink>
          {navigation.articles.map((a: { slug: string; title: string }) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-700  dark:text-blue-300" : ""
              }
              key={a.slug}
              to={`/${a.slug}`}
            >
              {a.title}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}
