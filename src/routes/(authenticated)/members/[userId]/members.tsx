import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { Card } from "~/components/ui";
import { DEFAULT_POSTER } from "~/lib/constatnts";
import { GroupMember } from "~/lib/types";

type MembersProps = {
  members?: null | GroupMember[];
};

export const Members = component$(({ members }: MembersProps) => {
  const location = useLocation();
  return (
    <Card.Root class="rounded-lg">
      <Card.Header>
        <Card.Title>Member ({members?.length || 0})</Card.Title>
      </Card.Header>
      <Card.Content>
        <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
          {members?.map(({ id, group, role }) => (
            <div class="flex gap-4" key={id}>
              <div>
                <img
                  src={group.poster ?? DEFAULT_POSTER}
                  alt={group.name}
                  width={120}
                  height={72}
                  class="aspect-video h-[72px] w-[120px] flex-none rounded-md"
                />
              </div>
              <div class="flex flex-col gap-2 text-sm">
                <div class="flex flex-col">
                  <Link
                    href={`/${group.slug}`}
                    class="font-bold hover:underline"
                  >
                    {group.name}
                  </Link>
                  <span class="text-xs text-muted-foreground">{role}</span>
                </div>
                <Link
                  href={`/members/${location.params.userId}/group/${group.id}`}
                  class="text-primary underline"
                >
                  Membership details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card.Root>
  );
});
