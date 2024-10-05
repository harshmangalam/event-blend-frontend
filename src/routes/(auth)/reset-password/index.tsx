import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { Button, Card, Input, Label } from "~/components/ui";

export default component$(() => {
  return (
    <Card.Root class="mx-auto w-full max-w-md">
      <Card.Header>
        <Card.Title class="text-2xl font-bold">Forgot password?</Card.Title>
        <Card.Description>
          No worries! Enter the email associated with your account. We'll send
          you a secure link to reset your password.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <Form>
          <div class="flex flex-col gap-1">
            <Label for="name">Email address</Label>
            <Input required type="email" id="email" name="email" />
            <span class="text-sm text-alert"></span>
          </div>

          <div class="mt-4">
            <Button class="w-full" type="submit">
              Send reset link
            </Button>
          </div>
        </Form>
      </Card.Content>
    </Card.Root>
  );
});
