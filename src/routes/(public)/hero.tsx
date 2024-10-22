import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { cn } from "@qwik-ui/utils";
import { buttonVariants } from "~/components/ui/button/button";
import { SITE_NAME } from "~/lib/constatnts";
import { useSession } from "~/routes/plugin@auth";

export const Hero = component$(() => {
  const sessionSig = useSession();
  return (
    <div class="relative w-full">
      <div class="flex flex-col items-center sm:flex-row">
        <div class="mb-6 flex w-full flex-col space-y-6 sm:mb-0 sm:mr-6 lg:w-2/3 xl:w-7/12">
          <h1 class="text-3xl font-extrabold tracking-tight lg:text-4xl xl:text-[42px] xl:leading-[3.5rem]">
            An open source platform for organizing and attending events
          </h1>
          <p>
            Discover and create events effortlessly with {SITE_NAME}. Our open
            source platform empowers you to connect with communities, share
            experiences, and make memories. Join us and transform the way you
            engage with events. fun.
          </p>

          <div>
            {!sessionSig.value.user ? (
              <Link
                class={cn(
                  buttonVariants({
                    size: "md",
                    look: "primary",
                    class: "px-6",
                  }),
                )}
                href="/signup"
              >
                Join {SITE_NAME}
              </Link>
            ) : (
              <Link
                class={cn(
                  buttonVariants({
                    size: "md",
                    look: "primary",
                    class: "px-6",
                  }),
                )}
                href="/your-events"
              >
                Your Events
              </Link>
            )}
          </div>
        </div>
        <div class="w-full lg:w-1/3 xl:w-1/2">
          <img
            alt="Image of an IRL Event"
            fetchPriority="high"
            width="460"
            height="400"
            decoding="async"
            data-nimg="1"
            src="hero.png"
          />
        </div>
      </div>
    </div>
  );
});
