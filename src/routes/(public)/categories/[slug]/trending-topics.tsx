import { component$ } from "@builder.io/qwik";
import { useGetCategoryTrendingTopics } from ".";
import { TopicCard } from "./topic-card";

export const TrendingTopics = component$(() => {
  const topicsSig = useGetCategoryTrendingTopics();
  return (
    <div class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {topicsSig.value?.map((topic) => (
        <TopicCard key={topic.id} topic={topic} />
      ))}
    </div>
  );
});
