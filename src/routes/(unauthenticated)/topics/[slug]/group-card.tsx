import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Card } from "~/components/ui/card/card";
import type { Group } from "~/lib/types";

export const GroupCard = component$(({ group }: { group: Group }) => {
  const { poster, name, slug, _count } = group;
  return (
    <Card.Root class="h-60 w-full max-w-xs">
      <Link href={`/groups/${slug}`}>
        <Card.Content
          class="relative h-full w-full bg-primary bg-cover bg-center bg-no-repeat p-0"
          style={{ backgroundImage: `url(${poster})` }}
        >
          <div class="absolute inset-0 bg-black/30"></div>
          <div class="absolute left-4 right-4 top-4 text-white">
            <h3 class="text-lg font-bold">{name}</h3>
            <p class="text-sm">
              <span class="font-semibold">{_count.members}</span> Members
            </p>
          </div>
        </Card.Content>
      </Link>
    </Card.Root>
  );
});
