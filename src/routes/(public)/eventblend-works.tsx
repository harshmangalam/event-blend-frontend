import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { SITE_NAME } from "~/lib/constatnts";

export const EventblendWorks = component$(() => {
  return (
    <section class="w-full py-12">
      <div class="container mx-auto px-4">
        <h2 class="mb-8 text-3xl font-bold">How {SITE_NAME} works</h2>
        <div class="grid gap-8 md:grid-cols-2">
          <div class="bg-gray-50 p-6 rounded-lg flex gap-4">

            <div class="mb-4 text-4xl text-teal-600">🔍</div>
            <div class="flex flex-col gap-2">

            <h3 class="mb-2 text-xl font-semibold">Discover events and groups</h3>
            <p class="mb-4 text-gray-600">
              See who's hosting local events for all the things you love
            </p>
            <Link href="/find/?source=GROUPS" class="text-teal-600 hover:underline">
              Search events and groups
            </Link>
            </div>
          </div>
          <div class="bg-gray-50 p-6 rounded-lg flex gap-4">
            <div class="mb-4 text-4xl text-teal-600">➕</div>
            <div class="flex flex-col gap-2">

            <h3 class="mb-2 text-xl font-semibold">Start a group to host events</h3>
            <p class="mb-4 text-gray-600">
              Create your own {SITE_NAME} group, and draw from a community of millions
            </p>
            <Link href="/create-group" class="text-teal-600 hover:underline">
              Start a group
            </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default EventblendWorks;
