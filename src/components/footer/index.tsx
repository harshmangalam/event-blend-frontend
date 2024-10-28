import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { cn } from "@qwik-ui/utils";
import { SITE_NAME } from "~/lib/constatnts";
import { buttonVariants } from "~/components/ui/button/button";
import { Separator } from "~/components/ui/separator/separator";

export const Footer = component$(() => {
  const navigations = [
    {
      label: "Your Account",
      links: [
        {
          name: "Sign up",
          href: "/signup",
        },
        {
          name: "Log in",
          href: "/login",
        },
        {
          name: "Help",
          href: "/help",
        },
      ],
    },
    {
      label: "Discover",
      links: [
        {
          name: "Groups",
          href: "/groups",
        },
        {
          name: "Cities",
          href: "/cities",
        },
        {
          name: "Topics",
          href: "/topics",
        },
      ],
    },
    {
      label: SITE_NAME,
      links: [
        {
          name: "About",
          href: "/about",
        },
        {
          name: "Blog",
          href: "/blog",
        },
      ],
    },
  ];
  return (
    <footer class="bg-secondary py-12 text-gray-600 dark:text-gray-400">
      <div class="container mx-auto px-4">
        <section class="flex flex-wrap items-center gap-3">
          <span class="font-bold text-muted">
            Create your own {SITE_NAME} group.
          </span>
          <Link
            class={cn(buttonVariants({ size: "sm", look: "outline" }))}
            href="/create-group"
          >
            Get Started
          </Link>
        </section>
        <Separator class="my-8 bg-muted-foreground" />

        <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {navigations.map((nav) => (
            <div key={nav.label}>
              <h4 class="font-medium text-muted">{nav.label}</h4>
              <div class="mt-2 flex flex-col gap-1">
                {nav.links.map((link) => (
                  <Link class="font-normal text-white opacity-70 hover:opacity-100 
                  " href={link.href} key={link.name}>
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section class="mt-8">
          <span class="text-sm text-muted">
            &copy; {new Date().getFullYear()} {SITE_NAME}
          </span>
        </section>
      </div>
    </footer>
  );
});
