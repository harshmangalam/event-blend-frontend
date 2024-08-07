import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { GroupFlatCard } from "~/components/shared/group-flat-card";
import { Separator } from "~/components/ui/separator/separator";
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
    <section>
      <h2 class="text-xl font-semibold">Discover Groups</h2>
      <div class="mt-8 grid grid-cols-1 gap-4">
        {groups.value.data?.groups.map((group) => (
          <div key={group.id} class="w-full max-w-3xl">
            <GroupFlatCard group={group} />
            <Separator class="mt-4" />
          </div>
        ))}
      </div>
    </section>
  );
});
