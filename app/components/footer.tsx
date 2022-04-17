import { NavLink } from "@remix-run/react";

export function Footer({ navigation }: any) {
  return (
    <>
      <div className="row mt-12 bg-slate-200 py-12 dark:bg-slate-800 ">
        <nav
          className="m-auto flex w-full max-w-xl items-center gap-6 px-6 sm:px-0 md:max-w-2xl "
          style={{ gap: 24 }}
        >
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
