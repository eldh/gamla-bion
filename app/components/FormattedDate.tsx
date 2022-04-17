export function FormattedDate(props: { date: string }) {
  const date = new Date(props.date);
  return (
    <>
      {date.toLocaleDateString("sv-SE", {
        month: "long",
        day: "numeric",
        weekday: "long",
      })}{" "}
      {date.toLocaleTimeString("sv-SE", { timeStyle: "short" })}
    </>
  );
}
