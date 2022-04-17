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
      {body.references?.map((film: any) => {
        const date = new Date(film.date);
        return (
          <Embed key={film.id} contentRef={contentRef} id={film.id}>
            <div>{film.title}</div>
            {film.image && <img src={film.image.url} alt={film.title} />}
            <div>
              {date.toLocaleDateString("sv-SE")}{" "}
              {date.toLocaleTimeString("sv-SE", { timeStyle: "short" })}
            </div>
            <div>{film.description}</div>
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
