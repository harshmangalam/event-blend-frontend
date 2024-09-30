import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Avatar, Popover, Separator } from "~/components/ui";
import { LogoutForm } from "./logout-form";
import { useSession } from "~/routes/plugin@auth";

export const AccountsPopover = component$(() => {
  const sessionSig = useSession();
  const links = [
    {
      name: "Your events",
      href: "/your-events",
    },
    {
      name: "Your groups",
      href: "/your-groups",
      divider: true,
    },
    {
      name: "create-group",
      href: "/create-group",
    },
    {
      name: "create-event",
      href: "/create-event",
      divider: true,
    },
    {
      name: "View profile",
      href: `/members/${sessionSig.value.user?.id}`,
    },
    {
      name: "Settings",
      href: `/account`,
    },
  ];
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Avatar.Root class="h-10 w-10">
          <Avatar.Image
            src={sessionSig.value.user?.profilePhoto ?? ""}
            alt={sessionSig.value.user?.name}
          />
          <Avatar.Fallback>{sessionSig.value.user?.name}</Avatar.Fallback>
        </Avatar.Root>
      </Popover.Trigger>
      <Popover.Panel class="mt-4 w-48">
        <div class="flex flex-col gap-2">
          {links.map((link) => (
            <div key={link.name} class="flex flex-col gap-2">
              <Link
                class="text-sm opacity-80 hover:text-primary hover:opacity-100"
                href={link.href}
              >
                {link.name}
              </Link>

              {link.divider && <Separator />}
            </div>
          ))}

          <LogoutForm />
        </div>
      </Popover.Panel>
    </Popover.Root>
  );
});
