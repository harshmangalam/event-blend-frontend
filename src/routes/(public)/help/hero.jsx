import { component$ } from "@builder.io/qwik";
import { Input } from "~/components/ui";

export const Hero = component$(() => {
  return (
    <section class="bg-primary">
      <div class="mx-auto flex h-80 p-4 w-full max-w-xl flex-col justify-center text-primary-foreground text-center">
        <div class="flex flex-col gap-8">
          <h1 class="text-3xl font-bold">How can we help you today?</h1>
          <div>
            <Input placeholder="Search" />
            <p class="mt-2 text-sm">
              Popular searches: leadership team, meetup pro, upload photos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
