import { component$ } from "@builder.io/qwik";
import { Form, Link } from "@builder.io/qwik-city";
import { Button, buttonVariants } from "~/components/ui";
import { useGetIsMember, useJoinLeaveGroupAction } from "./layout";
import { useSession } from "~/routes/plugin@auth";

export const JoinLeaveGroup = component$(({ groupId }: { groupId: string }) => {
  const isMemberSig = useGetIsMember();
  const sessionSig = useSession();
  const joinLeaveGroup = useJoinLeaveGroupAction();

  if (!sessionSig.value.user) {
    return (
      <Link class={buttonVariants({ look: "primary" })} href="/login">
        Login to join this group
      </Link>
    );
  }
  return (
    <Form action={joinLeaveGroup}>
      <input type="hidden" name="groupId" value={groupId} />
      <Button
        disabled={joinLeaveGroup.isRunning}
        class="w-full"
        look={isMemberSig.value ? "secondary" : "primary"}
      >
        {isMemberSig.value ? "Leave this group" : " Join this group"}
      </Button>
    </Form>
  );
});
