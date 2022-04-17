import { Link } from "@remix-run/react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import useIsomorphicLayoutEffect from "use-isomorphic-layout-effect";
import { FormattedDate } from "./FormattedDate";

export function RichText({ body, className }: any) {
  let contentRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className={`text-slate-800 dark:text-slate-300 ${className ?? ""}`}
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: body.html }}
      />
      {body.references?.map((event: any) => {
        return (
          <Embed key={event.id} contentRef={contentRef} id={event.id}>
            <div className="mb-8">
              <Link to={`/event/${event.slug}`}>
                <h2 className="mb-1 leading-none">{event.title}</h2>
              </Link>
              <span className="mb-0 flex capitalize text-slate-400 dark:text-slate-500">
                <FormattedDate date={event.date} />
              </span>
              <p>{event.description}</p>
            </div>
          </Embed>
        );
      })}
    </>
  );
}

function Embed({ contentRef, children, id }: any) {
  const [, setCount] = React.useState(0);
  useIsomorphicLayoutEffect(() => {
    setCount((c) => ++c);
  }, [contentRef, children, id]);
  const wrapper = contentRef.current?.querySelector(
    `[data-gcms-embed-id="${id}"]`
  );

  return wrapper ? ReactDOM.createPortal(children, wrapper) : null;
}
