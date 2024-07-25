import { component$ } from "@builder.io/qwik";
import { LuBuilding2 } from "@qwikest/icons/lucide";
import { Card } from "~/components/ui/card/card";
import { useGetPopularCities } from ".";
import { Badge } from "~/components/ui/badge/badge";
import { Link } from "@builder.io/qwik-city";
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

      <div class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {popularCities.value?.map(({ id, city, _count }) => (
          <Link key={id} href={`/cities/${id}`}>
            <Card.Root class="max-w-md">
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
