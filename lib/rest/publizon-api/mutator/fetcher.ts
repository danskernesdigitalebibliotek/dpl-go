import goConfig from "@/lib/config/goConfig"
import { getRestServiceUrlWithParams } from "@/lib/fetchers/helper"

export const fetcher = async <ResponseType>({
  url,
  method,
  headers,
  params,
  data,
}: {
  url: string
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD"
  headers?: object
  params?: unknown
  data?: BodyType<unknown>
  signal?: AbortSignal
}) => {
  const authHeaders = {
    Authorization: `Bearer ${goConfig("token.adgangsplatformen.library")}`,
  } as object

  const body = data ? JSON.stringify(data) : null
  const serviceUrl = getRestServiceUrlWithParams({
    baseUrl: process.env.NEXT_PUBLIC_PUBHUB_BASE_URL || "",
    url,
    params,
  })

  try {
    const response = await fetch(serviceUrl, {
      method,
      headers: {
        ...headers,
        ...authHeaders,
      },
      body,
    })

    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.error(response.status, response.statusText, serviceUrl)
    }

    try {
      return (await response.json()) as ResponseType
    } catch (e) {
      if (!(e instanceof SyntaxError)) {
        throw e
      }
    }
  } catch (error: unknown) {
    if (error) {
      throw error
    }

    const message = error instanceof Error ? error.message : "Unknown error"
    // eslint-disable-next-line no-console
    console.error(message, serviceUrl)
  }

  // Do nothing. Some of our responses are intentionally empty and thus
  // cannot be converted to JSON. Fetch API and TypeScript has no clean
  // way for us to identify empty responses, so instead we swallow
  // syntax errors during decoding.
  return null
}

export default fetcher

export type ErrorType<ErrorData> = ErrorData

export type BodyType<BodyData> = BodyData
