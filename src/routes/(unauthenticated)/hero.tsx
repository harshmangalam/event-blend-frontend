import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { cn } from "@qwik-ui/utils";
import { buttonVariants } from "~/components/ui/button/button";
import { SITE_NAME } from "~/lib/constatnts";

export const Hero = component$(() => {
  return (
    <div class="py-12">
      <div class="relative w-full">
        <div class="flex flex-col items-center sm:flex-row">
          <div class="mb-6 flex w-full flex-col space-y-6 sm:mb-0 sm:mr-6 lg:w-7/12">
            <h1 class="text-[42px] font-extrabold leading-[3.25rem]">
              The Open Source Platform for Organizing and Attending Events
            </h1>
            <p>
              Discover and create events effortlessly with {SITE_NAME}. Our open
              source platform empowers you to connect with communities, share
              experiences, and make memories. Join us and transform the way you
              engage with events. fun.
            </p>
            <div>
              <Link
                class={cn(buttonVariants({ size: "md", look: "primary" }))}
                href="/signup"
              >
                Join Now
              </Link>
            </div>
          </div>
          <div class="w-8/12 lg:w-1/2">
            <img
              alt="Image of an IRL Event"
              fetchPriority="high"
              width="379"
              height="269"
              decoding="async"
              data-nimg="1"
              srcset="https://secure.meetupstatic.com/next/images/indexPage/irl_event.svg?w=384 1x, https://secure.meetupstatic.com/next/images/indexPage/irl_event.svg?w=828 2x"
              src="https://secure.meetupstatic.com/next/images/indexPage/irl_event.svg?w=828"
            />
          </div>
        </div>
      </div>
    </div>
  );
});
