import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { fetchBackend } from "~/lib/fetch-backend";
import type { ApiResponse, GroupMember } from "~/lib/types";
import { GroupCard } from "./group-card";

export type YourGroupMemberType = Pick<GroupMember, "id" | "group" | "role">;
export const useGetYourGroups = routeLoader$(async (event) => {
  const resp = await fetchBackend(event)
    .get("/groups/your-groups")
    .json<ApiResponse<{ groupMembers: YourGroupMemberType[] }>>();

  return resp.data?.groupMembers ?? [];
});
export default component$(() => {
  const groupsSig = useGetYourGroups();
  return (
    <div class="container mx-auto px-4 py-6">
      <h2 class="text-xl font-bold">Your Groups</h2>
      <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {groupsSig.value.map((groupMember) => (
          <GroupCard groupMember={groupMember} key={groupMember.id} />
        ))}
      </div>
    </div>
  );
});
