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
      {body.references?.map((reference: any) => {
        return (
          <Embed key={reference.id} contentRef={contentRef} id={reference.id}>
            {reference.__typename === "Event" ? (
              <Event event={reference} />
            ) : reference.__typename === "Carousel" ? (
              <Carousel carousel={reference} />
            ) : reference.__typename === "Asset" ? (
              <Asset asset={reference} />
            ) : null}
          </Embed>
        );
      })}
    </>
  );
}

function Carousel({ carousel }: any) {
  return (
    <>
      {carousel.images.map((image: any) => (
        <img
          key={image.url}
          alt=""
          src={image.url}
          width={image.width}
          height={image.height}
        />
      ))}
    </>
  );
}

function Asset({ asset }: any) {
  return (
    <img
      key={asset.url}
      alt=""
      src={asset.url}
      width={asset.width}
      height={asset.height}
    />
  );
}

function Event({ event }: any) {
  return (
    <div className="mb-8">
      <Link
        to={`/event/${event.slug}`}
        className="mb-0 flex capitalize hover:text-slate-600 hover:dark:text-white"
      >
        <h2 className="mb-1 leading-none">{event.title}</h2>
      </Link>
      <span className="mb-0 flex capitalize text-slate-400 dark:text-slate-500">
        <FormattedDate date={event.date} />
      </span>
      <p>{event.description}</p>
    </div>
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
