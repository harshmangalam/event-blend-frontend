import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, zod$ } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button/button";
import { Card } from "~/components/ui/card/card";
import { Checkbox } from "~/components/ui/checkbox/checkbox";
import { Input } from "~/components/ui/input/input";
import { Label } from "~/components/ui/label/label";
import { fetchBackend } from "~/lib/fetch-backend";

export const useSignup = routeAction$(
  async (values, requestEv) => {
    const resp = await fetchBackend
      .url("/auth/signup")
      .post({ ...values, isAdult: true })
      .badRequest((err) => {
        console.log(JSON.stringify(err.json));
      })
      .fetchError((err) => console.log("Fetch Err:::", err.message))
      .json();
    console.log(resp);
  },
  zod$((z) => ({
    name: z
      .string()
      .min(1, "Name is required")
      .max(32, "Name has to be less than 32 characters"),
    email: z
      .string({
        message: "Email is required",
      })
      .email({
        message: "Email has invalid format",
      }),
    password: z.string().min(6, "Password has to be at least 6 characters"),
    age: z.literal("on", {
      message: "You need to be 18 or older to continue",
    }),
  })),
);
export default component$(() => {
  const action = useSignup();
  return (
    <Card.Root class="mx-auto max-w-md">
      <Card.Header>
        <Card.Title class="text-2xl font-bold">Finish signing up</Card.Title>
      </Card.Header>
      <Card.Content>
        <Form action={action} class="grid grid-cols-1 gap-4">
          <div class="flex flex-col gap-1">
            <Label for="name">Your name</Label>
            <Input type="text" id="name" name="name" />
            <span class="text-sm text-alert">
              {action.value?.fieldErrors?.name}
            </span>
          </div>
          <div class="flex flex-col gap-1">
            <Label for="email">Email address</Label>
            <Input type="email" id="email" name="email" />
            <span class="text-sm text-alert">
              {action.value?.fieldErrors?.email}
            </span>
          </div>
          <div class="flex flex-col gap-1">
            <Label for="password">Password</Label>
            <Input type="password" id="password" name="password" />
            <span class="text-sm text-alert">
              {action.value?.fieldErrors?.password}
            </span>
          </div>
          <div class="flex flex-col gap-1">
            <Label for="age">Age</Label>
            <div class="flex items-center space-x-2">
              <Checkbox name="age" id="age" />
              <Label
                for="age"
                class="text-sm font-normal text-muted-foreground"
              >
                I am 18 years of age or older.
              </Label>
            </div>
            <span class="text-sm text-alert">
              {action.value?.fieldErrors?.age}
            </span>
          </div>
          <Button disabled={action.isRunning} type="submit" class="w-full">
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
