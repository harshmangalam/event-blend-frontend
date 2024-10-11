import { component$ } from "@builder.io/qwik";
import { _Count, User } from "~/lib/types";

export const UserStat = component$(
  ({ count = 0, label }: { count?: number; label: string }) => {
    return (
      <div class="flex flex-col items-center">
        <span class="text-2xl font-bold">{count}</span>
        <span class="text-center text-sm opacity-70">{label}</span>
      </div>
    );
  },
);

export type UserStatsProps = Pick<User, "_count">;
export const UserStats = component$(({ _count }: UserStatsProps) => {
  return (
    <div class="mt-8 grid grid-cols-3 gap-4 divide-x">
      <UserStat label="Groups" count={_count?.members} />

      <UserStat
        label="Interests
"
        count={_count?.followingTopics}
      />
      <UserStat label="RSVPs" count={_count?.events} />
    </div>
  );
});
