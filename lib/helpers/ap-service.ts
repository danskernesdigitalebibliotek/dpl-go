import { getDplCmsPublicConfig } from "../config/dpl-cms/dplCmsConfig"
import { getEnv } from "../config/env"
import goConfig from "../config/goConfig"

const serviceSettings = goConfig("services.ap-services")
export type TServiceType = keyof typeof serviceSettings

export const getApServiceSettings = (serviceType: TServiceType) => {
  return serviceSettings[serviceType as TServiceType] ?? null
}

export const getApServiceUrl = async (serviceType: TServiceType) => {
  const serviceSettings = getApServiceSettings(serviceType)
  if (!serviceSettings) {
    throw new Error(`No url found for the ${serviceType} service`)
  }

  if (serviceType === "fbi") {
    const dplCmsConfig = await getDplCmsPublicConfig()

    if (!dplCmsConfig.searchProfiles.local) {
      throw new Error("DPL CMS searchProfiles.local is not defined")
    }

    return serviceSettings.url.replace(
      "{search_profile_placeholder}",
      dplCmsConfig.searchProfiles.local
    )
  }

  return serviceSettings.url
}

export const getAPServiceFetcherBaseUrl = (serviceType: TServiceType) =>
  `${getEnv("APP_URL")}/${goConfig("routes.adgangsplatformen-service-proxy")}/${serviceType}`
