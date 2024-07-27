import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { Card } from "~/components/ui/card/card";
import { fetchBackend } from "~/lib/fetch-backend";
import type { ApiResponse } from "~/lib/types";

export const useDiscoverLocations = routeLoader$(async () => {
  const resp = await fetchBackend
    .get("/locations/discover-cities")
    .json<ApiResponse<{ locations: { [country: string]: string[] } }>>();
  return resp.data?.locations;
});

export default component$(() => {
  const locationsSig = useDiscoverLocations();
  const countries = locationsSig.value ?? {};
  return (
    <div class="container mx-auto  px-4 py-12">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {Object.keys(countries).map((country) => (
          <Card.Root key={country} class="w-full bg-muted shadow-none">
            <Card.Header>
              <Card.Title class="font-semibold">{country}</Card.Title>
            </Card.Header>
            <Card.Content class="flex flex-col gap-2">
              {countries[country].map((city) => (
                <Link class={"hover:underline"} key={city} href="">
                  {city}
                </Link>
              ))}
            </Card.Content>
          </Card.Root>
        ))}
      </div>
    </div>
  );
});
