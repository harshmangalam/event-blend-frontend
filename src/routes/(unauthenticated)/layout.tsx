import { component$, Slot } from "@builder.io/qwik";
import { Footer } from "~/components/footer";
import { Navbar } from "~/components/navigations/navbar";

export default component$(() => {
  return (
    <div>
      <Navbar />
      <main>
        <Slot />
      </main>
      <Footer />
    </div>
  );
});
