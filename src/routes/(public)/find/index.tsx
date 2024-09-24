import { component$ } from "@builder.io/qwik";
import { Tabs } from "./tabs";
import { Separator } from "~/components/ui";
import { routeLoader$ } from "@builder.io/qwik-city";
import { fetchBackend } from "~/lib/fetch-backend";
import type { ApiResponse, Group } from "~/lib/types";

export const useDiscoverGroups = routeLoader$(async (event) => {
  const source = event.query.get("source");
  console.log(source);
  const groups = await fetchBackend()
    .get("/groups/discover-groups")
    .fetchError((err) => console.log(err))
    .internalError((err) => console.log(err))
    .json<ApiResponse<{ groups: Group[] }>>();
  return groups.data?.groups;
});

export default component$(() => {
  return (
    <div class="container mx-auto px-4 py-4">
      <Tabs />
      <Separator class="my-6" />
    </div>
  );
});
