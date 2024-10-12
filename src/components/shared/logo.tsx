import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { SITE_NAME } from "~/lib/constatnts";

export const Logo = component$(() => (
  <Link href="/">
    {/* <h1 class="text-2xl font-extrabold italic text-alert">{SITE_NAME}</h1> */}
    <img src="/logo.svg" alt={SITE_NAME} class="w-36" />
  </Link>

));
