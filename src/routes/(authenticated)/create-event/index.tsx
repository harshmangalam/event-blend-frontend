import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  routeLoader$,
  server$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { LuPlus } from "@qwikest/icons/lucide";
import { Button, Card, Input, Label, Textarea } from "~/components/ui";
import { fetchBackend } from "~/lib/fetch-backend";
import type {
  ApiResponse,
  Category,
  GroupOptions,
  TopicOption,
} from "~/lib/types";
import { SelctGroups } from "./select-groups";
import { Location } from "../location";
import type { GeoapifyLocation } from "~/lib/geoapify";
import { Topics } from "../topics";
import { SelctEventTypes } from "./select-event-types";

export const useCreateEvent = routeAction$(
  () => {},
  zod$({
    name: z.string().min(5).max(100),
    details: z.string().min(20).max(1000),
    groupId: z.string().cuid2(),
    poster: z.string().url(),
    location: z.string().min(1),
    topics: z.string().min(1),
    address: z.string().min(1),
    categoryId: z.string().cuid2(),
    eventType: z.string().min(1),
  }),
);

export const useFetchGroupsOptions = routeLoader$(async (event) => {
  const resp = await fetchBackend(event)
    .get("/groups/groups-options")
    .json<ApiResponse<{ groups: GroupOptions[] }>>();
  return resp.data?.groups || [];
});

export const fetchTopicsOptions = server$(async (categoryId?: string) => {
  if (!categoryId) return [];
  const resp = await fetchBackend()
    .get(`/topics/topics-options?categoryId=${categoryId}`)
    .json<ApiResponse<{ topics: TopicOption[] }>>();
  return resp.data?.topics || [];
});
export const fetchGroupCategory = server$(async (groupId: string) => {
  const resp = await fetchBackend()
    .get(`/groups/${groupId}/category`)
    .json<ApiResponse<{ category: Category }>>();
  return resp.data?.category || null;
});

export default component$(() => {
  const createEventSig = useCreateEvent();
  const selectedLocationSig = useSignal<GeoapifyLocation | null>(null);
  const topicsOptionsSig = useSignal<TopicOption[]>([]);
  const selectedTopicsSig = useSignal<string[]>([]);
  const categorySig = useSignal<Category | null>(null);

  const handleFetchTopics = $(async (e: Event) => {
    const value = (e.target as HTMLSelectElement).value;
    categorySig.value = await fetchGroupCategory(value);
    topicsOptionsSig.value = await fetchTopicsOptions(categorySig.value?.id);
  });

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
              <Label for={"name"}>Select group</Label>
              <SelctGroups onSelect={handleFetchTopics} />
              {createEventSig.value?.fieldErrors?.groupId && (
                <p class="mt-1 text-sm text-alert">
                  {createEventSig.value.fieldErrors.groupId}
                </p>
              )}
            </div>
            {categorySig.value && (
              <div class="grid w-full items-center gap-1.5">
                <Label for={"name"}>Event category</Label>
                <Input
                  readOnly
                  type="text"
                  name="categoryId"
                  id="categoryId"
                  value={categorySig.value.name}
                />
                {createEventSig.value?.fieldErrors?.groupId && (
                  <p class="mt-1 text-sm text-alert">
                    {createEventSig.value.fieldErrors.categoryId}
                  </p>
                )}
              </div>
            )}

            {topicsOptionsSig.value.length ? (
              <>
                <Topics
                  selectedTopicsSig={selectedTopicsSig}
                  topicsOptionsSig={topicsOptionsSig}
                />
                <input
                  type="hidden"
                  name="topics"
                  value={selectedTopicsSig.value}
                />
                {createEventSig.value?.fieldErrors?.topics && (
                  <p class="mt-1 text-sm text-alert">
                    {createEventSig.value.fieldErrors.topics}
                  </p>
                )}
              </>
            ) : null}

            <div class="grid w-full items-center gap-1.5">
              <Label for={"name"}>Select event type</Label>
              <SelctEventTypes />
              {createEventSig.value?.fieldErrors?.eventType && (
                <p class="mt-1 text-sm text-alert">
                  {createEventSig.value.fieldErrors.eventType}
                </p>
              )}
            </div>

            <div class="grid w-full items-center gap-1.5">
              <Label for={"poster"}>Group poster url</Label>
              <Input
                id="poster"
                name="poster"
                error={createEventSig.value?.fieldErrors?.poster}
              />
            </div>

            <div>
              <Location selectedLocationSig={selectedLocationSig} />
              <input
                type="hidden"
                name="location"
                value={`${selectedLocationSig.value?.lat},${selectedLocationSig.value?.lon}`}
              />
              {createEventSig.value?.fieldErrors?.location && (
                <p class="mt-1 text-sm text-alert">
                  {createEventSig.value.fieldErrors.location}
                </p>
              )}
            </div>
            <div class="grid w-full items-center gap-1.5">
              <Label for={"address"}>Add address</Label>
              <Textarea
                id="address"
                name="address"
                rows={10}
                error={createEventSig.value?.fieldErrors?.address}
              />
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
