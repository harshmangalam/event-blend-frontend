import { component$ } from "@builder.io/qwik";
import { Input, Label } from "~/components/ui";

export const EeventDates = component$(() => {
  return (
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div class="grid w-full items-center gap-1.5">
        <Label for="startDate">Start date</Label>
        <Input
          id="startDate"
          type="date"
          placeholder="Start date"
          name="startDate"
        />
      </div>
      <div class="grid w-full items-center gap-1.5">
        <Label for="endDate">End date</Label>
        <Input
          id="endDate"
          type="date"
          placeholder="Start date"
          name="endDate"
        />
      </div>
    </div>
  );
});
