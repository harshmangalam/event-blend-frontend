import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Avatar } from "~/components/ui";
import { DEFAULT_POSTER } from "~/lib/constatnts";
import { fetchBackend } from "~/lib/fetch-backend";
import type { ApiResponse, Event } from "~/lib/types";
import { formatEventDateDifference } from "~/lib/utils";

export const useGetEventDetails = routeLoader$(async (event) => {
  const resp = await fetchBackend(event)
    .get(`/events/${event.params.id}`)
    .fetchError((err) => console.log(err))
    .internalError((err) => console.log(err))
    .json<ApiResponse<{ event: Event }>>();
  return resp.data?.event;
});
export default component$(() => {
  const eventSig = useGetEventDetails();
  return (
    <div>
      {/* event header section  */}
      <section class="bg-background py-4">
        <div class="mx-auto max-w-4xl">
          <span class="text-muted-foreground">
            {eventSig.value?.dates?.length
              ? formatEventDateDifference(eventSig.value.dates[0].startDate)
              : null}
          </span>
          <h2 class="mt-2 text-3xl font-extrabold">{eventSig.value?.name}</h2>
          <div class="mt-4 flex items-center gap-3">
            <Avatar.Root>
              <Avatar.Image
                src={eventSig.value?.group?.admin.profilePhoto}
                alt={eventSig.value?.group?.admin.name}
              />
              <Avatar.Fallback>
                {eventSig.value?.group?.admin.name.slice(0, 2)}
              </Avatar.Fallback>
            </Avatar.Root>
            <div class="flex flex-col">
              <span class="text-sm">Hosted By</span>
              <span class="text-sm font-bold">
                {eventSig.value?.group?.admin.name}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section class="py-6">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div class="col-span-8">
            <img
              src={eventSig.value?.poster || DEFAULT_POSTER}
              alt={eventSig.value?.name}
              width={600}
              height={400}
            />
          </div>
          <div class="col-span-4"></div>
        </div>
      </section>
    </div>
  );
});
