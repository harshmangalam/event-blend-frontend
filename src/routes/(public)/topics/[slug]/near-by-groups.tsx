import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { fetchNearbyGroups } from ".";
import type { Group } from "~/lib/types";
import { GroupCard } from "./group-card";

export const NearbyGroups = component$(({ name }: { name?: string }) => {
  const groups = useSignal<Group[]>([]);

  const successCallback = $(async (pos: GeolocationPosition) => {
    groups.value = await fetchNearbyGroups(
      pos.coords.longitude,
      pos.coords.longitude,
    );
  });

  const errorCallback = $((err: GeolocationPositionError) => {
    console.error(err);
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    window.navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
    );
  });
  return (
    <div>
      <h3 class="mb-6 text-2xl font-bold">{name} groups near you</h3>
      {groups.value.length ? (
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
          {groups.value.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      ) : null}
    </div>
  );
});
