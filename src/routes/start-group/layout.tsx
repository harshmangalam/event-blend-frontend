import { component$, Slot } from "@builder.io/qwik";
import { Navbar } from "./navbar";
import { GroupProgressStatus } from "./group-progress-status";

export default component$(() => {
  return (
    <div class="flex h-full min-h-screen flex-col justify-between bg-background">
      <header>
        <Navbar />
        <GroupProgressStatus />
      </header>
      <main class="w-full flex-1">
        <Slot />
      </main>
    </div>
  );
});
