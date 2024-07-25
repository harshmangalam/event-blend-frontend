import { component$ } from "@builder.io/qwik";
import { Card } from "~/components/ui/card/card";
import { useGetPopularGroups } from ".";
import { Badge } from "~/components/ui/badge/badge";
import { Link } from "@builder.io/qwik-city";
import { LuUsers, LuMapPin, LuUser2, LuCalendar } from "@qwikest/icons/lucide";
import { formatDistance } from "date-fns";
export const PopularGroups = component$(() => {
  const popularGroups = useGetPopularGroups();
  return (
    <section>
      <div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <h2 class="text-xl font-semibold">Explore popular groups</h2>
        <Link class="text-primary hover:underline" href="/groups">
          See all groups
        </Link>
      </div>
      <div class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
        {popularGroups.value?.map(
          ({ id, name, _count, admin, location, topics, createdAt }) => (
            <Link href={`/groups/${id}`} key={id}>
              <Card.Root class="max-w-md">
                <div class="mb-4 grid h-40 w-full place-items-center rounded-t bg-muted"></div>
                <Card.Content>
                  <div class="flex justify-between gap-4">
                    <h3 class="flex-1 text-xl font-semibold">{name}</h3>
                    <Badge look={"primary"} class="rounded-full">
                      <LuUsers class="mr-2 h-4 w-4" />
                      {_count.members}
                    </Badge>
                  </div>
                  <div class="mt-2 flex items-center gap-1 text-muted-foreground">
                    <LuUser2 class="h-4 w-4" />
                    <span class="text-sm">{admin.name}</span>
                  </div>
                  <div class="mt-2 flex items-center gap-1 text-muted-foreground">
                    <LuMapPin class="h-4 w-4" />
                    <span class="text-sm">
                      {location.city}, {location.country}
                    </span>
                  </div>
                  <div class="mt-2 flex items-center gap-1 text-muted-foreground">
                    <LuCalendar class="h-4 w-4" />
                    <span class="text-sm">
                      {formatDistance(createdAt, new Date(), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <div class="mt-4 flex flex-wrap gap-3">
                    {topics.map((topic) => (
                      <Badge key={topic.id} look={"outline"}>
                        {topic.name}
                      </Badge>
                    ))}
                  </div>
                </Card.Content>
              </Card.Root>
            </Link>
          ),
        )}
      </div>
    </section>
  );
});
