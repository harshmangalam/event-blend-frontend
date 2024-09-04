import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/ui/button/button";
import { useStartGroup } from ".";
import { Form } from "@builder.io/qwik-city";

export const StartGroupForm = component$(() => {
  const action = useStartGroup();
  return (
    <Form action={action}>
      <Button type="submit" look={"primary"}>
        Start a group
      </Button>
    </Form>
  );
});
