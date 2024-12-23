import * as client from "openid-client"

import goConfig from "@/lib/config/goConfig"

export const uniloginClientSettings = {
  post_login_route: `${goConfig("app.url")}/user/profile`,
}

export async function getUniloginClientConfig() {
  const wellKnownUrl = await goConfig("service.unilogin.wellknown.url")

  const server: URL = new URL(String(wellKnownUrl))
  const clientId = (await goConfig("service.unilogin.client-id")) ?? ""
  const clientSecret = (await goConfig("service.unilogin.client-secret")) ?? ""
  return await client.discovery(server, clientId, clientSecret)
}
