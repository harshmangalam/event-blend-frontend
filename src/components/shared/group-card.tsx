import { component$, Slot } from "@builder.io/qwik";
import { Card } from "~/components/ui/card/card";
import { Badge } from "~/components/ui/badge/badge";
import { Link } from "@builder.io/qwik-city";
import { LuMapPin } from "@qwikest/icons/lucide";

import { type Group } from "~/lib/types";
import { DEFAULT_POSTER } from "~/lib/constatnts";

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
export const GroupCard = component$(({ group }: { group: Group }) => {
  const { slug, location, name, category } = group;
  return (
    <Card.Root class="w-full max-w-md">
      <Link href={`/${slug}`} class="block h-full">
        <Card.Image
          width={300}
          height={160}
          src={group.poster ?? DEFAULT_POSTER}
          class="mb-4 grid h-48 w-full place-items-center rounded-t bg-muted"
        />

        <Card.Header class="py-0">
          <Card.Title class="text-lg font-bold">{name}</Card.Title>
        </Card.Header>
        <Card.Content>
          <IconWithText text={`${location.city}, ${location.country}`}>
            <LuMapPin class="h-4 w-4" />
          </IconWithText>
          <div class="mt-3">
            <Badge look={"primary"}>{category.name}</Badge>
          </div>
        </Card.Content>
      </Link>
    </Card.Root>
  );
});
