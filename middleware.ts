import { NextResponse } from "next/server"
import type { NextFetchEvent, NextRequest } from "next/server"

import goConfig from "./lib/config/config"
import { accessTokenShouldBeRefreshed, getSession } from "./lib/session/session"

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next()

  if (pathname.startsWith("/_next") || pathname.startsWith("/auth")) {
    return response
  }

  const session = await getSession({ request, response })

  // TODO: Check if we need to destroy the session if the refresh token is expired.
  // const session = await getIronSession<TSessionData>(request, response, sessionOptions);
  // const isExpired = accessTokenIsExpired(session);
  // console.log({ isExpired });
  // if (isExpired) {
  //   session.destroy();
  //   return NextResponse.redirect(new URL('/', request.url), { headers: response.headers });
  // }
  if (accessTokenShouldBeRefreshed(session)) {
    const currentPath = new URL(pathname, goConfig<string>("app.url"))
    const url = goConfig<string>("app.url")
    return NextResponse.redirect(`${url}/auth/token/refresh?redirect=${currentPath}`, {
      headers: response.headers,
    })
  }

  return response
}
