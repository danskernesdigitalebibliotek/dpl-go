import { notFound } from "next/navigation"
import React from "react"

import loadPage from "@/app/[[...slug]]/loadPage"
import BasicPageLayout from "@/components/pages/basicPageLayout/BasicPageLayout"
import goConfig from "@/lib/config/goConfig"
import { GetPageByPathQuery, NodeGoPage } from "@/lib/graphql/generated/dpl-cms/graphql"

async function page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const { slug } = params

  let data: GetPageByPathQuery
  // If no slug is provided, load the frontpage
  if (!slug) {
    data = await loadPage(goConfig("routes.frontpage"))
  } else {
    const slugString = slug.join("/")
    data = await loadPage(slugString)
  }

  const routeType = data.route?.__typename

  if (routeType === "RouteRedirect") {
    // TODO: implement redirect
    return null
  }

  if (routeType === "RouteExternal") {
    // TODO: implement external route redirect
    return null
  }

  if (!routeType || !data?.route?.entity) {
    return notFound()
  }

  const pageData = data.route.entity

  return <BasicPageLayout pageData={pageData as NodeGoPage} />
}

export default page
