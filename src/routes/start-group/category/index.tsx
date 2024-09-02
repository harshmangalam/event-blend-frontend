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
import { LuSearch } from "@qwikest/icons/lucide";

const CategorySchema = v.object({
  category: v.pipe(
    v.string(),
    v.nonEmpty("Please select your group category."),
  ),
});

type LocationForm = v.InferInput<typeof CategorySchema>;

export const useFormLoader = routeLoader$<InitialValues<LocationForm>>(() => ({
  category: "",
}));

export const useFormAction = formAction$<LocationForm>((values) => {
  // Runs on server
  console.log(values);
}, valiForm$(CategorySchema));

export default component$(() => {
  const [, { Form, Field }] = useForm<LocationForm>({
    loader: useFormLoader(),
    validate: valiForm$(CategorySchema),
    action: useFormAction(),
  });
  return (
    <Form>
      <Field name="category">
        {(field, props) => (
          <div class="grid w-full items-center gap-3">
            <Label class="text-lg font-bold" for={props.name}>
              Group category
            </Label>
            <div class="relative">
              <Input
                {...props}
                error={field.error}
                class="w-full pl-12 text-base"
                placeholder="Search categories"
              />
              <div class="absolute left-4 top-1/2 -translate-y-1/2">
                <LuSearch class="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        )}
      </Field>
      <div class="mt-8">
        <Button class="px-12" type="submit">
          Next
        </Button>
      </div>
    </Form>
  );
});
