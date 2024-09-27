import { component$ } from "@builder.io/qwik";
import { Avatar, Card } from "~/components/ui";
import type { Group } from "~/lib/types";

export const GroupCard = component$(
  ({ group }: { group: Pick<Group, "name" | "poster"> }) => {
    const { name, poster } = group;
    return (
      <Card.Root>
        <Card.Content class="py-4">
          <div class="flex items-center gap-4">
            <Avatar.Root>
              <Avatar.Image src={poster ?? ""} alt={name} />
              <Avatar.Fallback>{name.slice(0, 2)}</Avatar.Fallback>
            </Avatar.Root>
            <div class="flex flex-col">
              <span class="font-bold">{name}</span>
            </div>
          </div>
        </Card.Content>
      </Card.Root>
    );
  },
);
