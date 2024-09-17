import { component$ } from "@builder.io/qwik";
import { Field } from "@modular-forms/qwik";
import { Label } from "~/components/ui/label/label";
import { useGetPopularCategories } from "~/routes/(public)";

export const GroupCategory = component$(() => {
  const categories = useGetPopularCategories();
  return (
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
          {field.error && <p class="mt-1 text-sm text-alert">{field.error}</p>}
        </div>
      )}
    </Field>
  );
});
