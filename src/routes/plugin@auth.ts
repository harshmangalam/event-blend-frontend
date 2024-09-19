import { Auth$ } from "~/lib/auth";

export const { onRequest, useUser } = Auth$(() => {});
