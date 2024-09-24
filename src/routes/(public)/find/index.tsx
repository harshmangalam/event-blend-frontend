import { component$ } from "@builder.io/qwik";
import { Tabs } from "./tabs";
import { Separator } from "~/components/ui";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import { fetchBackend } from "~/lib/fetch-backend";
import type { ApiResponse, Event, Group } from "~/lib/types";
import { FlatEventCard } from "~/components/shared/flat-event-card";
import { Source } from "~/lib/constatnts";
import { FlatGroupCard } from "~/components/shared/flat-group-card";

export const useGetSource = routeLoader$(async (event) => {
  const source = event.query.get("source") as Source;

  if (source === Source.Events) {
    const resp = await fetchBackend()
      .get("/events/discover-events")
      .fetchError((err) => console.log(err))
      .internalError((err) => console.log(err))
      .json<ApiResponse<{ events: Event[] }>>();
    return { events: resp.data?.events, groups: null };
  }

  if (source === Source.Groups) {
    const resp = await fetchBackend()
      .get("/groups/discover-groups")
      .fetchError((err) => console.log(err))
      .internalError((err) => console.log(err))
      .json<ApiResponse<{ groups: Group[] }>>();
    return { groups: resp.data?.groups, events: null };
  }
});

export default component$(() => {
  const sourceSig = useGetSource();
  const loc = useLocation();
  return (
    <div class="container mx-auto px-4 py-4">
      <Tabs />
      <Separator class="my-6" />
      {(loc.url.searchParams.get("source") as Source) === Source.Events
        ? sourceSig.value?.events?.map((event) => (
            <FlatEventCard event={event} key={event.id} />
          ))
        : null}

      {(loc.url.searchParams.get("source") as Source) === Source.Groups
        ? sourceSig.value?.groups?.map((group) => (
            <FlatGroupCard group={group} key={group.id} />
          ))
        : null}
    </div>
  );
});
