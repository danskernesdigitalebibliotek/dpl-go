import * as client from "openid-client"

import goConfig from "@/lib/config/goConfig"
import { isBuildingProduction } from "@/lib/helpers/helper.env"

export const uniloginClientSettings = {
  post_login_route: `${goConfig("app.url")}/user/profile`,
}

export async function getUniloginClientConfig() {
  const defaultConfigOptions = {
    ignoreMissingConfiguration: isBuildingProduction(),
  }
  const wellKnownUrl = await goConfig("service.unilogin.wellknown.url", defaultConfigOptions)
  const server: URL = new URL(String(wellKnownUrl))
  const clientId = await goConfig("service.unilogin.client-id", defaultConfigOptions)
  const clientSecret = await goConfig("service.unilogin.client-secret", defaultConfigOptions)
  // We need all of these to be able to continue.
  if (!wellKnownUrl || !clientId || !clientSecret) {
    console.error("Missing configuration for Unilogin client")
    return null
  }

  return await client.discovery(server, clientId, clientSecret)
}
