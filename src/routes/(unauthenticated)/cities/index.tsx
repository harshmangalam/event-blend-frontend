import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { Badge } from "~/components/ui/badge/badge";
import { Separator } from "~/components/ui/separator/separator";
import { fetchBackend } from "~/lib/fetch-backend";
import type { ApiResponse } from "~/lib/types";

export const useDiscoverLocations = routeLoader$(async () => {
  const resp = await fetchBackend
    .get("/locations/discover-cities")
    .json<ApiResponse<{ locations: { [country: string]: any[] } }>>();
  return resp.data?.locations;
});

export default component$(() => {
  const locationsSig = useDiscoverLocations();
  const countries = locationsSig.value ?? {};
  return (
    <div class="container mx-auto px-4">
      <h2 class="text-2xl font-bold">Popular cities</h2>
      <Separator class="mt-6" />
      <div class="mt-6 grid grid-cols-1 gap-6">
        {Object.keys(countries).map((country) => (
          <div key={country}>
            <div>
              <h3 class="text-xl font-bold">{country}</h3>
            </div>

            <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {countries[country].map((location) => (
                <div key={location.city} class="flex items-center gap-1">
                  <Link
                    class="text-primary hover:underline"
                    href={`/location/${location.city}`}
                  >
                    {location.city}
                  </Link>
                  <Badge look={"outline"}>
                    {location._count.groups}
                    <span class="ml-1 font-normal"> groups</span>
                  </Badge>
                </div>
              ))}
            </div>
            <Separator class="mt-6" />
          </div>
        ))}
      </div>
    </div>
  );
});
