import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { Progress } from "~/components/ui/progress/progress";

export const GroupProgressStatus = component$(() => {
  const location = useLocation();
  const statusObject: { [key: string]: number } = {
    "basic-info": 40,
    category: 60,
    topics: 80,
    location: 100,
  };

  const progressSig = useSignal(0);

  useTask$(() => {
    Object.keys(statusObject).map((path) => {
      if (location.url.pathname.includes(path)) {
        progressSig.value = statusObject[path];
      }
    });
  });
  return <Progress value={progressSig.value} class="rounded-none" />;
});
