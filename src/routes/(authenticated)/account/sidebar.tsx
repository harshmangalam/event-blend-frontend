import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const Sidebar = component$(() => {
  const menus = [
    {
      name: "Edit profile",
      href: "/",
    },
    {
      name: "Personal Info",
      href: "/",
    },
    {
      name: "Account Management",
      href: "/",
    },
    {
      name: "Email Updates",
      href: "/",
    },
    {
      name: "Privacy",
      href: "/",
    },
    {
      name: "Social Media",
      href: "/",
    },
    {
      name: "Interests",
      href: "/",
    },
    {
      name: "Help",
      href: "/",
    },
  ];
  return (
    <aside class="w-full flex-none overflow-y-auto bg-muted md:w-[250px]">
      <h2 class="mt-4 px-4 text-lg font-bold">Settings</h2>
      <ul class="my-2">
        {menus.map((menu, index) => (
          <li class="px-4 py-2" key={index}>
            <Link href={menu.href} class="text-sm opacity-80">
              {menu.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
});
