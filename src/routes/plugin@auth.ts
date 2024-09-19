import { Auth$ } from "~/lib/auth";

export const { onRequest, useSession } = Auth$(() => {});
