import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { cn } from "@qwik-ui/utils";
import { buttonVariants } from "~/components/ui/button/button";
import { SITE_NAME } from "~/lib/constatnts";

export default function JoinEventBlendSection() {
    return (
        <div class="relative w-full">
          <div class="flex flex-col items-center sm:flex-row">
            <div class="mb-6 flex w-full flex-col space-y-6 sm:mb-0 sm:mr-6 lg:w-2/3 xl:w-7/12">
              <h1 class="text-xl font-extrabold tracking-tight lg:text-4xl xl:text-[42px] xl:leading-[3.5rem]">
Join {SITE_NAME}
              </h1>
              <p>

People use {SITE_NAME} to meet new people, learn new things, find support, get out of their
comfort zones, and pursue their passions, together. Membership is free.
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
                src="social-group.jpg"
              />
            </div>
          </div>
        </div>
      );
}

