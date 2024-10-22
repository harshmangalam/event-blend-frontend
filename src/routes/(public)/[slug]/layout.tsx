import { component$, Slot } from "@builder.io/qwik";
import {
  Link,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import {
  LuCalendarCheck,
  LuMapPin,
  LuUser2,
  LuUsers,
} from "@qwikest/icons/lucide";
import { Badge } from "~/components/ui/badge/badge";
import { Separator } from "~/components/ui/separator/separator";
import {
  BASE_URI,
  DEFAULT_POSTER,
  REDIRECT_STATUS_CODE,
} from "~/lib/constatnts";
import { fetchBackend, fetchPublicAPI } from "~/lib/fetch-backend";
import type { ApiResponse, Group } from "~/lib/types";

import { GroupTabs } from "./group-tabs";
import { JoinLeaveGroup } from "./join-leave-group";
import { ShareOptions } from "~/components/shared/share-options";

export const useGetGroupBySlug = routeLoader$(async (event) => {
  const groupResp = await fetchPublicAPI()
    .get(`/groups/${event.params.slug}`)
    .notFound(() => {
      throw event.error(404, "Group not found");
    })
    .json<ApiResponse<{ group: Group }>>();
  return groupResp.data?.group;
});

export const useGetIsMember = routeLoader$(async (event) => {
  const user = event.sharedMap.get("user");
  if (!user) return false;
  const resp = await fetchBackend(event)
    .get(`/groups/${event.params.slug}/is-member`)
    .json<ApiResponse<{ isMember: boolean }>>();
  return resp.data?.isMember;
});

export const useJoinLeaveGroupAction = routeAction$(
  async ({ groupId }, event) => {
    const user = event.sharedMap.get("user");
    if (!user) throw event.redirect(REDIRECT_STATUS_CODE, "/login");
    await fetch(`${BASE_URI}/groups/${groupId}/join-leave`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${event.sharedMap.get("accessToken")}`,
      },
    });

    throw event.redirect(REDIRECT_STATUS_CODE, `/${event.params.slug}`);
  },
  zod$({
    groupId: z.string().cuid2(),
  }),
);

export default component$(() => {
  const groupSig = useGetGroupBySlug();

  return (
    <div>
      <section class="bg-background py-12">
        <div class="mx-auto flex flex-col gap-6 md:container md:max-w-5xl md:flex-row md:px-4">
          <div class="w-full md:max-w-sm xl:max-w-xl">
            <img
              alt={groupSig.value?.name}
              fetchPriority="high"
              loading="eager"
              width={600}
              height={400}
              decoding="async"
              class="aspect-video h-auto w-full flex-none object-cover object-center md:rounded-lg"
              src={groupSig.value?.poster ?? DEFAULT_POSTER}
            />
          </div>
          <div class="col-span-3 flex-1 px-4">
            <h2 class="text-3xl font-extrabold">{groupSig.value?.name}</h2>
            <div class="mt-6 flex flex-col gap-2">
              <div class="flex items-center gap-3 text-muted-foreground">
                <LuMapPin class="h-5 w-5" />
                <span>
                  {groupSig.value?.location.city},{" "}
                  {groupSig.value?.location.country}
                </span>
              </div>
              <div class="flex items-center gap-3 text-muted-foreground">
                <LuUsers class="mr-1 h-5 w-5" />
                <span>{groupSig.value?._count.members} members</span>
              </div>
              <div class="flex items-center gap-3 text-muted-foreground">
                <LuUser2 class="mr-1 h-5 w-5" />
                <div>
                  <span>Orgaised by </span>
                  <Link class="font-bold text-secondary" href="#">
                    {groupSig.value?.admin.name}
                  </Link>
                </div>
              </div>
              <div class="flex items-center gap-3 text-muted-foreground">
                <LuCalendarCheck class="mr-1 h-5 w-5" />
                <span>{groupSig.value?._count.events} events</span>
              </div>
            </div>
            <div class="mt-6 flex flex-wrap gap-3">
              {groupSig.value?.topics.map((topic) => (
                <Link key={topic.id} href={`/topics/${topic.slug}`}>
                  <Badge look={"outline"} class="py-2">
                    {topic.name}
                  </Badge>
                </Link>
              ))}
            </div>
            <ShareOptions class="mt-6" />
            <div class="mt-6 flex items-center gap-4">
              <JoinLeaveGroup groupId={groupSig.value?.id ?? ""} />
            </div>
          </div>
        </div>
      </section>
      <Separator class="mt-6" />
      <GroupTabs />
      <div class="bg-background">
        <div class="container mx-auto max-w-5xl px-4">
          <Slot />
        </div>
      </div>
    </div>
  );
});
