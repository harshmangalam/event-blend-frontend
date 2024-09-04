import { $, component$, useSignal } from "@builder.io/qwik";
import { routeLoader$, server$, useNavigate } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button/button";

import { Select } from "~/components/ui/select/select";
import { fetchBackend } from "~/lib/fetch-backend";
import type { ApiResponse, Category, Group } from "~/lib/types";
import { LuCheck } from "@qwikest/icons/lucide";

type CategoryOption = Pick<Category, "id" | "name">;
type PendingGroupType = Pick<Group, "id" | "name">;
export const useGetPendingGroup = routeLoader$(async ({ redirect }) => {
  const resp = await fetchBackend
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

export const updateCategory = server$(async function (
  groupId: string,
  categoryId: string,
) {
  await fetchBackend
    .url(`/groups/${groupId}/category`)
    .patch({
      categoryId,
    })
    .json();
});

export default component$(() => {
  const categoriesSig = useGetCategories();
  const groupSig = useGetPendingGroup();
  const selectedSig = useSignal<string>("");
  const nav = useNavigate();

  const handleSubmit = $(async () => {
    try {
      await updateCategory(groupSig.value.id, selectedSig.value);
      nav("/start-group/location");
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div>
      <Select.Root bind:value={selectedSig}>
        <Select.Label> Group category</Select.Label>
        <Select.Trigger name="category" class="h-12">
          <Select.DisplayValue placeholder="Select an option" />
        </Select.Trigger>
        <Select.Popover gutter={8} class="w-full">
          {categoriesSig.value?.map((category) => (
            <Select.Item key={category.id}>
              <Select.ItemLabel>{category.name}</Select.ItemLabel>
              <Select.ItemIndicator>
                <LuCheck class="h-4 w-4" />
              </Select.ItemIndicator>
            </Select.Item>
          ))}
        </Select.Popover>
      </Select.Root>
      <div class="mt-8">
        <Button class="px-12" onClick$={handleSubmit}>
          Next
        </Button>
      </div>
    </div>
  );
});
