import { component$, Slot } from "@builder.io/qwik";
import { Navbar } from "./navbar";

export default component$(() => {
  return (
    <>
      <Navbar />
      <main class="mx-auto w-full max-w-xl  px-4  py-12">
        <Slot />
      </main>
    </>
  );
});
