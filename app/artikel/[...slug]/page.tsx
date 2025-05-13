import { notFound } from "next/navigation"
import React, { Suspense } from "react"

import loadArticle from "@/app/artikel/[...slug]/loadArticle"
import ArticlePageLayout, {
  TArticlePageLayoutProps,
} from "@/components/pages/articlePageLayout/ArticlePageLayout"
import { setPageMetadata } from "@/lib/helpers/helper.metadata"

async function getPage(slug: string[]) {
  const slugString = slug.join("/")
  return await loadArticle(slugString)
}

export async function generateMetadata(props: { params: Promise<{ slug: string[] }> }) {
  const data = await getPage((await props.params).slug)

  if (data.route?.__typename !== "RouteInternal") {
    return null
  }

  const { title } = data.route.entity as TArticlePageLayoutProps
  return setPageMetadata(title)
}

async function ArticlePage(props: { params: Promise<{ slug: string[] }> }) {
  const data = await getPage((await props.params).slug)
  const routeType = data.route?.__typename

  if (routeType === "RouteRedirect") {
    // TODO: implement redirect
    return notFound()
  }
  if (routeType === "RouteExternal") {
    // TODO: implement external route redirect
    return notFound()
  }
  if (!routeType) {
    return notFound()
  }
  if (data.route?.entity?.__typename !== "NodeGoArticle") {
    return notFound()
  }

  const pageData = data.route.entity
  return <ArticlePageLayout pageData={pageData as TArticlePageLayoutProps} />
}

async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  return (
    <Suspense>
      <ArticlePage params={params} />
    </Suspense>
  )
}

export default Page
