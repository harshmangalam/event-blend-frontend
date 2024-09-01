import { component$ } from "@builder.io/qwik";
import { Progress } from "~/components/ui/progress/progress";

export const GroupProgressStatus = component$(() => {
  return <Progress value={30} class="rounded-none" />;
});
