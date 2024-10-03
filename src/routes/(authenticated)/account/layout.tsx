import { component$, Slot } from "@builder.io/qwik";
import { Sidebar } from "./sidebar";

export default component$(() => {
  return (
    <div class="flex w-full bg-background">
      <Sidebar />
      <section class="w-full flex-1 px-4 py-4">
        <Slot />
      </section>
    </div>
  );
});
