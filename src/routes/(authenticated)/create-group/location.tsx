import { $, component$, useSignal, type Signal } from "@builder.io/qwik";
import { LuCheck, LuPlus } from "@qwikest/icons/lucide";
import { Badge } from "~/components/ui";
import { Input } from "~/components/ui/input/input";
import { Label } from "~/components/ui/label/label";
import { fetchLocations } from ".";
import { type GeoapifyLocation } from "~/lib/geoapify";

export const Location = component$(
  ({
    selectedLocationSig,
  }: {
    selectedLocationSig: Signal<GeoapifyLocation | undefined>;
  }) => {
    const locationsSig = useSignal<GeoapifyLocation[]>([]);

    const handleAdd = $((loc: GeoapifyLocation) => {
      selectedLocationSig.value = loc;
    });

    const handleSearchLocations = $(async (e: InputEvent) => {
      const value = (e.target as HTMLInputElement).value;
      const locations = await fetchLocations(value);
      locationsSig.value = locations;
    });
    return (
      <div class="grid w-full items-center gap-1.5">
        <Label for={"location"}>Add location</Label>
        <Input name="location" onInput$={handleSearchLocations} />
        <div class="grid w-full items-center gap-1.5">
          <ul class="flex flex-wrap gap-2">
            {locationsSig.value.map((loc) => (
              <li key={loc.place_id}>
                <Badge
                  class="cursor-pointer px-4 py-2"
                  onClick$={() => handleAdd(loc)}
                  look={
                    selectedLocationSig.value?.place_id === loc.place_id
                      ? "primary"
                      : "outline"
                  }
                >
                  {selectedLocationSig.value?.place_id === loc.place_id ? (
                    <LuCheck class="mr-1 h-3 w-3"></LuCheck>
                  ) : (
                    <LuPlus class="mr-1 h-3 w-3" />
                  )}
                  {loc.city || loc.name}, {loc.country}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
);
