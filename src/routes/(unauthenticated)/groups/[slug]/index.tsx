import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { LuMapPin, LuUser2, LuUsers } from "@qwikest/icons/lucide";
import { Badge } from "~/components/ui/badge/badge";
import { Button } from "~/components/ui/button/button";
import { Separator } from "~/components/ui/separator/separator";
import { DEFAULT_POSTER } from "~/lib/constatnts";
import { fetchBackend } from "~/lib/fetch-backend";
import type { ApiResponse, Group } from "~/lib/types";

export const useGetGroupBySlug = routeLoader$(async ({ params }) => {
  const group = await fetchBackend
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
      <section class="bg-background">
        <div class="grid grid-cols-1 gap-6">
          <div>
            <img
              alt={groupSig.value?.name}
              fetchPriority="high"
              loading="eager"
              width={800}
              height={100}
              decoding="async"
              class="aspect-video w-full flex-none object-cover  object-center md:rounded-lg"
              src={groupSig.value?.poster ?? DEFAULT_POSTER}
            />
          </div>
          <div class="px-4">
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
            </div>
            <div class="mt-6 flex flex-wrap gap-3">
              {groupSig.value?.topics.map((topic) => (
                <Link key={topic.id} href={`/topics/${topic}`}>
                  <Badge look={"outline"} class="py-2">
                    {topic.name}
                  </Badge>
                </Link>
              ))}
            </div>
            <div class="mt-6">
              <Button look={"primary"}>Join this group</Button>
            </div>
          </div>
        </div>
      </section>
      <Separator class="my-6" />
      <section></section>
    </div>
  );
});
