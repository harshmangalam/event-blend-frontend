import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { SOURCE_TABS } from "~/lib/constatnts";

export const Tabs = component$(() => {
  const loc = useLocation();
  const source = loc.url.searchParams.get("source");

  return (
    <div class="flex items-center gap-4">
      {SOURCE_TABS.map(({ name, slug }) => (
        <Link
          href={`/find/?source=${slug}`}
          key={slug}
          class={`
            "font-medium block", h-7
            ${source === slug ? " border-b-2 border-primary text-primary" : "opacity-60"}
          `}
        >
          {name}
        </Link>
      ))}
    </div>
  );
});
