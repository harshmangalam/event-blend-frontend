import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { cn } from "@qwik-ui/utils";
import { LuArrowBigRight } from "@qwikest/icons/lucide";
import { DEFAULT_POSTER } from "~/lib/constatnts";
import type { Topic } from "~/lib/types";

export const TopicCard = component$(
  ({
    topic,
    twStyles = "aspect-auto",
  }: {
    topic: Topic;
    twStyles?: string;
  }) => {
    return (
      <Link href={`/topics/${topic.slug}`} key={topic.id} class="group">
        <img
          src={topic.groups[0]?.poster ?? DEFAULT_POSTER}
          width={400}
          height={800}
          class={cn(
            "aspect-auto h-72 w-full rounded-lg object-cover",
            twStyles,
          )}
        />
        <h3 class="mt-2 flex items-center gap-1 text-left font-bold text-primary">
          <span class="group-hover:underline">{topic.name}</span>
          <LuArrowBigRight class="h-5 w-5" />
        </h3>
      </Link>
    );
  },
);
