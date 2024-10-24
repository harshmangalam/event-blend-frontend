import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { LuX, LuPlus } from "@qwikest/icons/lucide";
import { Button } from "~/components/ui";
import { useHasAlreadyRSVP, useRSVP } from "./index@event";

export const JoinEvent = component$(() => {
  const hasRSVPSig = useHasAlreadyRSVP();
  const rsvpAction = useRSVP();
  return (
    <Form action={rsvpAction}>
      <Button
        disabled={rsvpAction.isRunning}
        type="submit"
        look={hasRSVPSig.value ? "alert" : "primary"}
      >
        {hasRSVPSig.value ? <LuX class="mr-2" /> : <LuPlus class="mr-2" />}
        {hasRSVPSig.value ? "Cancel RSVP" : "Attend"}
      </Button>
    </Form>
  );
});
