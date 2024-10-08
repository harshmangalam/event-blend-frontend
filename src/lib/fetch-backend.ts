import { RequestEventCommon } from "@builder.io/qwik-city";
import { BASE_URI } from "./constatnts";
import wretch from "wretch";

export const fetchBackend = (event: RequestEventCommon) => {
  const accessToken = event.sharedMap.get("accessToken");
  return wretch(BASE_URI)
    .errorType("json")
    .options({
      credentials: "include",
    })
    .headers({
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    })
    .catcher(404, (err) => {
      throw event.error(404, err.message);
    })
    .catcher(403, (err) => {
      throw event.error(403, err.message);
    })
    .catcher(401, (err) => {
      throw event.error(401, err.message);
    })
    .catcher(500, (err) => {
      throw event.error(500, err.message);
    });
};

export const fetchPublicAPI = () => {
  return wretch(BASE_URI).errorType("json");
};
