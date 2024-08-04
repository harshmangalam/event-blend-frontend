import { component$, Slot } from "@builder.io/qwik";
import { Card } from "~/components/ui/card/card";
import { Badge } from "~/components/ui/badge/badge";
import { Link } from "@builder.io/qwik-city";
import { LuUsers, LuMapPin, LuUser2, LuCalendar } from "@qwikest/icons/lucide";
import { formatDistance } from "date-fns";
import { type Group } from "~/lib/types";
import { DEFAULT_POSTER } from "~/lib/constatnts";

export const IconWithText = component$(({ text }: { text: string }) => {
  return (
    <div class="mt-2 flex items-center gap-1 text-muted-foreground">
      <Slot />
      <span class="text-sm">{text}</span>
    </div>
  );
});
export const GroupCard = component$(({ group }: { group: Group }) => {
  const { _count, admin, createdAt, id, location, name, topics } = group;
  return (
    <Card.Root class="w-full max-w-md">
      <Link href={`/groups/${id}`} class="block h-full">
        <img
          width={300}
          height={160}
          src={group.poster ?? DEFAULT_POSTER}
          class="mb-4 grid h-48 w-full place-items-center rounded-t bg-muted"
        ></img>
        <Card.Content>
          <div class="flex justify-between gap-4">
            <h3 class="flex-1 text-xl font-semibold">{name}</h3>
            <div>
              <Badge look={"primary"} class="py-1.5">
                <LuUsers class="mr-1 h-4 w-4" />
                {_count.members}
              </Badge>
            </div>
          </div>
          <IconWithText text={admin.name}>
            <LuUser2 class="h-4 w-4" />
          </IconWithText>

          <IconWithText text={`${location.city}, ${location.country}`}>
            <LuMapPin class="h-4 w-4" />
          </IconWithText>

          <IconWithText
            text={formatDistance(createdAt, new Date(), {
              addSuffix: true,
            })}
          >
            <LuCalendar class="h-4 w-4" />
          </IconWithText>

          <div class="mt-4 flex flex-wrap gap-3">
            {topics.map((topic) => (
              <Badge key={topic.id} look={"outline"}>
                {topic.name}
              </Badge>
            ))}
          </div>
        </Card.Content>
      </Link>
    </Card.Root>
  );
});
