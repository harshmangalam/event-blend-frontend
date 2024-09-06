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

const LocationSchema = v.object({
  name: v.pipe(
    v.string(),
    v.maxLength(50),
    v.nonEmpty("Please enter your group name."),
  ),
  description: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your group description."),
  ),
});
type LocationForm = v.InferInput<typeof LocationSchema>;

export const useFormLoader = routeLoader$<InitialValues<LocationForm>>(() => ({
  name: "",
  description: "",
}));

export const useFormAction = formAction$<LocationForm>(
  async (values, { redirect }) => {
    await fetchBackend.url("/groups/").post(values).json();
    throw redirect(REDIRECT_STATUS_CODE, "/start-group/category");
  },
  valiForm$(LocationSchema),
);

export default component$(() => {
  const [, { Form, Field }] = useForm<LocationForm>({
    loader: useFormLoader(),
    validate: valiForm$(LocationSchema),
    action: useFormAction(),
  });
  return (
    <Form>
      <div class="grid grid-cols-1 gap-3">
        <Field name="name">
          {(field, props) => (
            <div class="grid w-full items-center gap-1.5">
              <Label for={props.name}>Name</Label>
              <Input {...props} error={field.error} />
            </div>
          )}
        </Field>
        <Field name="description">
          {(field, props) => (
            <div class="grid w-full items-center gap-1.5">
              <Label for={props.name}>Description</Label>
              <Textarea rows={10} {...props} error={field.error} />
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
