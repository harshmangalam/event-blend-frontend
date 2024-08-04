import { component$ } from "@builder.io/qwik";
import { LuBuilding2 } from "@qwikest/icons/lucide";
import { Card } from "~/components/ui/card/card";
import { Badge } from "~/components/ui/badge/badge";
import { Link } from "@builder.io/qwik-city";
import { type Location } from "~/lib/types";
export const LocationCard = component$(
  ({ location }: { location: Pick<Location, "id" | "city" | "_count"> }) => {
    const { id, city, _count } = location;
    return (
      <Link href={`/cities/${id}`}>
        <Card.Root class="border-none shadow-none">
          <Card.Content class="flex flex-col items-center gap-3 p-0">
            <div class="grid h-36 w-36 place-items-center rounded-full bg-muted">
              <LuBuilding2 class="h-16 w-16 text-muted-foreground" />
            </div>
            <h3 class="font-medium">{city}</h3>
            <Badge look={"outline"}>{_count.groups} Groups</Badge>
          </Card.Content>
        </Card.Root>
      </Link>
    );
  },
);
