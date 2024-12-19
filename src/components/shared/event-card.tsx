import { component$, Slot } from "@builder.io/qwik";
import { Card } from "~/components/ui/card/card";
import { Badge } from "~/components/ui/badge/badge";
import { Link } from "@builder.io/qwik-city";
import { LuUsers, LuMapPin, LuCalendar } from "@qwikest/icons/lucide";
import { formatDistance } from "date-fns";
import type { Event } from "~/lib/types";

export const IconWithText = component$(({ text }: { text: string }) => {
  return (
    <div class="mt-2 flex items-center gap-1 text-muted-foreground">
      <Slot />
      <span class="text-sm">{text}</span>
    </div>
  );
});

export const EventCard = component$(({ event }: { event: Event }) => {
  const { _count, id, location, name, poster, group, createdAt, category } =
    event;

  return (
    <Card.Root class="w-full rounded-lg max-w-md">
      {/* Link the whole card to the event details */}
      <Link href={`/${group.slug}/events/${id}`} class="block h-full">
        {poster && (
          <Card.Image
            src={poster}
            width={300}
            height={160}
            class="mb-4 grid h-48 w-full place-items-center rounded-t-lg bg-muted"
          ></Card.Image>
        )}
        <Card.Header class="py-0">
          <Card.Title class="text-lg font-bold">{name}</Card.Title>
          <Card.Description>
            <span class="opacity-70">Hosted by: </span>
            {/* Link the group name to the group details */}
            <Link
              href={`/${group.slug}`}
              class="font-medium text-primary hover:underline"
              onClick$={(e) => e.stopPropagation()} // Prevent bubbling to the outer link
            >
              {group.name}
            </Link>
          </Card.Description>
        </Card.Header>
        <Card.Content>
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

          <div class="mt-3">
            <Badge look={"primary"}>{category.name}</Badge>
          </div>
        </Card.Content>
      </Link>
    </Card.Root>
  );
});
