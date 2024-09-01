import { component$ } from "@builder.io/qwik";
import { Progress } from "~/components/ui/progress/progress";
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

const GroupSchema = v.object({
  location: v.pipe(v.string(), v.nonEmpty("Please enter your group location.")),
  name: v.pipe(
    v.string(),
    v.maxLength(50),
    v.nonEmpty("Please enter your group name."),
  ),
  description: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your group description."),
    v.minLength(50, "Please write at least 50 characters"),
  ),
  topics: v.array(v.string()),
});

type GroupForm = v.InferInput<typeof GroupSchema>;

export const useFormLoader = routeLoader$<InitialValues<GroupForm>>(() => ({
  location: "",
  name: "",
  description: "",
  topics: [],
}));

export const useFormAction = formAction$<GroupForm>((values) => {
  // Runs on server
  console.log(values);
}, valiForm$(GroupSchema));

export default component$(() => {
  const [, { Form, Field }] = useForm<GroupForm>({
    loader: useFormLoader(),
    validate: valiForm$(GroupSchema),
    action: useFormAction(),
  });
  return (
    <div>
      <Progress value={30} class="rounded-none" />
      <div class="container mx-auto w-full px-4  py-12">
        <Form>
          <Field name="location">
            {(field, props) => (
              <div class="grid w-full max-w-sm items-center gap-1.5">
                <Label for={props.name}>Location</Label>
                <Input {...props} error={field.error} />
              </div>
            )}
          </Field>

          <Field name="name">
            {(field, props) => (
              <div class="grid w-full max-w-sm items-center gap-1.5">
                <Label for={props.name}>Name</Label>
                <Input {...props} error={field.error} />
              </div>
            )}
          </Field>
          <Field name="description">
            {(field, props) => (
              <div class="grid w-full max-w-sm items-center gap-1.5">
                <Label for={props.name}>Description</Label>
                <Textarea {...props} error={field.error} />
              </div>
            )}
          </Field>
          <div class="mt-4">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
});
