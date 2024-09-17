import { component$, type Signal } from "@builder.io/qwik";
import { Input } from "~/components/ui/input/input";
import { Label } from "~/components/ui/label/label";

export const Location = component$(
  ({ selectedLocationSig }: { selectedLocationSig: Signal<string> }) => {
    return (
      <div class="grid w-full items-center gap-1.5">
        <Label for={"location"}>Add location</Label>
        <Input name="location" bind:value={selectedLocationSig} />
      </div>
    );
  },
);
