import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { cn } from "@qwik-ui/utils";
import { Card } from "~/components/ui/card/card";
import type { Group } from "~/lib/types";

export const GroupCard = component$(
  ({ group, height }: { group: Group; height?: string }) => {
    const { poster, name, slug, _count } = group;
    return (
      <Card.Root class="w-full rounded-md">
        <Link href={`/${slug}`}>
          <Card.Content class="p-0">
            <div
              style={{ backgroundImage: `url(${poster})` }}
              class={cn(
                "relative h-60 rounded-md bg-cover bg-center bg-no-repeat",
                height,
              )}
            >
              <div class="absolute left-4 right-4 top-4 text-white">
                <h3 class="text-lg font-bold">{name}</h3>
                <p class="text-sm">
                  <span class="font-semibold">{_count.members}</span> Members
                </p>
              </div>
            </div>
          </Card.Content>
        </Link>
      </Card.Root>
    );
  },
);
