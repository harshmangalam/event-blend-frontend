import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { PopularCities } from "./popular-cities";
import { fetchBackend, fetchPublicAPI } from "~/lib/fetch-backend";
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
import EventblendWorks from './eventblend-works';

export const useGetPopularCities = routeLoader$(async (event) => {
  const locations = await fetchPublicAPI()
    .get("/locations/popular-cities")
    .fetchError((err) => {
      throw event.error(500, err.message);
    })
    .internalError((err) => {
      throw event.error(500, err.message);
    })
    .json<
      ApiResponse<{ locations: Pick<Location, "id" | "city" | "_count">[] }>
    >();

  return locations.data?.locations ?? [];
});
export const useGetPopularGroups = routeLoader$(async (event) => {
  const resp = await fetchPublicAPI()
    .get("/groups/popular-groups")
    .fetchError((err) => {
      throw event.error(500, err.message);
    })
    .internalError((err) => {
      throw event.error(500, err.message);
    })
    .json<ApiResponse<{ groups: Group[] }>>();
  return resp.data?.groups ?? [];
});
export const useGetPopularCategories = routeLoader$(async (event) => {
  const resp = await fetchPublicAPI()
    .get("/categories/popular-categories")
    .fetchError((err) => {
      throw event.error(500, err.message);
    })
    .internalError((err) => {
      throw event.error(500, err.message);
    })
    .json<ApiResponse<{ categories: PopularCategory[] }>>();

  return resp.data?.categories ?? [];
});
export const useGetPopularEvents = routeLoader$(async (event) => {
  const resp = await fetchBackend(event)
    .get("/events/popular-events")
    .fetchError((err) => {
      throw event.error(500, err.message);
    })
    .internalError((err) => {
      throw event.error(500, err.message);
    })
    .json<ApiResponse<{ events: Event[] }>>();

  return resp.data?.events ?? [];
});
export default component$(() => {
  return (
    <div class="container mx-auto grid w-full grid-cols-1 gap-16 px-4 py-12">
      <Hero />
      <PopularEvents />
      <PopularCategories />
      <PopularCities />
      <PopularGroups />
      <EventblendWorks />
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
