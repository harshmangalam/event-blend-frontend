import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="min-h-screen bg-background py-12">
      <Slot />
    </div>
  );
});
