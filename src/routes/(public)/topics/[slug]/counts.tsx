import { component$ } from "@builder.io/qwik";

export const Counts = component$(
  ({ label, count }: { label: string; count: number }) => {
    return (
      <div class="flex w-full flex-col gap-1 rounded-md bg-muted px-6 py-4">
        <div class="font-semibold">{count}</div>
        <div>{label}</div>
      </div>
    );
  },
);
