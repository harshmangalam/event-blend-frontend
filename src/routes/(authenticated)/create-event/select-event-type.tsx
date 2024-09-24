import { component$ } from "@builder.io/qwik";

export const SelctEventType = component$(() => {
  const eventTypes = ["Online", "InPerson"];
  return (
    <select id="eventType" name="eventType" class="rounded-md border px-4 py-3">
      <option value={""}>Select</option>
      {eventTypes.map((eventType) => (
        <option value={eventType} key={eventType}>
          {eventType}
        </option>
      ))}
    </select>
  );
});
