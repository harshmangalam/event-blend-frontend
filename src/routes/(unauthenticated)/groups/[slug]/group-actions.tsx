import { component$ } from "@builder.io/qwik";
import { LuMoreHorizontal } from "@qwikest/icons/lucide";
import { Button } from "~/components/ui/button/button";

export const GroupsActions = component$(() => {
  return (
    <div>
      <Button look={"outline"}>
        <LuMoreHorizontal class="h-5 w-5" />
      </Button>
    </div>
  );
});
