import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Badge, Card } from "~/components/ui";
import { Topic } from "~/lib/types";

type InterestsProps = {
  topics?: null | Pick<Topic, "id" | "name" | "slug">[];
};
export const Interests = component$(({ topics }: InterestsProps) => {
  return (
    <Card.Root class="rounded-lg">
      <Card.Header>
        <Card.Title>My interests ({topics?.length || 0})</Card.Title>
      </Card.Header>
      <Card.Content>
        <div class="flex flex-wrap items-center gap-2">
          {topics?.map((topic) => (
            <Link key={topic.id} href={`/topics/${topic.slug}`}>
              <Badge
                class="bg-muted px-4 py-2 hover:bg-primary hover:text-white"
                look="outline"
              >
                {topic.name}
              </Badge>
            </Link>
          ))}
        </div>
      </Card.Content>
    </Card.Root>
  );
});
