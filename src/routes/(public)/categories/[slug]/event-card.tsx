import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Card } from "~/components/ui/card/card";
import { DEFAULT_POSTER } from "~/lib/constatnts";
import type { Event } from "~/lib/types";

export const EventCard = component$(({ event }: { event: Event }) => {
  const eventUrl = `/${event.group.slug}/events/${event.id}`;
  return (
    <Card.Root class="rounded-lg">
      <Link href={eventUrl}>
        <Card.Image
          src={event.poster ?? DEFAULT_POSTER}
          width={400}
          height={600}
          class="aspect-video h-auto w-full rounded-t-lg"
        />
      </Link>
      <Card.Header class="pb-2">
        <time
          class="text-sm font-bold uppercase text-primary opacity-80"
          dateTime="2024-09-28T08:30:00+05:30[Asia/Kolkata]"
          title="Sat Sep 28 2024 08:30:00 GMT+0530 (India Standard Time)"
        >
          Sat, Sep 28 · 8:30 AM IST
        </time>
      </Card.Header>
      <Card.Content>
        <Link href={eventUrl}>
          <Card.Title>{event.name}</Card.Title>
        </Link>
        <Card.Description class="mt-2">{event.details}</Card.Description>
      </Card.Content>
    </Card.Root>
  );
});
