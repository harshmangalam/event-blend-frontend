import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Button } from "./ui/button/button";
import { LuSun, LuMoon } from "@qwikest/icons/lucide";

type Theme = "light" | "dark";
export const ThemeSwitcher = component$(() => {
  const themeSig = useSignal<Theme | null>(null);

  const applyLightMode = $(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    localStorage.setItem("theme", "light");
    themeSig.value = "light";
  });

  const applyDarkMode = $(() => {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    themeSig.value = "dark";
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    const theme = (localStorage.getItem("theme") ?? "dark") as Theme;
    themeSig.value = theme;
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async ({ track }) => {
    track(() => themeSig.value);
    if (themeSig.value === "dark") applyDarkMode();
    if (themeSig.value === "light") applyLightMode();
  });

  const handleToggleTheme = $(async () => {
    themeSig.value =
      themeSig.value === "dark"
        ? "light"
        : themeSig.value === "light"
          ? "dark"
          : null;
  });

  return (
    <div>
      <Button look={"ghost"} onClick$={handleToggleTheme}>
        {themeSig.value === "dark" && <LuSun class="h-5 w-5" />}
        {themeSig.value === "light" && <LuMoon class="h-5 w-5" />}
      </Button>
    </div>
  );
});
