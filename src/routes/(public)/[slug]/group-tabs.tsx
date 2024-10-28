import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { NavLink } from "~/components/nav-link";

export const GroupTabs = component$(() => {
  const groupDetailsTabs = [
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
  ];
  const location = useLocation();
  return (
    <div class="bg-background">
      <div class="container mx-auto flex h-16 max-w-5xl flex-wrap items-center gap-8 px-4">
        {groupDetailsTabs.map((tab) => {
          const href =
            tab.slug === ""
              ? `/${location.params.slug}/`
              : `/${location.params.slug}/${tab.slug}/`;
          return (
            <NavLink key={tab.slug} href={href} activeClass="text-primary">
              {tab.name}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
});
