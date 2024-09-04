import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { fetchBackend } from "~/lib/fetch-backend";
import type { ApiResponse, Group } from "~/lib/types";

export const useGetGroupDescriptionBySlug = routeLoader$(async ({ params }) => {
  const group = await fetchBackend
    .get(`/groups/${params.slug}/details`)
    .fetchError((err) => console.log(err))
    .internalError((err) => console.log(err))
    .json<ApiResponse<{ group: Pick<Group, "description"> }>>();
  return group.data?.group;
});

export default component$(() => {
  const groupSig = useGetGroupDescriptionBySlug();
  return (
    <div>
      <h2 class="mb-4 text-xl font-bold">What we’re about</h2>
      {groupSig.value?.description}
    </div>
  );
});
