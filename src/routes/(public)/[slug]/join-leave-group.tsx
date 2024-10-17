import { component$ } from "@builder.io/qwik";
import { Form, Link } from "@builder.io/qwik-city";
import { Button, buttonVariants } from "~/components/ui";
import { useGetIsMember } from "./layout";
import { useSession } from "~/routes/plugin@auth";

export const JoinLeaveGroup = component$(() => {
  const isMemberSig = useGetIsMember();
  const sessionSig = useSession();

  if (!sessionSig.value.user) {
    return (
      <Link class={buttonVariants({ look: "primary" })} href="/login">
        Login to join this group
      </Link>
    );
  }
  return (
    <Form>
      <Button class="w-full" look={isMemberSig.value ? "secondary" : "primary"}>
        {isMemberSig.value ? "Leave this group" : " Join this group"}
      </Button>
    </Form>
  );
});
