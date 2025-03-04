"use client"

import React from "react"

import { ParagraphGoMaterialSliderAutomatic } from "@/lib/graphql/generated/dpl-cms/graphql"
import { useComplexSearchForWorkTeaserQuery } from "@/lib/graphql/generated/fbi/graphql"

import MaterialSlider, { MaterialSliderSkeleton } from "./MaterialSlider"

type MaterialSliderAutomatic = {
  titleOptional: ParagraphGoMaterialSliderAutomatic["title"]
  cqlSearch: ParagraphGoMaterialSliderAutomatic["cqlSearch"]
  sliderAmountOfMaterials: ParagraphGoMaterialSliderAutomatic["sliderAmountOfMaterials"]
}

const MaterialSliderAutomatic = ({
  titleOptional,
  cqlSearch,
  sliderAmountOfMaterials,
}: MaterialSliderAutomatic) => {
  const { data, isLoading } = useComplexSearchForWorkTeaserQuery(
    {
      cql: cqlSearch?.value || "",
      offset: 0,
      limit: sliderAmountOfMaterials,
      filters: {},
    },
    { enabled: !!cqlSearch }
  )

  if (isLoading) return <MaterialSliderSkeleton />

  return <MaterialSlider works={data?.complexSearch.works} title={titleOptional} />
}

export default MaterialSliderAutomatic
