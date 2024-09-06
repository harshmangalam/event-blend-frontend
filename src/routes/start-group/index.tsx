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
});
type BasicInfoForm = v.InferInput<typeof BasicInfoSchema>;

export const useFormLoader = routeLoader$<InitialValues<BasicInfoForm>>(() => ({
  name: "",
  description: "",
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

export default component$(() => {
  const [, { Form, Field }] = useForm<BasicInfoForm>({
    loader: useFormLoader(),
    validate: valiForm$(BasicInfoSchema),
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
