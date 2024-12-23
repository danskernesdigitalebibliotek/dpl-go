import React from "react"

import { WorkTeaserSearchPageFragment } from "@/lib/graphql/generated/fbi/graphql"

import WorkCardAvailabilityItem from "./WorkCardAvailabilityItem"
import { isOfWorkTypeCategory } from "./helper"

type WorkCardAvailabilityRowProps = {
  materialTypes: WorkTeaserSearchPageFragment["materialTypes"]
}

const WorkCardAvailabilityRow = ({ materialTypes }: WorkCardAvailabilityRowProps) => {
  return (
    <div className="flex w-full flex-row justify-center gap-2">
      {isOfWorkTypeCategory(materialTypes, "reading") && (
        <WorkCardAvailabilityItem iconName="book" />
      )}
      {isOfWorkTypeCategory(materialTypes, "listening") && (
        <WorkCardAvailabilityItem iconName="headphones" />
      )}
      {isOfWorkTypeCategory(materialTypes, "gaming") && (
        <WorkCardAvailabilityItem iconName="controller" />
      )}
      {isOfWorkTypeCategory(materialTypes, "video") && (
        <WorkCardAvailabilityItem iconName="video" />
      )}
    </div>
  )
}

export default WorkCardAvailabilityRow
