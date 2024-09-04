import { component$ } from "@builder.io/qwik";
import { useGetPopularCities } from ".";
import { Link } from "@builder.io/qwik-city";
import { LocationCard } from "~/components/shared/location-card";
export const PopularCities = component$(() => {
  const popularCities = useGetPopularCities();
  return (
    <section>
      <div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <h2 class="text-xl font-semibold">Explore popular cities</h2>
        <Link class="text-primary hover:underline" href="/cities">
          See all cities
        </Link>
      </div>

      <div class="mt-8 flex flex-wrap gap-8 lg:justify-between">
        {popularCities.value?.map((location) => (
          <LocationCard location={location} key={location.id} />
        ))}
      </div>
    </section>
  );
});
