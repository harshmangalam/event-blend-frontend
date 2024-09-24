import { component$, Slot } from "@builder.io/qwik";
import { Card } from "~/components/ui/card/card";
import { DEFAULT_POSTER } from "~/lib/constatnts";
import type { Group } from "~/lib/types";
import { Button } from "../ui/button/button";
import { LuShare2, LuTag, LuUser2, LuUsers } from "@qwikest/icons/lucide";
import { Link, useNavigate } from "@builder.io/qwik-city";
import { Badge } from "../ui/badge/badge";

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

export const FlatGroupCard = component$(({ group }: { group: Group }) => {
  const navigate = useNavigate();
  return (
    <Card.Root class="w-full rounded-md border-none shadow-none">
      <Link href={`/groups/${group.slug}`}>
        <Card.Content class="p-0">
          <div class="flex flex-col gap-8 sm:flex-row">
            <Card.Image
              src={group.poster ?? DEFAULT_POSTER}
              class="aspect-video h-auto w-auto flex-none rounded-md object-cover sm:h-24"
              width={300}
              height={300}
            />
            <div class="flex-1">
              <h3 class="text-xl font-bold">{group.name}</h3>
              <h4 class="text-sm font-semibold uppercase text-muted-foreground">
                {group.location.city}, {group.location.country}
              </h4>

              <p class="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {group.description}
              </p>
              <div class="flex items-center justify-between gap-3">
                <div class="flex flex-wrap gap-3">
                  <IconWithText text={`${group.admin.name}`}>
                    <LuUser2 class="h-4 w-4" />
                  </IconWithText>
                  <IconWithText text={`${group._count.members} Members`}>
                    <LuUsers class="h-4 w-4" />
                  </IconWithText>
                  <IconWithText text={group.category.name}>
                    <LuTag class="h-4 w-4" />
                  </IconWithText>
                </div>
                <Button
                  preventdefault:click
                  stoppropagation:click
                  size={"sm"}
                  look={"ghost"}
                >
                  <LuShare2 class="h-4 w-4" />
                </Button>
              </div>
              <div class="mt-3 flex flex-wrap gap-3">
                {group.topics.map((topic) => (
                  <Badge
                    stoppropagation:click
                    preventdefault:click
                    key={topic.id}
                    onClick$={() => navigate(`/topics/${topic.slug}`)}
                    look={"outline"}
                  >
                    {topic.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card.Content>
      </Link>
    </Card.Root>
  );
});
