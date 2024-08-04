import { component$, Slot } from "@builder.io/qwik";
import { Card } from "~/components/ui/card/card";
import { Badge } from "~/components/ui/badge/badge";
import { Link } from "@builder.io/qwik-city";
import {
  LuUsers,
  LuMapPin,
  LuCalendar,
  LuTag,
  LuUser2,
} from "@qwikest/icons/lucide";
import { formatDistance } from "date-fns";
import type { Event } from "~/lib/types";
import { Avatar } from "../ui/avatar/avatar";

export const IconWithText = component$(({ text }: { text: string }) => {
  return (
    <div class="mt-2 flex items-center gap-1 text-muted-foreground">
      <Slot />
      <span class="text-sm">{text}</span>
    </div>
  );
});
export const EventCard = component$(({ event }: { event: Event }) => {
  const {
    _count,
    id,
    location,
    name,
    topics,
    poster,
    group,
    createdAt,
    category,
  } = event;
  return (
    <Card.Root class="w-full max-w-md">
      <Link href={`/groups/${id}`} class="block h-full">
        {poster && (
          <Card.Image
            src={poster}
            width={300}
            height={160}
            class="aspect-video"
          ></Card.Image>
        )}
        <Card.Header class="pb-0">
          <Card.Title class="text-lg font-bold">{name}</Card.Title>
          <Card.Description>
            <span class="opacity-70">Hosted by: </span>
            <span class="font-medium">{group.name}</span>
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <IconWithText text={group.admin.name}>
            <LuUser2 class="h-4 w-4" />
          </IconWithText>
          <IconWithText text={`${_count.attendees} Attendees`}>
            <LuUsers class="h-4 w-4" />
          </IconWithText>

          <IconWithText text={location.city}>
            <LuMapPin class="h-4 w-4" />
          </IconWithText>

          <IconWithText
            text={formatDistance(createdAt, new Date(), {
              addSuffix: true,
            })}
          >
            <LuCalendar class="h-4 w-4" />
          </IconWithText>

          <IconWithText text={category.name}>
            <LuTag class="h-4 w-4" />
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
