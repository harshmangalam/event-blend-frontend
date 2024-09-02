import { component$, Slot } from "@builder.io/qwik";
import { LuRocket } from "@qwikest/icons/lucide";
import { Card } from "~/components/ui/card/card";

export const TipBanner = component$(() => {
  return (
    <Card.Root class="bg-muted">
      <Card.Header class="pb-3">
        <Card.Title class="flex items-center gap-2">
          <LuRocket />
          Tip
        </Card.Title>
      </Card.Header>
      <Card.Content class="pb-3">
        <p>
          <Slot />
        </p>
      </Card.Content>
    </Card.Root>
  );
});
