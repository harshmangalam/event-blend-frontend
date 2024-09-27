import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { PopularCities } from "./popular-cities";
import { fetchBackend } from "~/lib/fetch-backend";
import type {
  Group,
  ApiResponse,
  Location,
  PopularCategory,
  Event,
} from "~/lib/types";
import { PopularGroups } from "./popular-groups";
import { PopularCategories } from "./popular-categories";
import { PopularEvents } from "./popular-events";
import { Hero } from "./hero";

export const useGetPopularCities = routeLoader$(async () => {
  const locations = await fetchBackend()
    .get("/locations/popular-cities")
    .fetchError((err) => console.log(err))
    .internalError((err) => console.log(err))
    .json<
      ApiResponse<{ locations: Pick<Location, "id" | "city" | "_count">[] }>
    >();

  return locations.data?.locations ?? [];
});
export const useGetPopularGroups = routeLoader$(async () => {
  const resp = await fetchBackend()
    .get("/groups/popular-groups")
    .fetchError((err) => console.log(err))
    .internalError((err) => console.log(err))
    .json<ApiResponse<{ groups: Group[] }>>();
  return resp.data?.groups ?? [];
});
export const useGetPopularCategories = routeLoader$(async () => {
  const resp = await fetchBackend()
    .get("/categories/popular-categories")
    .fetchError((err) => console.log(err))
    .internalError((err) => console.log(err))
    .json<ApiResponse<{ categories: PopularCategory[] }>>();

  return resp.data?.categories ?? [];
});
export const useGetPopularEvents = routeLoader$(async (event) => {
  const resp = await fetchBackend(event)
    .get("/events/popular-events")
    .fetchError((err) => console.log(err))
    .internalError((err) => console.log(err))
    .json<ApiResponse<{ events: Event[] }>>();

  return resp.data?.events;
});
export default component$(() => {
  return (
    <div class="container mx-auto grid w-full grid-cols-1 gap-16 px-4 py-12">
      <Hero />
      <PopularEvents />
      <PopularCategories />
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
