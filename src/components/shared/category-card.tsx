import { component$ } from "@builder.io/qwik";
import { Card } from "~/components/ui/card/card";
import { Badge } from "~/components/ui/badge/badge";
import { Link } from "@builder.io/qwik-city";
import type { PopularCategory } from "~/lib/types";
import { getCategoriesIcon } from "~/lib/data";

export const CategoryCard = component$(
  ({ category }: { category: PopularCategory }) => {
    const { _count, name, slug } = category;
    const CategoryIcon = getCategoriesIcon(slug);
    return (
      <Card.Root class="w-full max-w-xs border-none bg-muted shadow-none">
        <Link href={`/categories/${slug}`} class="block h-full">
          <Card.Content class="flex flex-col items-center gap-2 p-6">
            <CategoryIcon class="h-6 w-6" />
            <h3 class="text-center font-semibold">{name}</h3>
            <Badge look={"primary"}>{_count.groups} Groups</Badge>
          </Card.Content>
        </Link>
      </Card.Root>
    );
  },
);
