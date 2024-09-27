import { component$ } from "@builder.io/qwik";
import { LuMapPin } from "@qwikest/icons/lucide";
import { Card } from "~/components/ui";
import type { Event } from "~/lib/types";

export const LocationCard = component$(
  ({ address, location }: Pick<Event, "location" | "address">) => {
    return (
      <Card.Root>
        <Card.Content class="py-4">
          <div class="flex gap-4">
            <LuMapPin class="my-1 h-5 w-5 flex-none text-muted-foreground" />
            <div class="flex flex-col">
              <span class="font-medium">
                {location.city}, {location.country}
              </span>
              <span class="text-sm text-muted-foreground">{address}</span>
            </div>
          </div>
        </Card.Content>
      </Card.Root>
    );
  },
);
