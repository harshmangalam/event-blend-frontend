import { RequestEventBase } from "@builder.io/qwik-city";
import { BASE_URI } from "./constatnts";
import wretch from "wretch";

export const fetchBackend = (event?: RequestEventBase) => {
  const accessToken = event?.sharedMap.get("accessToken");
  return wretch(BASE_URI)
    .errorType("json")
    .options({
      credentials: "include",
    })
    .headers({
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    });
};
