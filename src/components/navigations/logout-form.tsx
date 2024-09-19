import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useLogout } from "~/routes/plugin@auth";

export const LogoutForm = component$(() => {
  const logout = useLogout();
  return (
    <Form action={logout}>
      <button
        class="text-sm opacity-80 hover:text-primary hover:opacity-100"
        disabled={logout.isRunning}
        type="submit"
      >
        Log out
      </button>
    </Form>
  );
});
