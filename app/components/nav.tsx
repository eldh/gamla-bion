import type { NavLinkProps } from "@remix-run/react";
import { NavLink } from "@remix-run/react";
import * as React from "react";
import { Bio } from "./bio";

export function Nav(props: any) {
  return (
    <>
      <div className="mb-4 shrink-0 opacity-0 " style={{ height: "83px" }} />
      <div className="row  none fixed left-0 top-0 z-10  w-full bg-slate-50 bg-opacity-70 py-4 backdrop-blur-lg dark:border-b dark:border-b-slate-800  dark:bg-slate-900 dark:bg-opacity-60 dark:backdrop-blur-md">
        <DesktopNav {...props} />
        <MobileNav {...props} />
      </div>
    </>
  );
}

function DesktopNav({ navigation }: any) {
  return (
    <nav className="m-auto hidden w-full max-w-2xl items-center gap-6 whitespace-nowrap  sm:flex">
      <HomeLink />
      <ProgramLink />
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
  );
}

function MobileNav({ navigation }: any) {
  const [open, setOpen] = React.useState(false);
  return (
    <nav className="flex w-full items-center justify-between px-6 sm:hidden">
      <HomeLink onClick={() => setOpen(false)} />
      <div
        className={`hamburger ${
          open ? "hamburger__open" : ""
        } relative whitespace-nowrap before:bg-slate-900 after:bg-slate-900 dark:before:bg-slate-50  dark:after:bg-slate-50`}
        role="button"
        onClick={() => {
          setOpen((o) => !o);
        }}
      />

      <div
        className={`top-menu ${
          open ? "top-menu__open" : ""
        } w-full bg-white dark:bg-slate-900`}
      >
        <ProgramLink
          className={({ isActive }) =>
            `${
              isActive ? "text-blue-700  dark:text-blue-300" : ""
            } bre flex w-full select-none whitespace-nowrap border-b border-slate-200 py-4 px-6 dark:border-slate-800`
          }
          onClick={() => {
            setOpen((o) => !o);
          }}
        />
        {navigation.articles.map((a: { slug: string; title: string }) => (
          <NavLink
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${
                isActive ? "text-blue-700  dark:text-blue-300" : ""
              } bre flex w-full select-none whitespace-nowrap border-b border-slate-200 py-4 px-6 dark:border-slate-800`
            }
            key={a.slug}
            to={`/${a.slug}`}
          >
            {a.title}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

function HomeLink({ onClick }: { onClick?: React.MouseEventHandler }) {
  return (
    <NavLink
      onClick={onClick}
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
  );
}

function ProgramLink({
  onClick,
  className,
}: {
  className?: NavLinkProps["className"];
  onClick?: React.MouseEventHandler;
}) {
  return (
    <NavLink
      onClick={onClick}
      className={
        className ??
        (({ isActive }) =>
          isActive ? "text-blue-700  dark:text-blue-300" : "")
      }
      key="program"
      to="/program"
    >
      Program
    </NavLink>
  );
}
