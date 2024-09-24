import { component$ } from "@builder.io/qwik";
import { Card } from "~/components/ui/card/card";
import { DEFAULT_POSTER } from "~/lib/constatnts";
import type { Event } from "~/lib/types";
import { Link } from "@builder.io/qwik-city";
import { Badge } from "../ui/badge/badge";
import { format } from "date-fns";

export const FlatEventCard = component$(({ event }: { event: Event }) => {
  return (
    <Card.Root class="w-full rounded-md border-none shadow-none">
      <Link href={`/${event.group.slug}/events/${event.id}`}>
        <Card.Content class="p-0">
          <div class="flex flex-col gap-8 sm:flex-row">
            <Card.Image
              src={event.poster ?? DEFAULT_POSTER}
              class="aspect-video h-auto w-auto flex-none rounded-md object-cover sm:h-24"
              width={300}
              height={300}
            />
            <div class="flex-1">
              <time
                dateTime={format(
                  event.dates[0].startDate,
                  "yyyy-MM-dd'T'HH:mm:ss",
                )}
                class="text-xs font-semibold uppercase text-muted-foreground"
              >
                {format(
                  event.dates[0].startDate,
                  "EEE, MMM d '·' h:mm a 'IST'",
                )}
              </time>
              <h3 class="text-lg font-semibold">{event.name}</h3>
              <h4 class="text-sm font-semibold text-muted-foreground">
                {event.category.name}
              </h4>
              <div class="mt-4 text-sm text-muted-foreground">
                {event._count.attendees} attendees
              </div>

              <div class="mt-3 flex flex-wrap gap-3">
                <Badge look={"primary"}>{event.category.name}</Badge>
              </div>
            </div>
          </div>
        </Card.Content>
      </Link>
    </Card.Root>
  );
});
