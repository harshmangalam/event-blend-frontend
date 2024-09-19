import { RequestHandler, routeLoader$ } from "@builder.io/qwik-city";
import { REDIRECT_STATUS_CODE } from "./constatnts";
import { fetchBackend } from "./fetch-backend";
import { ApiResponse, AuthUser } from "./types";
import { implicit$FirstArg, QRL } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";

export const Auth$ = /*#__PURE__*/ implicit$FirstArg(AuthQrl);

async function getCurrentUser(accessToken: string) {
  const resp = await fetchBackend
    .headers({ Authorization: `Bearer ${accessToken}` })
    .get("/auth/me")
    .json<ApiResponse<{ user: AuthUser }>>();

  if (!resp.data?.user) return null;
  return resp.data.user;
}

export function AuthQrl() {
  const onRequest: RequestHandler = async (event) => {
    if (isServer) {
      const accessToken = event.cookie.get("accessToken")?.value;
      event.sharedMap.set("accessToken", accessToken);
      if (accessToken) {
        event.sharedMap.set("accessToken", accessToken);
        const user = await getCurrentUser(accessToken);
        event.sharedMap.set("user", user);
      }
    }
  };

  const useSession = routeLoader$(async (event) => {
    const user = event.sharedMap.get("user") as AuthUser | null;
    return { user };
  });

  return { onRequest, useSession };
}
