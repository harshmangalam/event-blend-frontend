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
  return (
    <Tabs.Root class="w-full">
      <Tabs.List class="w-full justify-start rounded-none px-4">
        {tabs.map((tab) => (
          <Tabs.Tab class="rounded-none" key={tab.slug}>
            {tab.name}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Panel key={tab.slug}>Panel {tab.name}</Tabs.Panel>
      ))}
    </Tabs.Root>
  );
});
