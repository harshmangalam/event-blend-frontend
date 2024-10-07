import { component$, useResource$ } from "@builder.io/qwik";

export default component$(() => {
  const Help = useResource$(() => import("./HelpStrip"));
  const Topic = useResource$(() => import("./Topic"));

  return (
    <div className="flex-grow">
      {/* Main Header Section */}
      <Help />
      {/* Browse by Topic Section */}
      <Topic />
    </div>
  );
});
