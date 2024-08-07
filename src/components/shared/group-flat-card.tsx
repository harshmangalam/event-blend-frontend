import { component$, Slot } from "@builder.io/qwik";
import { Card } from "~/components/ui/card/card";
import { DEFAULT_POSTER } from "~/lib/constatnts";
import type { Group } from "~/lib/types";
import { Button } from "../ui/button/button";
import { LuShare2, LuTag, LuUsers } from "@qwikest/icons/lucide";
import { Link } from "@builder.io/qwik-city";

export const IconWithText = component$(
  ({ text }: { text: string | number }) => {
    return (
      <div class="mt-2 flex items-center gap-1 text-muted-foreground">
        <Slot />
        <span class="text-sm">{text}</span>
      </div>
    );
  },
);

export const GroupFlatCard = component$(({ group }: { group: Group }) => {
  return (
    <Card.Root class="w-full rounded-md border-none shadow-none">
      <Link href={`/groups/${group.slug}`}>
        <Card.Content class="p-0">
          <div class="flex gap-8">
            <Card.Image
              src={group.poster ?? DEFAULT_POSTER}
              class="aspect-video h-24 w-auto flex-none rounded-md object-cover"
              width={160}
              height={80}
            />
            <div class="flex flex-1 flex-col gap-4">
              <div>
                <h3 class="text-xl font-bold">{group.name}</h3>
                <h4 class="text-sm font-semibold uppercase text-muted-foreground">
                  {group.location.city}, {group.location.country}
                </h4>
              </div>
              <p class="line-clamp-2 text-muted-foreground">
                {group.description}
              </p>
              <div class="flex items-center justify-between gap-4">
                <div class="flex flex-wrap items-center gap-4">
                  <IconWithText text={`${group._count.members} Members`}>
                    <LuUsers class="mr-1 h-4 w-4" />
                  </IconWithText>
                  <IconWithText text={group.category.name}>
                    <LuTag class="h-4 w-4" />
                  </IconWithText>
                </div>
                <Button stoppropagation:click size={"sm"} look={"ghost"}>
                  <LuShare2 class="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card.Content>
      </Link>
    </Card.Root>
  );
});
