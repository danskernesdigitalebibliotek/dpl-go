import { revalidatePath, revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import goConfig from "@/lib/config/goConfig"

import { resolveRevalidationPath } from "./helper"

const paramsSchema = z.union([
  z.object({
    type: z.literal("tag"),
    tags: z.array(z.string().regex(/^[a-zA-Z0-9-:]+$/)),
  }),
  z.object({
    type: z.literal("path"),
    paths: z.array(z.string().regex(/^\/[a-zA-Z0-9-\/]+$/)),
    contentType: z.string().optional(),
  }),
])

export async function POST(request: NextRequest) {
  const secret = goConfig("cache.revalidate.secret")
  const authToken = (request.headers.get("authorization") ?? "").split("Bearer ").at(1)

  if (!authToken || authToken !== secret) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 })
  }

  const body = await request.json()
  try {
    const params = paramsSchema.parse(body)
    switch (params.type) {
      case "tag":
        params.tags.forEach(tag => {
          // eslint-disable-next-line no-console
          console.log("Revalidating tag:", tag)
          revalidateTag(tag)
        })
        break
      case "path":
        params.paths.forEach(path => {
          const pathToRevalidate = resolveRevalidationPath({ path, params })
          if (pathToRevalidate) {
            // eslint-disable-next-line no-console
            console.log("Revalidating path:", pathToRevalidate)
            revalidatePath(pathToRevalidate)
          }
        })
        break
    }

    return NextResponse.json({ params })
  } catch (e) {
    console.error(body)
    // TODO: Error logging
    console.error(e)
    return NextResponse.json({ error: "Wrong input" }, { status: 422 })
  }
}

export const dynamic = "force-dynamic"
