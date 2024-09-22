import { component$ } from "@builder.io/qwik";

export const SelctEventTypes = component$(() => {
  const eventTypes = ["Online", "InPerson"];
  return (
    <select
      id="categoryId"
      name="categoryId"
      class="rounded-md border px-4 py-3"
    >
      <option value={""}>Select</option>
      {eventTypes.map((eventType) => (
        <option value={eventType} key={eventType}>
          {eventType}
        </option>
      ))}
    </select>
  );
});
