import { getServerFetchDataHandler } from "../../fetchers/fbi.fetcher";
import { GetMaterialDocument,  } from "./graphql"


export const getUseGetMaterialQueryServerFetcher = async <GetMaterialQuery, GetMaterialQueryVariables>(variables: GetMaterialQueryVariables, options?: RequestInit['headers']) => {
  const fetcher = await getServerFetchDataHandler<GetMaterialQuery, GetMaterialQueryVariables>(GetMaterialDocument, variables, options);
  return fetcher;
}
// export const useGetMaterialQueryServerFetcher = (variables: GetMaterialQueryVariables, options?: RequestInit['headers']) => getServerFetchDataHandle<GetMaterialQuery, GetMaterialQueryVariables>(GetMaterialDocument, variables, options);

// export const useGetMaterialQueryServer = Object.assign(useGetMaterialQuery, {
// 	fetcher: useGetMaterialQueryServerFetcher
// });
// useGetMaterialQueryServer.fetcher = useGetMaterialQueryServerFetcher
