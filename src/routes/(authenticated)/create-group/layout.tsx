import { component$, Slot } from "@builder.io/qwik";
import { Footer } from "~/components/footer";
import { Navbar } from "~/components/navigations/navbar";

export default component$(() => {
  return (
    <div class="flex min-h-screen flex-col bg-muted">
      <Navbar />
      <main class="grid flex-1 place-items-center py-12">
        <Slot />
      </main>
      <Footer />
    </div>
  );
});
