import { fetcher } from "@/lib/graphql/fetchers/dpl-cms.fetcher"
import {
  GetArticleByRouteDocument,
  GetArticleByRouteQuery,
} from "@/lib/graphql/generated/dpl-cms/graphql"

const loadArticle = async (path: string) => {
  const data = await fetcher<GetArticleByRouteQuery, { path: string }>(GetArticleByRouteDocument, {
    path,
  })()

  return data
}

export default loadArticle
