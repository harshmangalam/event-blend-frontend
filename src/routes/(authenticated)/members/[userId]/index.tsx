import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { fetchBackend } from "~/lib/fetch-backend";
import { ApiResponse } from "~/lib/types";

export const useGetMemberDetails = routeLoader$(async (event) => {
  const userResp = await fetchBackend(event)
    .get(`/users/${event.params.userId}/details`)
    .json<ApiResponse<{ user: any }>>();
  return userResp.data?.user;
});

export default component$(() => {
  return (
    <div>
      <div class="relative">
        <img src="" alt="" />
      </div>
    </div>
  );
});
