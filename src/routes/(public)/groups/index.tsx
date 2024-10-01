import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { FlatGroupCard } from "~/components/shared/flat-group-card";
import { Separator } from "~/components/ui/separator/separator";
import { fetchBackend } from "~/lib/fetch-backend";
import type { ApiResponse, Group } from "~/lib/types";

export const useDiscoverGroups = routeLoader$(async () => {
  const groups = await fetchBackend()
    .get("/groups/discover-groups")
    .fetchError((err) => console.error(err))
    .internalError((err) => console.error(err))
    .json<ApiResponse<{ groups: Group[] }>>();
  return groups.data?.groups;
});
export default component$(() => {
  const groupsSig = useDiscoverGroups();
  return (
    <div class="container mx-auto px-4">
      <h2 class="text-xl font-semibold">Discover Groups</h2>
      <div class="mt-8 grid grid-cols-1 gap-4">
        {groupsSig.value?.map((group) => (
          <div key={group.id} class="w-full max-w-3xl">
            <FlatGroupCard group={group} />
            <Separator class="mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
});
