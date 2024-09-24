import { component$ } from "@builder.io/qwik";
import { Tabs } from "./tabs";

export default component$(() => {
  return (
    <div class="container mx-auto px-4 py-4">
      <Tabs />
    </div>
  );
});
