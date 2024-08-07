import { component$ } from "@builder.io/qwik";
import { Tabs } from "~/components/ui/tabs/tabs";

export const GroupTabs = component$(() => {
  const tabs = [
    {
      name: "About",
      slug: "about",
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
  return <div class="bg-background"></div>;
});
