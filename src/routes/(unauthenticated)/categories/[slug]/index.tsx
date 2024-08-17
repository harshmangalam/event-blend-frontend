import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { cn } from "@qwik-ui/utils";
import { buttonVariants } from "~/components/ui/button/button";
import { fetchBackend } from "~/lib/fetch-backend";
import type { ApiResponse, Category, Topic } from "~/lib/types";
import { TrendingTopics } from "./trending-topics";
import { Topics } from "./topics";
import { Separator } from "~/components/ui/separator/separator";

export const useGetCategoryBySlug = routeLoader$(async ({ params }) => {
  const resp = await fetchBackend
    .get(`/categories/${params.slug}`)
    .json<ApiResponse<{ category: Category }>>();
  return resp.data?.category;
});

export const useGetCategoryTrendingTopics = routeLoader$(async ({ params }) => {
  const resp = await fetchBackend
    .get(`/categories/${params.slug}/trending-topics`)
    .json<ApiResponse<{ topics: Topic[] }>>();
  return resp.data?.topics;
});

export const useGetCategoryTopics = routeLoader$(async ({ params }) => {
  const resp = await fetchBackend
    .get(`/categories/${params.slug}/topics`)
    .json<ApiResponse<{ topics: Topic[] }>>();
  return resp.data?.topics;
});
export default component$(() => {
  const categorySig = useGetCategoryBySlug();
  return (
    <div>
      <div class="bg-muted px-4 py-12">
        <div class="mx-auto w-full max-w-2xl text-center">
          <h2 class="mb-6 text-3xl font-extrabold">
            {categorySig.value?.name}
          </h2>
          <p class="mb-6 text-lg text-muted-foreground">
            {categorySig.value?.description}
          </p>
          <Link
            class={cn(buttonVariants({ look: "primary" }), "px-12")}
            href={``}
          >
            Join Groups
          </Link>

          <TrendingTopics />
        </div>
      </div>
      <Separator class="mb-6" />

      <div class="mx-auto max-w-4xl px-4">
        <Topics name={categorySig.value?.name} />
      </div>
    </div>
  );
});
