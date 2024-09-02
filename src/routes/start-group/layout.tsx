import { component$, Slot } from "@builder.io/qwik";
import { Navbar } from "./navbar";
import { GroupProgressStatus } from "./group-progress-status";

export default component$(() => {
  return (
    <>
      <Navbar />
      <GroupProgressStatus />
      <main class="mx-auto w-full max-w-xl  px-4  py-12">
        <Slot />
      </main>
    </>
  );
});
