import { component$ } from "@builder.io/qwik";

export const SelctEventType = component$(() => {
  const eventTypes = [
    { label: "Online", value: "Online" },
    { label: "In Person", value: "InPerson" },
  ];
  return (
    <select id="eventType" name="eventType" class="rounded-md border px-4 py-3">
      <option value={""}>Select</option>
      {eventTypes.map(({ label, value}) => (
        <option value={label} key={value}>
          {label}
        </option>
      ))}
    </select>
  );
});
