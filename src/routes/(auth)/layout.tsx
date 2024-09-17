import { component$, Slot } from "@builder.io/qwik";
import { Header } from "./header";

export default component$(() => {
  return (
    <div class="flex min-h-screen flex-col bg-muted">
      <Header />
      <main class="grid flex-1 place-items-center py-12">
        <Slot />
      </main>
    </div>
  );
});
