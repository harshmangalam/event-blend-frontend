import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Avatar, Button } from "~/components/ui";
import { DEFAULT_POSTER } from "~/lib/constatnts";
import { fetchBackend } from "~/lib/fetch-backend";
import type { ApiResponse, Event } from "~/lib/types";
import { formatEventDateDifference } from "~/lib/utils";
import { GroupCard } from "./group-card";
import { LocationCard } from "./location-card";
import { TimeCard } from "./time-card";
import { LuPlus, LuShare } from "@qwikest/icons/lucide";

export const useGetEventDetails = routeLoader$(async (event) => {
  const resp = await fetchBackend(event)
    .get(`/events/${event.params.id}`)
    .notFound(() => {
      throw event.error(404, "Event not found");
    })
    .json<ApiResponse<{ event: Event }>>();

  if (!resp.data?.event) throw event.error(404, "Event not found");
  return resp.data.event;
});
export default component$(() => {
  const eventSig = useGetEventDetails();
  return (
    <div>
      {/* event header section  */}
      <section class="bg-background py-4">
        <div class="mx-auto max-w-4xl px-4">
          <span class="text-muted-foreground">
            {eventSig.value.dates.length
              ? formatEventDateDifference(eventSig.value.dates[0].startDate)
              : null}
          </span>
          <h2 class="mt-2 text-3xl font-extrabold">{eventSig.value.name}</h2>
          <div class="mt-4 flex items-center gap-3">
            <Avatar.Root>
              <Avatar.Image
                src={eventSig.value.group.admin.profilePhoto}
                alt={eventSig.value.group.admin.name}
              />
              <Avatar.Fallback>
                {eventSig.value.group.admin.name.slice(0, 2)}
              </Avatar.Fallback>
            </Avatar.Root>
            <div class="flex flex-col">
              <span class="text-sm">Hosted By</span>
              <span class="text-sm font-bold">
                {eventSig.value.group.admin.name}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section class="px-4 py-12">
        <div class="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-12">
          <div class="col-span-12 md:col-span-8">
            <img
              src={eventSig.value.poster || DEFAULT_POSTER}
              alt={eventSig.value.name}
              width={600}
              height={400}
              class="aspect-video rounded-md"
            />

            <div class="mt-4 flex items-center justify-end gap-4">
              <Button look={"outline"}>
                <LuShare class="mr-2" />
                Share
              </Button>
              <Button>
                <LuPlus class="mr-2" />
                Attend
              </Button>
            </div>
          </div>
          <div class="col-span-12 flex flex-col gap-4 md:col-span-4">
            <GroupCard group={eventSig.value.group} />
            <TimeCard dates={eventSig.value.dates} />
            <LocationCard
              location={eventSig.value.location}
              address={eventSig.value.address}
            />
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-4xl py-4">
        <div
          class="prose-base"
          dangerouslySetInnerHTML={eventSig.value.details ?? ""}
        ></div>
      </section>
    </div>
  );
});
