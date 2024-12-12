import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { fetchPublicAPI } from "~/lib/fetch-backend";
import { useSession } from "~/routes/plugin@auth";
import type { ApiResponse, Group } from "~/lib/types";

export const useGetGroupDescriptionBySlug = routeLoader$(async ({ params }) => {
  const group = await fetchPublicAPI()
    .get(`/groups/${params.slug}/details`)
    .json<ApiResponse<{ group: Pick<Group, "description" | "id"> }>>();
  return group?.data?.group;
});

export default component$(() => {
  const groupSig = useGetGroupDescriptionBySlug();
  const sessionSig = useSession();

  return (
    <div>
      <h2 class="mb-4 text-xl font-bold">What we’re about</h2>
      <div
        dangerouslySetInnerHTML={groupSig.value?.description}
        class="pros mt-6"
      ></div>
      {sessionSig.value.user?.role === "Admin" && (
        <button
          class="mt-4 p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick$={() => {
            // Redirect to event creation page
            window.location.href = `/create-event?group=${groupSig.value?.id}`;
          }}
        >
          Create Event
        </button>
      )}
    </div>
  );
});
