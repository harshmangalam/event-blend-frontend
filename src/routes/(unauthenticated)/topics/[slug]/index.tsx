import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { fetchBackend } from "~/lib/fetch-backend";
import type { ApiResponse, Topic } from "~/lib/types";
import { Counts } from "./counts";
import { Separator } from "~/components/ui/separator/separator";
import { Button } from "~/components/ui/button/button";
import { Badge } from "~/components/ui/badge/badge";

export const useFetchTopicDetails = routeLoader$(async ({ params }) => {
  const resp = await fetchBackend
    .get(`/topics/slug/${params.slug}`)
    .json<ApiResponse<{ topic: Topic }>>();
  return resp.data?.topic;
});

export const useFetchRelatedTopics = routeLoader$(async ({ params }) => {
  const resp = await fetchBackend
    .get(`/topics/slug/${params.slug}/related-topics`)
    .json<ApiResponse<{ topics: Pick<Topic, "id" | "slug" | "name">[] }>>();
  return resp.data?.topics;
});

export default component$(() => {
  const topicSig = useFetchTopicDetails();
  const relatedTopics = useFetchRelatedTopics();
  return (
    <div class="mx-auto w-full max-w-2xl px-4 py-12">
      <div class="grid grid-cols-1 items-center gap-6">
        <div class="grid grid-cols-1 items-center gap-4">
          <h2 class="text-center text-3xl font-bold opacity-70">
            {topicSig.value?.name}
          </h2>
          <p class="sm:text-center">
            Meet other local people interested in {topicSig.value?.name}: share
            experiences, inspire and encourage each other! Join a{" "}
            {topicSig.value?.name} group.
          </p>
        </div>
        <div class="grid grid-cols-2 gap-6  md:grid-cols-3">
          <Counts
            label="Members"
            count={topicSig.value?._count.followedByUsers ?? 0}
          />
          <Counts label="Groups" count={topicSig.value?._count.groups ?? 0} />
          <Counts label="Events" count={topicSig.value?._count.events ?? 0} />
        </div>
        <div>
          <Button size={"sm"}>Join {topicSig.value?.name} groups</Button>
        </div>
        <div>
          <div class="font-medium">Related Topics</div>
          <div class="mt-3 flex flex-wrap gap-6">
            {relatedTopics.value?.map((topic) => (
              <Link key={topic.id} href={`/topics/${topic.slug}`}>
                <Badge class="px-4 py-2" look={"outline"}>
                  {topic.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
