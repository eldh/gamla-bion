import { Link } from "@remix-run/react";
import { FormattedDate } from "../components/FormattedDate";

export function Event({ event, big }: { event: any; big?: boolean }) {
  return (
    <div className="mb-8">
      <Link
        to={`/event/${event.slug}`}
        className="mb-0 flex  hover:text-slate-600 hover:dark:text-white"
      >
        <h2 className="mb-1 leading-none">{event.title}</h2>
      </Link>
      <span className="mb-0 flex capitalize text-slate-400 dark:text-slate-500">
        <FormattedDate date={event.date} />
      </span>
      {big && event.image ? (
        <img
          className="mb-8 mt-2"
          src={event.image.url}
          alt={event.title}
          height={event.image.height}
          width={event.image.width}
        />
      ) : null}
      <p className={`mb-1 ${big ? "line-clamp-10" : "line-clamp-3"}`}>
        {event.description}
      </p>
      <Link
        to={`/event/${event.slug}`}
        className="text-slate-600 hover:text-slate-400 dark:text-slate-400 hover:dark:text-slate-200"
      >
        Läs mer →
      </Link>
    </div>
  );
}
