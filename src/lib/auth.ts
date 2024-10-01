import {
  globalAction$,
  RequestHandler,
  routeLoader$,
} from "@builder.io/qwik-city";
import { REDIRECT_STATUS_CODE } from "./constatnts";
import { fetchBackend } from "./fetch-backend";
import { ApiResponse, AuthUser } from "./types";
import { implicit$FirstArg } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";

export const Auth$ = /*#__PURE__*/ implicit$FirstArg(AuthQrl);

export function AuthQrl() {
  const onRequest: RequestHandler = async (event) => {
    if (isServer) {
      const accessToken = event.cookie.get("accessToken")?.value;
      if (accessToken) {
        event.sharedMap.set("accessToken", accessToken);
        const user = await fetchBackend(event)
          .headers({ Authorization: `Bearer ${accessToken}` })
          .get("/auth/me")
          .unauthorized(() => {
            event.cookie.delete("accessToken");
            // delete refresh token from cookie
            event.cookie.delete("refreshToken");

            // remove sharedmap data related to accessToken and user
            event.sharedMap.delete("user");
            event.sharedMap.delete("accessToken");

            throw event.redirect(REDIRECT_STATUS_CODE, "/");
          })
          .json<ApiResponse<{ user: AuthUser }>>();

        event.sharedMap.set("user", user);
      }
    }
  };

  const useSession = routeLoader$(async (event) => {
    const user = event.sharedMap.get("user") as AuthUser | null | undefined;
    return { user };
  });

  const useLogout = globalAction$(async (_, event) => {
    // logout from server
    const accessToken = event.sharedMap.get("accessToken");
    if (!accessToken) throw event.redirect(REDIRECT_STATUS_CODE, "/login");
    const resp = await fetchBackend(event)
      .url("/auth/logout")
      .post()
      .json<ApiResponse>();

    if (resp.success) {
      // delete access token from cookie
      event.cookie.delete("accessToken");

      // delete refresh token from cookie
      event.cookie.delete("refreshToken");

      // remove sharedmap data related to accessToken and user
      event.sharedMap.delete("user");
      event.sharedMap.delete("accessToken");

      // redirect to home page
      throw event.redirect(REDIRECT_STATUS_CODE, "/");
    }
  });

  return { onRequest, useSession, useLogout };
}
