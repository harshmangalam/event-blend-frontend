import { component$, type QRL } from "@builder.io/qwik";
import { useFetchGroupsOptions } from ".";

export const SelctGroups = component$(
  ({ onSelect }: { onSelect: QRL<(e: Event) => Promise<void>> }) => {
    const groupsSig = useFetchGroupsOptions();
    return (
      <select
        id="groupId"
        name="groupId"
        class="rounded-md border px-4 py-3"
        onChange$={onSelect}
      >
        <option value={""}>Select</option>
        {groupsSig.value.map((c) => (
          <option value={c.id} key={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    );
  },
);
