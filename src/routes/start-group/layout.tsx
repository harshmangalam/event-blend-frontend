import { component$, Slot } from "@builder.io/qwik";
import { Navbar } from "./navbar";

export default component$(() => {
  return (
    <div class="flex h-full min-h-screen flex-col justify-between bg-background">
      <Navbar />
      <main class="w-full flex-1">
        <Slot />
      </main>
    </div>
  );
});
