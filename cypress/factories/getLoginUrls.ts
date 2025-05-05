import { Factory } from "fishery"

import { GetLoginUrlsQuery } from "@/lib/graphql/generated/dpl-cms/graphql"

export default Factory.define<GetLoginUrlsQuery>(() => {
  return {
    goConfiguration: {
      loginUrls: {
        adgangsplatformen: "/some-path",
      },
    },
  }
})
