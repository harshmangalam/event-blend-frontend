import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { PopularCities } from "./popular-cities";
import { fetchBackend } from "~/lib/fetch-backend";
import { type Group, type ApiResponse, type Location } from "~/lib/types";
import { PopularGroups } from "./popular-groups";

export const useGetPopularCities = routeLoader$(async () => {
  const locations = await fetchBackend
    .get("/locations/popular-cities")
    .fetchError((err) => console.log(err))
    .internalError((err) => console.log(err))
    .json<
      ApiResponse<{ locations: Pick<Location, "id" | "city" | "_count">[] }>
    >();

  return locations.data?.locations;
});
export const useGetPopularGroups = routeLoader$(async () => {
  const locations = await fetchBackend
    .get("/groups/popular-groups")
    .fetchError((err) => console.log(err))
    .internalError((err) => console.log(err))
    .json<ApiResponse<{ groups: Group[] }>>();

  return locations.data?.groups;
});
export default component$(() => {
  return (
    <div class="container mx-auto grid grid-cols-1 gap-16 px-4 py-12">
      <PopularCities />
      <PopularGroups />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
