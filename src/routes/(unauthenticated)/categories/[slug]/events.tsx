import { component$ } from "@builder.io/qwik";
import { useGetCategoryEvents } from ".";
import { EventCard } from "./event-card";
export const Events = component$(({ name }: { name?: string }) => {
  const eventsSig = useGetCategoryEvents();
  return (
    <div class="mt-12">
      <h2 class="text-center text-3xl font-extrabold">Popular {name} events</h2>
      <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {eventsSig.value?.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
});
