import { component$ } from "@builder.io/qwik";
import { NavLink } from "~/components/nav-link";
import { GROUP_DETAILS_TABS } from "~/lib/constatnts";

export const GroupTabs = component$(() => {
  return (
    <div class="bg-background">
      <div class="container mx-auto flex h-16 max-w-5xl flex-wrap items-center gap-4 px-4">
        {GROUP_DETAILS_TABS.map((tab) => (
          <NavLink key={tab.slug} href={tab.slug} activeClass="text-primary">
            {tab.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
});
