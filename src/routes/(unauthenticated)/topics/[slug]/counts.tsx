import { component$ } from "@builder.io/qwik";

export const Counts = component$(
  ({ label, count }: { label: string; count: number }) => {
    return (
      <div class="flex flex-col gap-1">
        <div class="font-semibold">{count}</div>
        <div>{label}</div>
      </div>
    );
  },
);
