import { component$, Slot } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import {
  LuCalendarCheck,
  LuMapPin,
  LuUser2,
  LuUsers,
} from "@qwikest/icons/lucide";
import { Badge } from "~/components/ui/badge/badge";
import { Button } from "~/components/ui/button/button";
import { Separator } from "~/components/ui/separator/separator";
import { DEFAULT_POSTER } from "~/lib/constatnts";
import { fetchBackend } from "~/lib/fetch-backend";
import type { ApiResponse, Group } from "~/lib/types";
import { GroupsActions } from "./group-actions";
import { GroupTabs } from "./group-tabs";

export const useGetGroupBySlug = routeLoader$(async ({ params }) => {
  const group = await fetchBackend()
    .get(`/groups/${params.slug}`)
    .fetchError((err) => console.log(err))
    .internalError((err) => console.log(err))
    .json<ApiResponse<{ group: Group }>>();
  return group.data?.group;
});

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
                <span>{groupSig.value?._count.members} events</span>
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
            <div class="mt-6 flex items-center gap-4">
              <Button class="w-full" look={"primary"}>
                Join this group
              </Button>
              <GroupsActions />
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
