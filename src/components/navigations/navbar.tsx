import { component$ } from "@builder.io/qwik";
import { buttonVariants } from "../ui/button/button";
import { Link } from "@builder.io/qwik-city";
import { cn } from "@qwik-ui/utils";
import { Logo } from "../shared/logo";

export const Navbar = component$(() => {
  return (
    <header class="sticky top-0 z-50 flex h-16 items-center border-b border-muted bg-background">
      <nav class="container mx-auto flex flex-1 items-center justify-between gap-4 px-4">
        <Logo />
        <div class="flex items-center gap-2">
          <Link
            href="/login"
            class={cn(buttonVariants({ size: "md", look: "ghost" }))}
          >
            Log in
          </Link>
          <Link
            href="/signup"
            class={cn(buttonVariants({ size: "md", look: "outline" }))}
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
});
