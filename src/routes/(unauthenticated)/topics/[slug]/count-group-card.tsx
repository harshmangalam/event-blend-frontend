import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Avatar } from "~/components/ui/avatar/avatar";
import type { Group } from "~/lib/types";

export const CountGroupCard = component$(
  ({ count, group }: { count: number; group: Group }) => {
    return (
      <div class="flex gap-6">
        <div class="text-2xl font-extrabold">{count}</div>
        <div class="flex flex-col gap-3">
          <div>
            <h3 class="font-bold">{group.name}</h3>
            <p class="flex items-center gap-2 text-sm">
              <span class="opacity-60">{group._count.members} Members</span>
              <span>|</span>
              <Link href="#" class="text-primary hover:underline">
                {group.location.city}, {group.location.country}
              </Link>
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Avatar.Root class="h-6 w-6">
              <Avatar.Image src={group.admin.profilePhoto}></Avatar.Image>
              <Avatar.Fallback>{group.admin.name.slice(0, 2)}</Avatar.Fallback>
            </Avatar.Root>
            <span class="opacity-60">Organized by {group.admin.name}</span>
          </div>
        </div>
      </div>
    );
  },
);
