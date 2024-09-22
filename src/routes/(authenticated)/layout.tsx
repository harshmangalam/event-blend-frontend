import { component$, Slot } from "@builder.io/qwik";
import { type RequestHandler } from "@builder.io/qwik-city";
import { Footer } from "~/components/footer";
import { Navbar } from "~/components/navigations/navbar";
import { REDIRECT_STATUS_CODE } from "~/lib/constatnts";

export const onRequest: RequestHandler = async (event) => {
  const user = event.sharedMap.get("user");
  if (!user) throw event.redirect(REDIRECT_STATUS_CODE, `/login`);
};

export default component$(() => {
  return (
    <div class="flex min-h-screen flex-col bg-muted">
      <Navbar />
      <main class="grid flex-1 place-items-center py-12">
        <Slot />
      </main>
      <Footer />
    </div>
  );
});
