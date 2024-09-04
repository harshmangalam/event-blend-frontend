import { component$ } from "@builder.io/qwik";
import { useFetchNewestGroups } from ".";
import { GroupCard } from "./group-card";

export const NewestGroups = component$(({ name }: { name?: string }) => {
  const groupsSig = useFetchNewestGroups();
  return (
    <div>
      <h3 class="mb-6 text-2xl font-bold">Newest {name} groups</h3>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {groupsSig.value.map((group) => (
          <GroupCard height="h-40" key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
});
