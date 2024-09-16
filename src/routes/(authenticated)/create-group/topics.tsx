import {
  $,
  component$,
  type Signal,
  useSignal,
  useTask$,
} from "@builder.io/qwik";

import { LuMinus, LuPlus } from "@qwikest/icons/lucide";
import { Badge } from "~/components/ui/badge/badge";
import { type ChooseTopicType, useGetTopicsOptions } from ".";

export const Topics = component$(
  ({ selectedTopics }: { selectedTopics: Signal<string[]> }) => {
    const topicsOptionsSig = useGetTopicsOptions();
    const topicsSig = useSignal<any[]>(
      topicsOptionsSig.value.map((t) => ({ ...t, selected: false })),
    );

    const handleUpdate = $(
      (topic: ChooseTopicType, action: "ADD" | "REMOVE") => {
        topicsSig.value = topicsSig.value.map((t) => {
          if (t.id === topic.id)
            return { ...t, selected: action === "ADD" ? true : false };
          else return t;
        });
      },
    );

    useTask$(({ track }) => {
      track(() => topicsSig.value);
      selectedTopics.value = topicsSig.value
        .filter((t) => t.selected)
        .map((t) => t.id);
    });

    return (
      <div>
        <div class="grid w-full  items-center gap-1.5">
          <div class="font-medium"> Choose topics</div>
        </div>

        <div class="mt-4 h-60 overflow-y-auto">
          <ul class="flex flex-wrap gap-2">
            {topicsSig.value.map((topic) => (
              <li key={topic.id}>
                <Badge
                  class="cursor-pointer px-4 py-2"
                  onClick$={() =>
                    handleUpdate(topic, topic.selected ? "REMOVE" : "ADD")
                  }
                  look={topic.selected ? "primary" : "outline"}
                >
                  {topic.selected ? (
                    <LuMinus class="mr-1 h-3 w-3" />
                  ) : (
                    <LuPlus class="mr-1 h-3 w-3" />
                  )}
                  {topic.name}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
);
