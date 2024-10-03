import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const Sidebar = component$(() => {
  const menus = [
    {
      name: "Edit profile",
      href: "/",
    },
  ];
  return (
    <aside class="w-full flex-none overflow-y-auto bg-muted md:w-[250px]">
      <h2 class="mt-4 px-4 text-lg font-bold">Settings</h2>
      <ul class="my-2">
        {[...new Array(20)].map((_) => (
          <li class="px-4 py-2">
            <Link href="" class="text-sm opacity-80">
              Edit Profile
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
});
