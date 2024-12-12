import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { cn } from "@qwik-ui/utils";
import { Card } from "~/components/ui";
import { buttonVariants } from "~/components/ui/button/button";
import { SITE_NAME } from "~/lib/constatnts";

export const JoinEventBlendSection = component$(() => {
  return (
    <Card.Root class="relative w-full rounded-xl border-none bg-muted/70">
      <Card.Content class="flex flex-col gap-6 px-12 py-6 md:flex-row">
        <div class="flex flex-col gap-4">
          <h1 class="text-xl font-extrabold  lg:text-3xl">Join {SITE_NAME}</h1>
          <p>
            People use {SITE_NAME} to meet new people, learn new things, find
            support, get out of their comfort zones, and pursue their passions,
            together. And it is free and open source.
          </p>

          <div>
            <Link
              class={cn(
                buttonVariants({
                  size: "md",
                  look: "primary",
                  class: "px-10",
                }),
              )}
              href="/signup"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div class="w-full lg:w-1/3 xl:w-1/2">
          <img
            alt="Image of an IRL Event"
            fetchPriority="high"
            width="360"
            height="300"
            decoding="async"
            data-nimg="1"
            src="https://www.meetup.com/_next/image/?url=%2Fimages%2FindexPage%2Fjoin%2Fjoin_meetup.webp&w=750&q=75"
          />
        </div>
      </Card.Content>
    </Card.Root>
  );
});
