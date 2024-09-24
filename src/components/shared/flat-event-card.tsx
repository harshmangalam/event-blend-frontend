import { component$ } from "@builder.io/qwik";
import { Card } from "~/components/ui/card/card";
import { DEFAULT_POSTER } from "~/lib/constatnts";
import type { Event } from "~/lib/types";
import { Link } from "@builder.io/qwik-city";
import { Badge } from "../ui/badge/badge";

export const FlatEventCard = component$(({ event }: { event: Event }) => {
  return (
    <Card.Root class="w-full rounded-md border-none shadow-none">
      <Link href={`/groups/${event.id}`}>
        <Card.Content class="p-0">
          <div class="flex flex-col gap-8 sm:flex-row">
            <Card.Image
              src={event.poster ?? DEFAULT_POSTER}
              class="aspect-video h-auto w-auto flex-none rounded-md object-cover sm:h-24"
              width={300}
              height={300}
            />
            <div class="flex-1">
              <h3 class="text-xl font-bold">{event.name}</h3>
              <h4 class="text-sm font-semibold uppercase text-muted-foreground">
                {event.location.city}, {event.location.country}
              </h4>

              <div class="mt-3 flex flex-wrap gap-3">
                <Badge look={"outline"}>{event.category.name}</Badge>
              </div>
            </div>
          </div>
        </Card.Content>
      </Link>
    </Card.Root>
  );
});
