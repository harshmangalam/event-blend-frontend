import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { GroupCard } from "~/components/shared/group-card";
import { useGetPopularGroups } from ".";
import { Source } from "~/lib/constatnts";

export const PopularGroups = component$(() => {
  const popularGroups = useGetPopularGroups();
  return (
    <section>
      <div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <h2 class="text-xl font-semibold">Explore popular groups</h2>
        <Link
          class="text-primary hover:underline"
          href={`/find?source=${Source.Groups}`}
        >
          See all groups
        </Link>
      </div>
      <div class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
        {popularGroups.value?.map((group) => (
          <GroupCard group={group} key={group.id} />
        ))}
      </div>
    </section>
  );
});
