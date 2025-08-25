import React from "react"

import SmartLink from "@/components/shared/smartLink/SmartLink"
import { cn } from "@/lib/helpers/helper.cn"

export type LinkToParentLibraryProps = {
  className?: string
  libraryName?: string
  parentLibraryUrl?: string
}

const LinkToParentLibraryContent = ({
  className,
  parentLibraryUrl,
  libraryName = "dit lokale bibliotek",
}: LinkToParentLibraryProps) => {
  return (
    <p className={cn("text-typo-caption", className)}>
      En del af{" "}
      {parentLibraryUrl ? (
        <SmartLink
          className="animate-text-underline"
          linkType="external"
          href={parentLibraryUrl}
          target="_blank">
          {libraryName}
        </SmartLink>
      ) : (
        libraryName
      )}
    </p>
  )
}

export default LinkToParentLibraryContent
