import { HydrationBoundary, dehydrate } from "@tanstack/react-query"

import SearchPageLayout from "@/components/pages/searchPageLayout/SearchPageLayout"
import getQueryClient from "@/lib/getQueryClient"

import { prefetchSearchFacets, prefetchSearchResult } from "./fetchSearchResult.server"

const Page = async (props: { searchParams: Promise<{ q: string }> }) => {
  const searchParams = await props.searchParams

  const { q } = searchParams

  const queryClient = getQueryClient()
  prefetchSearchResult(q, queryClient)
  prefetchSearchFacets(q, queryClient)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchPageLayout />
    </HydrationBoundary>
  )
}

export default Page
