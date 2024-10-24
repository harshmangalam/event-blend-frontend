import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { LuPlus } from "@qwikest/icons/lucide";
import { Button } from "~/components/ui";
import { useHasAlreadyRSVP } from "./index@event";

export const JoinEvent = component$(() => {
  const hasRSVPSig = useHasAlreadyRSVP();
  return (
    <Form>
      <Button type="submit">
        <LuPlus class="mr-2" />
        {hasRSVPSig.value ? "Cancel RSVP" : "Attend"}
      </Button>
    </Form>
  );
});
