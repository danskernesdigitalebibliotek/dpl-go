import type { CodegenConfig } from "@graphql-codegen/cli"

import goConfig from "./lib/config/goConfig"

const { loadEnvConfig } = require("@next/env")

loadEnvConfig(process.cwd())
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const config: CodegenConfig = {
  overwrite: true,
  generates: {
    "lib/graphql/generated/dpl-cms/graphql.tsx": {
      documents: "**/*.dpl-cms.graphql",
      // TODO: Make this configurable
      schema: {
        [`${process.env.NEXT_PUBLIC_GRAPHQL_SCHEMA_ENDPOINT_DPL_CMS}`]: {
          headers: {
            Authorization: `Basic Z3JhcGhxbF9jb25zdW1lcjp0ZXN0`,
          },
        },
      },
      plugins: ["typescript", "typescript-operations", "typescript-react-query"],
      config: {
        futureProofEnums: true,
        withHooks: true,
        defaultScalarType: "unknown",
        reactQueryVersion: 5,
        exposeFetcher: true,
        exposeQueryKeys: true,
        addSuspenseQuery: true,
        namingConvention: {
          typeNames: "change-case-all#pascalCase",
          transformUnderscore: true,
        },
        fetcher: "@/lib/graphql/fetchers/dpl-cms.fetcher#fetcher",
      },
      hooks: {
        afterOneFileWrite: ["yarn eslint --fix"],
      },
    },
    // "lib/graphql/generated/dpl-cms/graphql.schema.json": {
    //   // TODO: Make this configurable
    //   schema: "http://dapple-cms.docker/graphql",
    //   plugins: ["introspection"],
    // },
    "lib/graphql/generated/fbi/graphql.tsx": {
      documents: "**/*.fbi.graphql",
      schema: [
        {
          [String(goConfig("service.fbi.graphql.endpoint"))]: {
            headers: {
              Authorization: `Bearer ${goConfig("token.adgangsplatformen.library")}`,
            },
          },
        },
      ],
      plugins: ["typescript", "typescript-operations", "typescript-react-query"],
      config: {
        futureProofEnums: true,
        withHooks: true,
        defaultScalarType: "unknown",
        reactQueryVersion: 5,
        exposeFetcher: true,
        exposeQueryKeys: true,
        addSuspenseQuery: true,
        namingConvention: {
          typeNames: "change-case-all#pascalCase",
          transformUnderscore: true,
        },
        fetcher: "@/lib/graphql/fetchers/fbi.fetcher#fetchData",
      },
      hooks: {
        afterOneFileWrite: ["yarn eslint --fix"],
      },
    },
  },
}

export default config
