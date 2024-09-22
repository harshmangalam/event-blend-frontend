import { component$ } from "@builder.io/qwik";
import { useFetchGroupsOptions } from ".";

export const SelctGroups = component$(() => {
  const groupsSig = useFetchGroupsOptions();
  return (
    <select
      id="categoryId"
      name="categoryId"
      class="rounded-md border px-4 py-3"
    >
      <option value={""}>Select</option>
      {groupsSig.value.map((c) => (
        <option value={c.id} key={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  );
});
