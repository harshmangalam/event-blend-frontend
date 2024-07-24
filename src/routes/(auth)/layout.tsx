import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="grid min-h-screen place-items-center bg-background py-6">
      <Slot />
    </div>
  );
});
