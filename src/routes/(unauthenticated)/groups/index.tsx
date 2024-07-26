import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { GroupCard } from "~/components/shared/group-card";
import { fetchBackend } from "~/lib/fetch-backend";
import type { ApiResponse, Group } from "~/lib/types";

export const useDiscoverGroups = routeLoader$(async () => {
  const locations = await fetchBackend
    .get("/groups/discover-groups")
    .fetchError((err) => console.log(err))
    .internalError((err) => console.log(err))
    .json<ApiResponse<{ groups: Group[] }>>();
  return locations;
});
export default component$(() => {
  const groups = useDiscoverGroups();
  return (
    <section class="container mx-auto px-4 py-12">
      <h2 class="text-xl font-semibold">Discover Groups</h2>

      <div class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
        {groups.value.data?.groups.map((group) => (
          <GroupCard group={group} key={group.id} />
        ))}
      </div>
    </section>
  );
});
