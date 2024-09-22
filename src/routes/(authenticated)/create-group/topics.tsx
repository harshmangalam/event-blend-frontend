import {
  $,
  component$,
  type Signal,
  useSignal,
  useTask$,
} from "@builder.io/qwik";

import { LuMinus, LuPlus } from "@qwikest/icons/lucide";
import { Badge } from "~/components/ui/badge/badge";
import { type ChooseTopicType } from ".";
import type { TopicOption } from "~/lib/types";

type TopicOptionWithSelect = {
  [K in keyof TopicOption]: TopicOption[K];
} & {
  selected: boolean; // Add new property
};

export const Topics = component$(
  ({
    selectedTopicsSig,
    topicsOptionsSig,
  }: {
    selectedTopicsSig: Signal<string[]>;
    topicsOptionsSig: Signal<TopicOption[]>;
  }) => {
    const topicsSig = useSignal<TopicOptionWithSelect[]>([]);

    const handleUpdate = $(
      (topic: ChooseTopicType, action: "ADD" | "REMOVE") => {
        topicsSig.value = topicsSig.value.map((t) => {
          if (t.id === topic.id)
            return { ...t, selected: action === "ADD" ? true : false };
          else return t;
        });

        selectedTopicsSig.value = topicsSig.value
          .filter((t) => t.selected)
          .map((t) => t.id);
      },
    );

    useTask$(({ track }) => {
      track(() => topicsOptionsSig.value);
      topicsSig.value = topicsOptionsSig.value.map((t) => ({
        ...t,
        selected: false,
      }));
    });

    return (
      <div>
        <div class="grid w-full  items-center gap-1.5">
          <div class="font-medium"> Choose topics</div>
        </div>

        <div class="mt-4 h-32 overflow-y-auto">
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
