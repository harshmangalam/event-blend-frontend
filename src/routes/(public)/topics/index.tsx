import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { Separator } from "~/components/ui/separator/separator";
import { fetchBackend } from "~/lib/fetch-backend";
import type { ApiResponse, DiscoverCategory } from "~/lib/types";

export const useFetchCategories = routeLoader$(async () => {
  const resp = await fetchBackend()
    .get("/categories/discover-categories")
    .json<ApiResponse<{ categories: DiscoverCategory[] }>>();
  return resp.data?.categories;
});

export default component$(() => {
  const categoriesSig = useFetchCategories();
  return (
    <div class="container mx-auto px-4">
      <h2 class="text-2xl font-bold">Discover topics</h2>
      <Separator class="mt-6" />
      <div class="mt-6 grid grid-cols-1 gap-6">
        {categoriesSig.value?.map((category) => (
          <div key={category.id}>
            <h3 class="text-xl font-bold">{category.name}</h3>
            <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {category.topics.map((topic) => (
                <Link
                  class="text-primary hover:underline"
                  key={topic.id}
                  href={`/topics/${topic.slug}`}
                >
                  {topic.name}
                </Link>
              ))}
            </div>
            <Separator class="mt-6" />
          </div>
        ))}
      </div>
    </div>
  );
});
