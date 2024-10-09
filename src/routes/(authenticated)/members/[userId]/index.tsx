import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { fetchBackend } from "~/lib/fetch-backend";
import { ApiResponse, User } from "~/lib/types";
import { UserCard } from "./user-card";

export const useGetMemberDetails = routeLoader$(async (event) => {
  const userResp = await fetchBackend(event)
    .get(`/users/${event.params.userId}/details`)
    .json<ApiResponse<{ user: User }>>();
  if (!userResp.data?.user) throw event.error(404, "User not found");
  return userResp.data.user;
});

export default component$(() => {
  const user = useGetMemberDetails();
  return (
    <div class="container mx-auto">
      <div class="grid grid-cols-12">
        <section class="col-span-12 md:col-span-4">
          <UserCard user={user.value} />
        </section>
        <section class="col-span-12 md:col-span-8"></section>
      </div>
    </div>
  );
});
