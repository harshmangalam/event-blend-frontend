import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, zod$ } from "@builder.io/qwik-city";
import { Alert } from "~/components/ui/alert/alert";
import { Button } from "~/components/ui/button/button";
import { Card } from "~/components/ui/card/card";
import { Input } from "~/components/ui/input/input";
import { Label } from "~/components/ui/label/label";
import { fetchBackend, fetchPublicAPI } from "~/lib/fetch-backend";
import { type ApiResponse } from "~/lib/types";
import { LuAlertTriangle } from "@qwikest/icons/lucide";
import {
  ACCESS_TOKEN_EXP,
  REDIRECT_STATUS_CODE,
  REFRESH_TOKEN_EXP,
} from "~/lib/constatnts";

export const useLogin = routeAction$(
  async (values, { fail, redirect, cookie }) => {
    const resp = await fetchPublicAPI()
      .url("/auth/login")
      .post({ ...values, isAdult: true })
      .badRequest((err) => fail(err.status, err.json))
      .internalError((err) => fail(err.status, err.json))
      .fetchError((err) => fail(500, err.json))
      .json<ApiResponse<any>>();

    if (!resp.success) {
      return { error: resp };
    }
    if (resp.data) {
      cookie.set("accessToken", resp.data.accessToken, {
        httpOnly: true,
        path: "/",
        maxAge: ACCESS_TOKEN_EXP,
      });
      cookie.set("refreshToken", resp.data.refreshToken, {
        httpOnly: true,
        path: "/",
        maxAge: REFRESH_TOKEN_EXP,
      });
    }
    throw redirect(REDIRECT_STATUS_CODE, "/");
  },
  zod$((z) => ({
    email: z.string({ required_error: "Email is required" }).email({
      message: "Email has invalid format",
    }),
    password: z.string().min(6, "Password has to be at least 6 characters"),
  })),
);

export default component$(() => {
  const action = useLogin();
  return (
    <Card.Root class="mx-auto w-full max-w-md">
      <Card.Header>
        <Card.Title class="text-2xl font-bold">Log in</Card.Title>
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

          <Button disabled={action.isRunning} type="submit" class="w-full">
            Log in
          </Button>
        </Form>
      </Card.Content>
      <Card.Footer>
        <div class="w-full space-y-2 text-center">
          <p>
            Not a member yet?{" "}
            <Link href="/signup" class="text-primary">
              Sign up
            </Link>
          </p>
          <p>
            Forgot your password?{" "}
            <Link href="/reset-password" class="text-primary">
              Reset password
            </Link>
          </p>
        </div>
      </Card.Footer>
    </Card.Root>
  );
});
