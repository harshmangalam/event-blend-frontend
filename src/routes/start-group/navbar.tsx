import { component$ } from "@builder.io/qwik";
import { SITE_NAME } from "~/lib/constatnts";

export const Navbar = component$(() => {
  return (
    <div class="sticky top-0 z-50 flex h-16 items-center border-b border-muted bg-background">
      <nav class="container mx-auto flex flex-1 items-center justify-between gap-4 px-4">
        <div>
          <h1 class="text-2xl font-bold ">{SITE_NAME}</h1>
        </div>
      </nav>
    </div>
  );
});
