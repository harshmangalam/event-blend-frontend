import { component$ } from "@builder.io/qwik";
import { useGetCategoryTopics } from ".";
import { TopicCard } from "./topic-card";

export const Topics = component$(({ name }: { name?: string }) => {
  const topicsSig = useGetCategoryTopics();
  return (
    <div class="mt-12">
      <h2 class="text-center text-3xl font-extrabold">
        Explore popular topics within {name}
      </h2>
      <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topicsSig.value?.map((topic) => (
          <TopicCard
            twStyles="h-52 aspect-video"
            key={topic.id}
            topic={topic}
          />
        ))}
      </div>
    </div>
  );
});
