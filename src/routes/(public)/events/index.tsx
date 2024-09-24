import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { FlatEventCard } from "~/components/shared/flat-event-card";
import { Separator } from "~/components/ui/separator/separator";
import { fetchBackend } from "~/lib/fetch-backend";
import type { ApiResponse, Event } from "~/lib/types";

export const useDiscoverEvents = routeLoader$(async () => {
  const resp = await fetchBackend()
    .get("/events/discover-events")
    .fetchError((err) => console.log(err))
    .internalError((err) => console.log(err))
    .json<ApiResponse<{ events: Event[] }>>();
  return resp.data?.events;
});
export default component$(() => {
  const eventsSig = useDiscoverEvents();
  return (
    <div class="container mx-auto px-4">
      <h2 class="text-xl font-semibold">Discover Groups</h2>
      <div class="mt-8 grid grid-cols-1 gap-4">
        {eventsSig.value?.map((event) => (
          <div key={event.id} class="w-full max-w-3xl">
            <FlatEventCard event={event} />
            <Separator class="mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
});
