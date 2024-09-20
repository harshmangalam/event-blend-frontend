import { component$, useSignal } from "@builder.io/qwik";
import { Form, routeAction$, routeLoader$, zod$ } from "@builder.io/qwik-city";

import { Input } from "~/components/ui/input/input";
import { Label } from "~/components/ui/label/label";
import { Button } from "~/components/ui/button/button";
import { Textarea } from "~/components/ui/textarea/textarea";
import { fetchBackend } from "~/lib/fetch-backend";
import { REDIRECT_STATUS_CODE } from "~/lib/constatnts";
import type { ApiResponse, Category, Topic } from "~/lib/types";
import { Card } from "~/components/ui/card/card";
import { Topics } from "./topics";
import { Location } from "./location";
import { LuPlus } from "@qwikest/icons/lucide";

export const useFormAction = routeAction$(
  async (values, { redirect, cookie }) => {
    const accessToken = cookie.get("accessToken");
    if (!accessToken?.value) throw redirect(REDIRECT_STATUS_CODE, "/login");
    await fetchBackend()
      .url("/groups")
      .headers({ Authorization: `Bearer ${accessToken.value}` })
      .post({
        ...values,
        topics: values.topics.split(","),
        location: values.location.split(","),
      })
      .json();
    throw redirect(REDIRECT_STATUS_CODE, "/");
  },
  zod$((z) => ({
    name: z.string().min(1),
    description: z.string().min(1),
    categoryId: z.string().cuid2(),
    poster: z.string().min(1),
    topics: z.string().min(1),
    location: z.string().min(1),
  })),
);

export const useGetCategoriesOptions = routeLoader$(async () => {
  const resp = await fetchBackend
    .get(`/categories/categories-options`)
    .json<ApiResponse<{ categories: Pick<Category, "id" | "name">[] }>>();
  return resp.data?.categories;
});

export type ChooseTopicType = Pick<Topic, "id" | "name">;

export const useGetTopicsOptions = routeLoader$(async () => {
  const resp = await fetchBackend()
    .get(`/topics/topics-options`)
    .json<ApiResponse<{ topics: Pick<Category, "id" | "name">[] }>>();
  return resp.data?.topics ?? [];
});

export default component$(() => {
  const categoriesSig = useGetCategoriesOptions();
  const selectedTopicsSig = useSignal<string[]>([]);
  const selectedLocationSig = useSignal("");

  const actionSig = useFormAction();
  return (
    <Form action={actionSig}>
      <Card.Root>
        <Card.Header>
          <Card.Title class="text-xl font-bold">Create New Group</Card.Title>
          <Card.Description class="text-md">
            Create a new group to bring together people who share your passion!
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div class="grid grid-cols-1 gap-3">
            <div class="grid w-full items-center gap-1.5">
              <Label for={"name"}>Group name</Label>
              <Input
                name="name"
                id="name"
                error={actionSig.value?.fieldErrors.name}
              />
            </div>

            <div class="grid w-full items-center gap-1.5">
              <Label for={"description"}>Group description</Label>
              <Textarea
                id="description"
                rows={10}
                name="description"
                error={actionSig.value?.fieldErrors.description}
              />
            </div>

            <div class="grid w-full items-center gap-1.5">
              <Label for={"categoryId"}>Choose group category</Label>
              <select
                id="categoryId"
                name="categoryId"
                class="rounded-md border px-4 py-3"
              >
                <option value={""}>Select</option>
                {categoriesSig.value?.map((c) => (
                  <option value={c.id} key={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {actionSig.value?.fieldErrors.categoryId && (
                <p class="mt-1 text-sm text-alert">
                  {actionSig.value.fieldErrors.categoryId}
                </p>
              )}
            </div>

            <div class="grid w-full items-center gap-1.5">
              <Label for={"poster"}>Group poster url</Label>
              <Input
                id="poster"
                name="poster"
                error={actionSig.value?.fieldErrors.poster}
              />
            </div>

            <div>
              <Topics selectedTopicsSig={selectedTopicsSig} />
              <input
                type="text"
                name="topics"
                value={selectedTopicsSig.value}
              />
              {actionSig.value?.fieldErrors.topics && (
                <p class="mt-1 text-sm text-alert">
                  {actionSig.value.fieldErrors.topics}
                </p>
              )}
            </div>
            <div>
              <Location selectedLocationSig={selectedLocationSig} />
              <input
                type="text"
                name="location"
                value={selectedLocationSig.value}
              />
              {actionSig.value?.fieldErrors.location && (
                <p class="mt-1 text-sm text-alert">
                  {actionSig.value.fieldErrors.location}
                </p>
              )}
            </div>
          </div>
        </Card.Content>
        <Card.Footer>
          <Button type="submit">
            <LuPlus class="mr-2 h-4 w-4" />
            Create
          </Button>
        </Card.Footer>
      </Card.Root>
    </Form>
  );
});
