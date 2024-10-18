import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { SITE_NAME } from "~/lib/constatnts";
import LogoSrc from "/logo.svg";

export const Logo = component$(() => (
  <Link href="/">
    {/* <h1 class="text-2xl font-extrabold italic text-alert">{SITE_NAME}</h1> */}
    <img src={LogoSrc} alt={SITE_NAME} width="150" height="100" />
  </Link>
));
