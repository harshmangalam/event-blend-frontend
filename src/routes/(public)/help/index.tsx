import { component$, useResource$ } from "@builder.io/qwik";
import { Hero } from "./hero";
import { Topics } from "./topics";

export default component$(() => {
  return (
    <div class="flex min-h-screen flex-col bg-gray-100">
      <Hero />
      <Topics />
    </div>
  );
});
