import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, zod$ } from "@builder.io/qwik-city";
import { Alert } from "~/components/ui/alert/alert";
import { Button } from "~/components/ui/button/button";
import { Card } from "~/components/ui/card/card";
import { Checkbox } from "~/components/ui/checkbox/checkbox";
import { Input } from "~/components/ui/input/input";
import { Label } from "~/components/ui/label/label";
import { fetchBackend, fetchPublicAPI } from "~/lib/fetch-backend";
import { type ApiResponse } from "~/lib/types";
import { LuAlertTriangle } from "@qwikest/icons/lucide";

export const useSignup = routeAction$(
  async (values, { redirect, fail }) => {
    const resp: any = await fetchPublicAPI()
      .url("/auth/signup")
      .post({ ...values, isAdult: true })
      .badRequest((err) => fail(err.status, err.json))
      .internalError((err) => fail(err.status, err.json))
      .fetchError((err) => fail(500, err.json))
      .json<ApiResponse>();

    if (!resp.success) {
      return { error: resp };
    }
    throw redirect(302, "/login");
  },
  zod$((z) => ({
    name: z
      .string()
      .min(1, "Name is required")
      .max(32, "Name has to be less than 32 characters"),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Email has an invalid format" }),
    password: z.string().min(6, "Password has to be at least 6 characters"),
    age: z.literal("on", {
      errorMap: () => ({ message: "You need to be 18 or older to continue" }),
    }),
  })),
);
export default component$(() => {
  const action = useSignup();
  return (
    <Card.Root class="mx-auto w-full max-w-md">
      <Card.Header>
        <Card.Title class="text-2xl font-bold">Finish signing up</Card.Title>
      </Card.Header>
      <Card.Content>
        {action.value?.error && (
          <Alert.Root look="alert" class="mb-3 rounded-sm">
            <LuAlertTriangle class="h-4 w-4" />
            <Alert.Title>Error</Alert.Title>
            <Alert.Description>{action.value.error.message}</Alert.Description>
          </Alert.Root>
        )}
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
            <a class="text-sm text-primary hover:underline" href="#">
              Terms of Service,{" "}
            </a>
            <a class="text-sm text-primary hover:underline" href="#">
              Privacy Policy,{" "}
            </a>
            and{" "}
            <a class="text-sm text-primary hover:underline" href="#">
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
