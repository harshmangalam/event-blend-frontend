import { component$ } from "@builder.io/qwik";
import * as v from "valibot";
import { routeLoader$ } from "@builder.io/qwik-city";
import {
  formAction$,
  useForm,
  valiForm$,
  type InitialValues,
} from "@modular-forms/qwik";
import { Input } from "~/components/ui/input/input";
import { Label } from "~/components/ui/label/label";
import { Button } from "~/components/ui/button/button";
import { Textarea } from "~/components/ui/textarea/textarea";
import { fetchBackend } from "~/lib/fetch-backend";
import { REDIRECT_STATUS_CODE } from "~/lib/constatnts";
import type { ApiResponse, Category, Topic } from "~/lib/types";
import { Card } from "~/components/ui/card/card";
import { LuPlus } from "@qwikest/icons/lucide";
import { Topics } from "./topics";

const BasicInfoSchema = v.object({
  name: v.pipe(
    v.string(),
    v.maxLength(50),
    v.nonEmpty("Please enter your group name."),
  ),
  description: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your group description."),
  ),
  categoryId: v.pipe(
    v.string(),
    v.nonEmpty("Please select your group category."),
  ),
  poster: v.optional(v.string()),
});
type BasicInfoForm = v.InferInput<typeof BasicInfoSchema>;

export const useFormLoader = routeLoader$<InitialValues<BasicInfoForm>>(() => ({
  name: "",
  description: "",
  categoryId: "",
  poster: "",
}));

export const useFormAction = formAction$<BasicInfoForm>(
  async (values, { redirect, cookie, error }) => {
    const accessToken = cookie.get("accessToken");
    if (!accessToken?.value)
      throw error(401, "Unauthenticated, Please login again!");
    await fetchBackend
      .url("/groups")
      .headers({ Authorization: `Bearer ${accessToken.value}` })
      .post(values)
      .json();
    throw redirect(REDIRECT_STATUS_CODE, "/start-group/category");
  },
  valiForm$(BasicInfoSchema),
);

export const useGetCategoriesOptions = routeLoader$(async () => {
  const resp = await fetchBackend
    .get(`/categories/categories-options`)
    .json<ApiResponse<{ categories: Pick<Category, "id" | "name">[] }>>();
  return resp.data?.categories;
});

export type ChooseTopicType = Pick<Topic, "id" | "name">;

export const useGetTopicsOptions = routeLoader$(async () => {
  const resp = await fetchBackend
    .get(`/topics/topics-options`)
    .json<ApiResponse<{ topics: Pick<Category, "id" | "name">[] }>>();
  return resp.data?.topics ?? [];
});

export default component$(() => {
  const categoriesSig = useGetCategoriesOptions();

  const [, { Form, Field }] = useForm<BasicInfoForm>({
    loader: useFormLoader(),
    validate: valiForm$(BasicInfoSchema),
    action: useFormAction(),
  });
  return (
    <Form>
      <Card.Root>
        <Card.Header>
          <Card.Title class="text-xl font-bold">Create New Group</Card.Title>
          <Card.Description class="text-md">
            Create a new group to bring together people who share your passion!
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div class="grid grid-cols-1 gap-3">
            <Field name="name">
              {(field, props) => (
                <div class="grid w-full items-center gap-1.5">
                  <Label for={props.name}>Group name</Label>
                  <Input {...props} error={field.error} />
                </div>
              )}
            </Field>
            <Field name="description">
              {(field, props) => (
                <div class="grid w-full items-center gap-1.5">
                  <Label for={props.name}>Group description</Label>
                  <Textarea rows={10} {...props} error={field.error} />
                </div>
              )}
            </Field>
            <Field name="categoryId">
              {(field, props) => (
                <div class="grid w-full items-center gap-1.5">
                  <Label for={props.name}>Choose group category</Label>
                  <select {...props} class="rounded-md border px-4 py-3">
                    <option value={""}>Select</option>
                    {categoriesSig.value?.map((c) => (
                      <option value={c.id} key={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {field.error && (
                    <p class="mt-1 text-sm text-alert">{field.error}</p>
                  )}
                </div>
              )}
            </Field>
            <Field name="poster">
              {(field, props) => (
                <div class="grid w-full items-center gap-1.5">
                  <Label for={props.name}>Group poster url</Label>
                  <Input {...props} error={field.error} />
                </div>
              )}
            </Field>
            <Topics />
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
