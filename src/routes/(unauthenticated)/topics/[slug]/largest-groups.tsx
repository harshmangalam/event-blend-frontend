import { component$ } from "@builder.io/qwik";
import { useFetchLargestGroups } from ".";
import { CountGroupCard } from "./count-group-card";

export const LargestGroups = component$(({ name }: { name?: string }) => {
  const groupsSig = useFetchLargestGroups();
  return (
    <div>
      <h3 class="mb-3 text-2xl font-bold">Largest {name} groups</h3>
      <div class="flex flex-col gap-3">
        {groupsSig.value?.map((group, i) => (
          <CountGroupCard key={group.id} count={i + 1} group={group} />
        ))}
      </div>
    </div>
  );
});
