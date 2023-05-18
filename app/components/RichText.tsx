import * as React from "react";
import * as ReactDOM from "react-dom";
import useIsomorphicLayoutEffect from "use-isomorphic-layout-effect";
import { Event } from "./Event";

export function RichText({ body, className }: any) {
  let contentRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className={`text-slate-800 dark:text-slate-300 ${className ?? ""}`}
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: body.html }}
      />
      {body.references?.map((reference: any, index: number) => {
        return (
          <Embed key={reference.id} contentRef={contentRef} id={reference.id}>
            {reference.__typename === "Event" ? (
              <Event event={reference} big={index === 0} />
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
