import { getEnv } from "@/lib/config/env"

import AccessForbiddenError from "./AccessForbiddenError"

const getHeaders = (headers: RequestInit["headers"] | undefined) => {
  const contentTypeHeader = {
    "Content-Type": "application/json",
  }

  if (headers && headers.hasOwnProperty("Cookie")) {
    return { ...contentTypeHeader, ...headers }
  }
  const dplCmsGraphqlBasicToken = getEnv("GRAPHQL_BASIC_TOKEN_DPL_CMS")

  return {
    ...contentTypeHeader,
    Authorization: `Basic ${dplCmsGraphqlBasicToken}`,
    ...headers,
  }
}

export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit & { next?: NextFetchRequestConfig }
) {
  const dplCmsGraphqlEndpoint = getEnv("GRAPHQL_SCHEMA_ENDPOINT_DPL_CMS")
  const dplCmsGraphqlBasicToken = getEnv("GRAPHQL_BASIC_TOKEN_DPL_CMS")

  // Check if the environment variables are set
  if (!dplCmsGraphqlEndpoint) {
    throw new Error("Missing DPL CMS GraphQL endpoint")
  }
  if (!dplCmsGraphqlBasicToken) {
    throw new Error("Missing DPL CMS GraphQL basic token")
  }
  const { next, headers } = options || {}

  return async (): Promise<TData> => {
    try {
      console.log("Fetching data from DPL CMS GraphQL endpoint")
      console.log("dplCmsGraphqlEndpoint:", dplCmsGraphqlEndpoint)
      console.log("Query:", query)
      console.log("Variables:", variables)
      console.log("Headers:", getHeaders(headers))
      console.log("Next options:", next)
      const res = await fetch(dplCmsGraphqlEndpoint, {
        method: "POST",
        headers: getHeaders(headers),
        body: JSON.stringify({ query, variables }),
        next,
      })

      const json = await res.json()

      if (res.status !== 200) {
        const { message } = json
        if (res.status === 403) {
          throw new AccessForbiddenError(message)
        } else {
          throw new Error(message)
        }
      }

      const cacheTagsRaw = res.headers.get("x-dpl-graphql-cache-tags")
      return { ...json.data, go: { cacheTags: cacheTagsRaw ? cacheTagsRaw.split(" ") : null } }
    } catch (error) {
      throw new Error("Failed to fetch data from DPL CMS", { cause: error })
    }
  }
}
