import { Link } from "@remix-run/react";
import * as React from "react";
import * as ReactDOM from "react-dom";

export function RichText({ body, className }: any) {
  let contentRef = React.useRef<HTMLDivElement>(null);
  console.log(body);

  return (
    <>
      <div
        className={`text-slate-800 dark:text-slate-300 ${className ?? ""}`}
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: body.html }}
      />
      {body.references?.map((event: any) => {
        const date = new Date(event.date);

        return (
          <Embed key={event.id} contentRef={contentRef} id={event.id}>
            <Link to={`/event/${event.slug}`}>
              <h2>{event.title}</h2>
            </Link>
            <span className="mb-4 flex text-slate-400">
              {date.toLocaleDateString("sv-SE")}{" "}
              {date.toLocaleTimeString("sv-SE", { timeStyle: "short" })}
            </span>

            <p>{event.description}</p>
          </Embed>
        );
      })}
    </>
  );
}

function Embed({ contentRef, children, id }: any) {
  const [, setCount] = React.useState(0);
  React.useLayoutEffect(() => {
    setCount((c) => ++c);
  }, [contentRef, children, id]);
  const wrapper = contentRef.current?.querySelector(
    `[data-gcms-embed-id="${id}"]`
  );

  return wrapper ? ReactDOM.createPortal(children, wrapper) : null;
}
