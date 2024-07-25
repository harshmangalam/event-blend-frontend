import { component$ } from "@builder.io/qwik";
import { buttonVariants } from "../ui/button/button";
import { Link } from "@builder.io/qwik-city";
import { cn } from "@qwik-ui/utils";
import { SITE_NAME } from "~/lib/constatnts";

export const Navbar = component$(() => {
  return (
    <header class="flex h-16 items-center">
      <nav class="container mx-auto flex flex-1 items-center justify-between gap-4 px-4 ">
        <div>
          <h1 class="text-2xl font-bold">{SITE_NAME}</h1>
        </div>
        <div class="flex items-center gap-2">
          <Link
            href="/login"
            class={cn(buttonVariants({ size: "md", look: "ghost" }))}
          >
            Log in
          </Link>
          <Link
            href="/signup"
            class={cn(buttonVariants({ size: "md", look: "primary" }))}
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
});
