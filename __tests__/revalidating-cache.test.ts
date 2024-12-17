// @vitest-environment node
import { testApiHandler } from "next-test-api-route-handler"
import { revalidatePath, revalidateTag } from "next/cache"
import { describe, test } from "vitest"

// @ts-ignore
import * as revalidateCacheHandler from "@/app/cache/revalidate/route"

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}))

beforeEach(() => {
  // Mock the revalidatePath and revalidateTag functions
  // @ts-ignore
  revalidatePath.mockReturnValue(true)
  // @ts-ignore
  revalidateTag.mockReturnValue(true)
})

describe("Revalidate cache test access via bearer token", () => {
  test("That the cache revalidation endpoint returns 401 if no bearer token is provided", async () => {
    await testApiHandler({
      appHandler: revalidateCacheHandler,
      url: `/cache/revalidate`,
      async test({ fetch }) {
        const res = await fetch({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "tag", tags: ["tag1", "tag2"] }),
        })
        expect(res.status).toBe(401)
      },
    })
  })

  test("That the cache revalidation endpoint returns 200 if a valid bearer token is provided", async () => {
    await testApiHandler({
      appHandler: revalidateCacheHandler,
      url: `/cache/revalidate`,
      async test({ fetch }) {
        const res = await fetch({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer i9yUwqwgVLfvQ+4f8TnNRZcmHOYOKuUOTpZraUIWUCc=",
          },
          body: JSON.stringify({ type: "tag", tags: ["tag1", "tag2"] }),
        })
        expect(res.status).toBe(200)
      },
    })
  })
})

describe("Revalidate cache test combination of payloads", () => {
  test("That the cache revalidation endpoint returns 422 upon wrong input", async () => {
    await testApiHandler({
      appHandler: revalidateCacheHandler,
      url: `/cache/revalidate`,
      async test({ fetch }) {
        const res = await fetch({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer i9yUwqwgVLfvQ+4f8TnNRZcmHOYOKuUOTpZraUIWUCc=",
          },
          body: JSON.stringify({ type: "unknown-type" }),
        })
        expect(res.status).toBe(422)
      },
    })

    await testApiHandler({
      appHandler: revalidateCacheHandler,
      url: `/cache/revalidate`,
      async test({ fetch }) {
        const res = await fetch({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer i9yUwqwgVLfvQ+4f8TnNRZcmHOYOKuUOTpZraUIWUCc=",
          },
          body: JSON.stringify({ type: "tag", theTags: ["tag1", "tag2"] }),
        })
        expect(res.status).toBe(422)
      },
    })
  })

  test("That the cache revalidation endpoint returns 200 upon successful tag invalidation", async () => {
    await testApiHandler({
      appHandler: revalidateCacheHandler,
      url: `/cache/revalidate`,
      async test({ fetch }) {
        const res = await fetch({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer i9yUwqwgVLfvQ+4f8TnNRZcmHOYOKuUOTpZraUIWUCc=",
          },
          body: JSON.stringify({ type: "tag", tags: ["tag1", "tag2"] }),
        })
        expect(res.status).toBe(200)
      },
    })
  })

  test("That the cache revalidation endpoint returns 200 upon successful path invalidation", async () => {
    await testApiHandler({
      appHandler: revalidateCacheHandler,
      url: `/cache/revalidate`,
      async test({ fetch }) {
        const res = await fetch({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer i9yUwqwgVLfvQ+4f8TnNRZcmHOYOKuUOTpZraUIWUCc=",
          },
          body: JSON.stringify({ type: "path", paths: ["/some/path", "/some/path"] }),
        })
        expect(res.status).toBe(200)
      },
    })
  })
})

describe("Revalidate cache test different path and tag formats", async () => {
  test("That the cache revalidation endpoint returns 422 if a wrongly formatted path is given", async () => {
    await testApiHandler({
      appHandler: revalidateCacheHandler,
      url: `/cache/revalidate`,
      async test({ fetch }) {
        const res = await fetch({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer i9yUwqwgVLfvQ+4f8TnNRZcmHOYOKuUOTpZraUIWUCc=",
          },
          body: JSON.stringify({ type: "path", paths: ["some/path", "/some/path"] }),
        })
        expect(res.status).toBe(422)
      },
    })
  })
  test("That the cache revalidation endpoint returns 422 if a wrongly formatted path is given", async () => {
    await testApiHandler({
      appHandler: revalidateCacheHandler,
      url: `/cache/revalidate`,
      async test({ fetch }) {
        const res = await fetch({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer i9yUwqwgVLfvQ+4f8TnNRZcmHOYOKuUOTpZraUIWUCc=",
          },
          body: JSON.stringify({ type: "path", paths: ["/some/*path", "/some/path"] }),
        })
        expect(res.status).toBe(422)
      },
    })
  })
  test("That the cache revalidation endpoint returns 422 if a wrongly formatted tag is given", async () => {
    await testApiHandler({
      appHandler: revalidateCacheHandler,
      url: `/cache/revalidate`,
      async test({ fetch }) {
        const res = await fetch({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer i9yUwqwgVLfvQ+4f8TnNRZcmHOYOKuUOTpZraUIWUCc=",
          },
          body: JSON.stringify({ type: "tag", paths: ["!wrong-tag", "another tag"] }),
        })
        expect(res.status).toBe(422)
      },
    })
  })
})
