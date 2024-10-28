import { component$ } from "@builder.io/qwik";
import { Form, Link } from "@builder.io/qwik-city";
import { LuX, LuPlus } from "@qwikest/icons/lucide";
import { Button, buttonVariants } from "~/components/ui";
import { useHasAlreadyRSVP, useRSVP } from "./index@event";
import { useSession } from "~/routes/plugin@auth";

export const RSVPEvent = component$(() => {
  const hasRSVPSig = useHasAlreadyRSVP();
  const rsvpAction = useRSVP();
  const sessionSig = useSession();

  if (!sessionSig.value.user) {
    return (
      <Link href="/login" class={buttonVariants()}>
        Login to join event
      </Link>
    );
  }
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
