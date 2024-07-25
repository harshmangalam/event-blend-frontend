import { component$ } from "@builder.io/qwik";
import { SITE_NAME } from "~/lib/constatnts";
import { LuBuilding2 } from "@qwikest/icons/lucide";
import { Card } from "~/components/ui/card/card";
import { useGetPopularCities } from ".";
import { Badge } from "~/components/ui/badge/badge";
import { Link } from "@builder.io/qwik-city";
export const PopularCities = component$(() => {
  const popularCities = useGetPopularCities();
  return (
    <section>
      <h2 class="text-xl font-semibold">Popular cities on {SITE_NAME}</h2>
      <p class="text-muted-foreground">
        Looking for fun things to do near you? See what {SITE_NAME} organizers
        are planning in cities around the country.
      </p>

      <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 xl:grid-cols-5">
        {popularCities.value?.map(({ id, city, _count }) => (
          <Link key={id} href={`/cities/${id}`}>
            <Card.Root>
              <Card.Content class="m-0 flex flex-col items-center gap-3 p-4">
                <div class="grid h-36 w-36 place-items-center rounded-full bg-muted">
                  <LuBuilding2 class="h-16 w-16 text-muted-foreground" />
                </div>
                <h3 class="font-medium">{city}</h3>
                <Badge look={"outline"}>{_count.groups} Groups</Badge>
              </Card.Content>
            </Card.Root>
          </Link>
        ))}
      </div>
    </section>
  );
});
