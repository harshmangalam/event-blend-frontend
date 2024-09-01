import { component$, useSignal } from "@builder.io/qwik";
import { LuSearch } from "@qwikest/icons/lucide";
import { Badge } from "~/components/ui/badge/badge";
import { Input } from "~/components/ui/input/input";
import type { Topic } from "~/lib/types";

type ChooseTopicType = Pick<Topic, "id" | "name">;

export const Topics = component$(() => {
  const topicInputSig = useSignal<string>();
  const selectedTopics = useSignal<ChooseTopicType[]>([
    { id: "gagaga", name: "Topic1" },
    { id: "dwdwd", name: "Topic2" },
  ]);
  const topics = useSignal<ChooseTopicType[]>([
    { id: "gagaga", name: "Topic1" },
    { id: "dwdwd", name: "Topic2" },
    { id: "gagw2e2aga", name: "Topic3" },
    { id: "ss", name: "Topic4" },
    { id: "ssqss", name: "Topic5" },
    { id: "sssd", name: "Topic6" },
    { id: "sdccds", name: "Topic7" },
    { id: "sssdsd", name: "Topic8" },
  ]);
  return (
    <div>
      <div class="grid w-full max-w-sm items-center gap-1.5">
        <div class="relative">
          <Input
            placeholder="Search for topics"
            type="search"
            name="topic"
            bind:value={topicInputSig}
            class="pl-10"
          />
          <div class="absolute left-4 top-1/2 -translate-y-1/2">
            <LuSearch />
          </div>
        </div>
      </div>

      <ul class="mt-4 flex flex-wrap gap-4">
        <>
          {selectedTopics.value.map((topic) => (
            <li key={topic.id}>
              <Badge class="px-4 text-base font-normal" look={"primary"}>
                {topic.name}
              </Badge>
            </li>
          ))}
          {topics.value.map((topic) => (
            <li key={topic.id}>
              <Badge class="px-4 text-base font-normal" look={"outline"}>
                {topic.name}
              </Badge>
            </li>
          ))}
        </>
      </ul>
    </div>
  );
});
