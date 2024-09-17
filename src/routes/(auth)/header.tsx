import { component$ } from "@builder.io/qwik";
import { Logo } from "~/components/shared/logo";

export const Header = component$(() => {
  return (
    <header class="flex h-16 flex-col justify-center border-b bg-background">
      <div class="container mx-auto">
        <Logo />
      </div>
    </header>
  );
});
