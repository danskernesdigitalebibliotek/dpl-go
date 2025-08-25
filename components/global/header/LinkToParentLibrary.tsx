import React from "react"

import { getDplCmsPublicConfig } from "@/lib/config/dpl-cms/dplCmsConfig"
import { getEnv } from "@/lib/config/env"

import LinkToParentLibraryContent from "./LinkToParentLibraryContent"

export type LinkToParentLibraryProps = {
  className?: string
}

const LinkToParentLibrary = async ({ className }: LinkToParentLibraryProps) => {
  const { libraryInfo } = await getDplCmsPublicConfig()
  const libraryName = libraryInfo?.name || "dit lokale bibliotek"
  const parentLibraryUrl = getEnv("DPL_CMS_HOSTNAME")

  return (
    <LinkToParentLibraryContent
      className={className}
      libraryName={libraryName}
      parentLibraryUrl={parentLibraryUrl}
    />
  )
}

export default LinkToParentLibrary
