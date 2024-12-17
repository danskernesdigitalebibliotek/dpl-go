// import getQueryClient from "@/lib/getQueryClient"
// import {
//   ExtractArticlesQuery,
//   useExtractArticlesQuery,
// } from "@/lib/graphql/generated/dpl-cms/graphql"

// const loadArticlesSsg = async () => {
//   const queryClient = getQueryClient()
//   const pageSize = 100
//   // We have a while loop.
//   // Just to be safe we do not allow more than 100 iterations.
//   const maxRuns = 100
//   let runNumber = 0

//   const {
//     nodeArticles: { nodes, edges, pageInfo },
//   } = await queryClient.fetchQuery<ExtractArticlesQuery>({
//     queryKey: useExtractArticlesQuery.getKey({ pageSize }),
//     queryFn: useExtractArticlesQuery.fetcher({ pageSize }),
//   })
//   let allNodes = nodes
//   let allEdges = edges
//   let cursor = edges[edges.length - 1]?.cursor

//   while (pageInfo.hasNextPage && runNumber < maxRuns) {
//     const {
//       nodeArticles: { nodes: newNodes, edges: newEdges },
//     } = await queryClient.fetchQuery<ExtractArticlesQuery>({
//       queryKey: useExtractArticlesQuery.getKey({ pageSize, cursor }),
//       queryFn: useExtractArticlesQuery.fetcher({ pageSize, cursor }),
//     })

//     allNodes = [...allNodes, ...newNodes]
//     allEdges = [...allEdges, ...newEdges]
//     cursor = newEdges[newEdges.length - 1]?.cursor
//     // eslint-disable-next-line no-console
//     console.log({ allNodes, allEdges, cursor })

//     runNumber += 1
//   }

//   return { nodes: allNodes }
// }

// export default loadArticlesSsg
