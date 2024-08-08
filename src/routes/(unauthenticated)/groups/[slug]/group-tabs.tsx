import { component$ } from "@builder.io/qwik";
import { NavLink } from "~/components/nav-link";

export const GroupTabs = component$(() => {
  const tabs = [
    {
      name: "About",
      slug: "",
    },
    {
      name: "Events",
      slug: "events",
    },
    {
      name: "Members",
      slug: "members",
    },
    {
      name: "Photos",
      slug: "photos",
    },
    {
      name: "Discussions",
      slug: "discussions",
    },
  ];
  return (
    <div class="bg-background">
      <div class="container mx-auto flex h-16 max-w-5xl flex-wrap items-center gap-4 px-4">
        {tabs.map((tab) => (
          <NavLink key={tab.slug} href={tab.slug} activeClass="text-primary">
            {tab.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
});
