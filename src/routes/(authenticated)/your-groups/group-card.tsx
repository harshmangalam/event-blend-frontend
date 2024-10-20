import { component$ } from "@builder.io/qwik";
import { Card } from "~/components/ui";
import { type YourGroupMemberType } from ".";
import { DEFAULT_POSTER } from "~/lib/constatnts";
import { Link } from "@builder.io/qwik-city";

export const GroupCard = component$(
  ({ groupMember }: { groupMember: YourGroupMemberType }) => {
    return (
      <Link href={`/${groupMember.group.slug}`}>
        <Card.Root class="">
          <Card.Image
            src={groupMember.group.poster ?? DEFAULT_POSTER}
            height={100}
            width={300}
            class="aspect-video h-28 w-full"
          />
          <Card.Header>
            <Card.Title>{groupMember.group.name}</Card.Title>
            <Card.Description>{groupMember.role}</Card.Description>
          </Card.Header>
        </Card.Root>
      </Link>
    );
  },
);
