import { component$ } from "@builder.io/qwik";
import { Form, Link } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button/button";
import { Card } from "~/components/ui/card/card";
import { Checkbox } from "~/components/ui/checkbox/checkbox";
import { Input } from "~/components/ui/input/input";
import { Label } from "~/components/ui/label/label";

export default component$(() => {
  return (
    <Card.Root class="mx-auto max-w-md">
      <Card.Header>
        <Card.Title class="text-2xl font-bold">Finish signing up</Card.Title>
      </Card.Header>
      <Card.Content>
        <Form class="grid grid-cols-1 gap-4">
          <div class="flex flex-col gap-1">
            <Label for="name">Your name</Label>
            <Input required type="text" id="name" name="name" />
          </div>
          <div class="flex flex-col gap-1">
            <Label for="email">Email address</Label>
            <Input required type="email" id="email" name="email" />
          </div>
          <div class="flex flex-col gap-1">
            <Label for="password">Password</Label>
            <Input required type="password" id="password" name="password" />
          </div>
          <div class="flex flex-col gap-1">
            <Label for="age">Age</Label>
            <div class="flex items-center space-x-2">
              <Checkbox id="age" />
              <Label
                for="age"
                class="text-sm font-normal text-muted-foreground"
              >
                I am 18 years of age or older.
              </Label>
            </div>
          </div>
          <Button type="submit" class="w-full">
            Sign up
          </Button>
        </Form>
      </Card.Content>
      <Card.Footer>
        <div class="grid grid-cols-1 gap-4">
          <p class="text-center text-muted-foreground">
            By signing up, you agree to{" "}
            <a class="text-sm text-primary" href="#">
              Terms of Service,{" "}
            </a>
            <a class="text-sm text-primary" href="#">
              Privacy Policy,{" "}
            </a>
            and{" "}
            <a class="text-sm text-primary" href="#">
              Cookie Policy
            </a>
            .
          </p>
          <p class="text-center">
            Already a member?{" "}
            <Link href="/login" class="text-primary">
              Log in
            </Link>
          </p>
        </div>
      </Card.Footer>
    </Card.Root>
  );
});
