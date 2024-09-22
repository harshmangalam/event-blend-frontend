import { component$ } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { LuPlus } from "@qwikest/icons/lucide";
import { Button, Card, Input, Label, Textarea } from "~/components/ui";
import { fetchBackend } from "~/lib/fetch-backend";
import type { ApiResponse, GroupOptions } from "~/lib/types";
import { SelctGroups } from "./select-groups";

export const useCreateEvent = routeAction$(
  () => {},
  zod$({
    name: z.string().min(5).max(100),
    details: z.string().min(20).max(1000),
    groupId: z.string().cuid2(),
  }),
);

export const useFetchGroupsOptions = routeLoader$(async (event) => {
  const resp = await fetchBackend(event)
    .get("/groups/groups-options")
    .json<ApiResponse<{ topics: GroupOptions[] }>>();
  return resp.data?.topics || [];
});

export default component$(() => {
  const createEventSig = useCreateEvent();
  return (
    <Form action={createEventSig} class="w-full max-w-xl">
      <Card.Root>
        <Card.Header>
          <Card.Title class="text-xl font-bold">Create New Event</Card.Title>
          <Card.Description class="text-md">
            Create your event effortlessly by adding essential info, so
            attendees can discover, join, and stay updated on your upcoming
            gathering.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div class="grid grid-cols-1 gap-3">
            <div class="grid w-full items-center gap-1.5">
              <Label for={"name"}>Event name</Label>
              <Input
                id="name"
                name="name"
                error={createEventSig.value?.fieldErrors?.name}
              />
            </div>
            <div class="grid w-full items-center gap-1.5">
              <Label for={"name"}>Event details</Label>
              <Textarea
                id="details"
                name="details"
                rows={10}
                error={createEventSig.value?.fieldErrors?.details}
              />
            </div>
            <div class="grid w-full items-center gap-1.5">
              <Label for={"name"}>Event details</Label>
              <SelctGroups />
              {createEventSig.value?.fieldErrors?.groupId && (
                <p class="mt-1 text-sm text-alert">
                  {createEventSig.value.fieldErrors.groupId}
                </p>
              )}
            </div>
          </div>
        </Card.Content>
        <Card.Footer>
          <Button type="submit" disabled={createEventSig.isRunning}>
            <LuPlus class="mr-2 h-4 w-4" />
            Create
          </Button>
        </Card.Footer>
      </Card.Root>
    </Form>
  );
});
