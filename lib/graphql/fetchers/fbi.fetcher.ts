import { getEnv } from "@/lib/config/env"

export const fetchData = <TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit["headers"]
): (() => Promise<TData>) => {
  return async () => {
    const res = await fetch(getEnv("GRAPHQL_SCHEMA_ENDPOINT_FBI"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getEnv("LIBRARY_TOKEN")}`,
        ...options,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    const json = await res.json()

    if (json.errors) {
      const { message } = json.errors[0] || {}
      throw new Error(message || "Error…")
    }

    return json.data
  }
}
