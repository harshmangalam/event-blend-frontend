import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button/button";
import * as v from "valibot";
import { fetchBackend } from "~/lib/fetch-backend";
import type { ApiResponse, Category, Group } from "~/lib/types";
import { ACCESS_TOKEN_KEY, REDIRECT_STATUS_CODE } from "~/lib/constatnts";
import {
  formAction$,
  useForm,
  valiForm$,
  type InitialValues,
} from "@modular-forms/qwik";
import { Label } from "~/components/ui/label/label";
import { Input } from "~/components/ui/input/input";

type CategoryOption = Pick<Category, "id" | "name">;
type PendingGroupType = Pick<Group, "id" | "name">;
export const useGetPendingGroup = routeLoader$(async ({ redirect, cookie }) => {
  const resp = await fetchBackend
    .headers({ Authorization: `Bearer ${cookie.get("accessToken")?.value}` })
    .get("/groups/pending-groups")
    .json<ApiResponse<{ groups: PendingGroupType[] }>>();

  if (!resp.data?.groups.length) throw redirect(302, "/");
  return resp.data.groups[0];
});
export const useGetCategories = routeLoader$(async () => {
  const resp = await fetchBackend
    .get("/categories/categories-options")
    .json<ApiResponse<CategoryOption[]>>();

  return resp.data;
});

const CategorySchema = v.object({
  categoryId: v.pipe(
    v.string(),
    v.nonEmpty("Please select the group category"),
  ),
  groupId: v.string(),
});
type CategoryForm = v.InferInput<typeof CategorySchema>;

export const useFormLoader = routeLoader$<InitialValues<CategoryForm>>(() => ({
  categoryId: "",
  groupId: "",
}));

export const useFormAction = formAction$<CategoryForm>(
  async (values, { redirect, cookie, error }) => {
    console.log(values);
    const accessToken = cookie.get(ACCESS_TOKEN_KEY);
    if (!accessToken?.value)
      throw error(401, "Unauthenticated, Please login again!");
    await fetchBackend
      .headers({
        Authorization: `Bearer ${accessToken.value}`,
      })
      .url(`/groups/${values.groupId}/category`)
      .patch({
        categoryId: values.categoryId,
      })
      .json<ApiResponse>();

    throw redirect(REDIRECT_STATUS_CODE, "/start-group/location");
  },
  valiForm$(CategorySchema),
);

export default component$(() => {
  const groupSig = useGetPendingGroup();
  const [, { Form, Field }] = useForm<CategoryForm>({
    loader: useFormLoader(),
    validate: valiForm$(CategorySchema),
    action: useFormAction(),
  });
  const categories = useGetCategories();

  return (
    <Form>
      <div class="grid grid-cols-1 gap-3">
        <Field name="categoryId">
          {(field, props) => (
            <div class="grid w-full items-center gap-1.5">
              <Label for={props.name}>Choose group category</Label>
              <select {...props} class="rounded-md border px-4 py-3">
                <option value={""}>Select</option>
                {categories.value?.map((c) => (
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
        <Field name="groupId">
          {(field, props) => (
            <div class="grid w-full items-center gap-1.5">
              <Label for={props.name}>Group</Label>
              <input type="hidden" name="groupId" value={groupSig.value.id} />
              <Input
                type="text"
                readOnly
                {...props}
                value={groupSig.value.name}
              />
            </div>
          )}
        </Field>
      </div>
      <div class="mt-4">
        <Button type="submit">Continue</Button>
      </div>
    </Form>
  );
});
