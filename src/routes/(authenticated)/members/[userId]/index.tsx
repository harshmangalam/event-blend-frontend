import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { fetchBackend } from "~/lib/fetch-backend";
import { ApiResponse, User } from "~/lib/types";
import { UserCard } from "./user-card";
import { Avatar, Card } from "~/components/ui";
import { UserStats } from "./user-stats";
import { LuPencilLine } from "@qwikest/icons/lucide";

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
        <section class="col-span-12 md:col-span-4 md:py-8">
          <Card.Root class="md:overflow-hidden md:rounded-lg">
            <Card.Content class="px-0 py-0 md:px-6 md:py-6">
              <UserCard user={user.value} />
              <UserStats _count={user.value._count} />
              <div class="mb-4 mt-8 flex flex-col gap-4 px-6 md:mb-0 md:px-0">
                <h2 class="text-xl font-bold">About me</h2>
                <p>{user.value.bio}</p>
              </div>
            </Card.Content>
          </Card.Root>
          <Card.Root class="sticky bottom-0 mt-8 md:relative md:rounded-lg">
            <Card.Content class="flex items-center gap-3 px-4 py-3">
              <Avatar.Root>
                <Avatar.Image
                  src={user.value.profilePhoto}
                  alt={user.value.name}
                  width={56}
                  height={56}
                  class="h-14 w-14"
                />
              </Avatar.Root>
              <div>
                <div class="text-sm font-bold">{user.value.name}</div>
                <Link
                  href="/account"
                  class="flex items-center gap-2 text-sm text-primary"
                >
                  <LuPencilLine />
                  <span class="underline">Edit profile</span>
                </Link>
              </div>
            </Card.Content>
          </Card.Root>
        </section>
        <section class="col-span-12 md:col-span-8"></section>
      </div>
    </div>
  );
});
