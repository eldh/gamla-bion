import * as React from "react";
import * as ReactDOM from "react-dom";

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
        const date = new Date(event.date);
        return (
          <Embed key={event.id} contentRef={contentRef} id={event.id}>
            <h2>{event.title}</h2>
            <span className="mb-4 flex text-slate-400">
              {date.toLocaleDateString("sv-SE")}{" "}
              {date.toLocaleTimeString("sv-SE", { timeStyle: "short" })}
            </span>
            {/* {event.image && (
              <img
                className="mb-8 "
                src={event.image.url}
                alt={event.title}
                height={event.image.height}
                width={event.image.width}
              />
            )} */}
            <p>{event.description}</p>
          </Embed>
        );
      })}
    </>
  );
}

function Embed({ contentRef, children, id }: any) {
  React.useLayoutEffect(() => {
    if (contentRef.current) {
      const wrapper = contentRef.current.querySelector(
        `[data-gcms-embed-id="${id}"]`
      );
      if (wrapper) {
        ReactDOM.render(children, wrapper);
      }
    }
  }, [id, contentRef, children]);

  return null;
}
