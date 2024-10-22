import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { useGetPopularCategories } from ".";
import { CategoryCard } from "~/components/shared/category-card";

export const PopularCategories = component$(() => {
  const categoriesSig = useGetPopularCategories();
  return (
    <section>
      <div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <h2 class="text-xl font-semibold">Explore popular categories</h2>
        <Link class="text-primary hover:underline" href="/topics">
          See all categories
        </Link>
      </div>

      <div class="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        {categoriesSig.value.map((category) => (
          <CategoryCard category={category} key={category.id} />
        ))}
      </div>
    </section>
  );
});
