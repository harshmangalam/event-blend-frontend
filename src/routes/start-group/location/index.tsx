import { component$ } from "@builder.io/qwik";

export const Location = component$(() => {
  return (
    <Form>
      <Field name="location">
        {(field, props) => (
          <div class="grid w-full max-w-sm items-center gap-1.5">
            <Label for={props.name}>Location</Label>
            <Input {...props} error={field.error} />
          </div>
        )}
      </Field>
    </Form>
  );
});
