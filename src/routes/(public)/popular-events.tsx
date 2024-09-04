import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { useGetPopularEvents } from ".";
import { EventCard } from "~/components/shared/event-card";

export const PopularEvents = component$(() => {
  const popularEvents = useGetPopularEvents();
  return (
    <section>
      <div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <h2 class="text-xl font-semibold">Explore popular events</h2>
        <Link class="text-primary hover:underline" href="/Events">
          See all events
        </Link>
      </div>
      <div class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
        {popularEvents.value?.map((event) => (
          <EventCard event={event} key={event.id} />
        ))}
      </div>
    </section>
  );
});
