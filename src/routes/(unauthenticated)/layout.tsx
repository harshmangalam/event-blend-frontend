import { component$, Slot } from "@builder.io/qwik";
import { Navbar } from "~/components/navigations/navbar";

export default component$(() => {
  return (
    <div>
      <Navbar />
      <main>
        <Slot />
      </main>
    </div>
  );
});
