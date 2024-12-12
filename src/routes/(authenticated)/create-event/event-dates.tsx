import { component$, useSignal } from "@builder.io/qwik";
import { Input, Label } from "~/components/ui";

export const EventDates = component$(() => {
  const startDate = useSignal("");
  const startTime = useSignal("");
  const endDate = useSignal("");
  const endTime = useSignal("");

  const validateDates = () => {
    if (new Date(`${startDate.value}T${startTime.value}`) >= new Date(`${endDate.value}T${endTime.value}`)) {
      alert("End date and time must be later than start date and time.");
    }
  };

  return (
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div class="grid w-full items-center gap-1.5">
        <Label for="startDate">Start Date</Label>
        <Input
          id="startDate"
          type="date"
          placeholder="Start Date"
          name="startDate"
          value={startDate.value}
          onInput$={(e) => (startDate.value = e.target.value)}
        />
      </div>
      <div class="grid w-full items-center gap-1.5">
        <Label for="startTime">Start Time</Label>
        <Input
          id="startTime"
          type="time"
          placeholder="Start Time"
          name="startTime"
          value={startTime.value}
          onInput$={(e) => (startTime.value = e.target.value)}
        />
      </div>
      <div class="grid w-full items-center gap-1.5">
        <Label for="endDate">End Date</Label>
        <Input
          id="endDate"
          type="date"
          placeholder="End Date"
          name="endDate"
          value={endDate.value}
          onInput$={(e) => (endDate.value = e.target.value)}
        />
      </div>
      <div class="grid w-full items-center gap-1.5">
        <Label for="endTime">End Time</Label>
        <Input
          id="endTime"
          type="time"
          placeholder="End Time"
          name="endTime"
          value={endTime.value}
          onInput$={(e) => (endTime.value = e.target.value)}
        />
      </div>
      <button
        type="button"
        class="mt-4 btn btn-primary"
        onClick$={validateDates}
      >
        Validate and Submit
      </button>
    </div>
  );
});
