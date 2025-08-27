"use client"

import { useSelector } from "@xstate/react"
import React from "react"

import useDplCmsPublicConfig from "@/lib/config/dpl-cms/useDplCmsPublicConfig"
import { sheetStore } from "@/store/sheet.store"

import LoginSheet from "../sheet/LoginSheet"
import SearchFilterSheet from "../sheet/SearchFilterSheet"

export function DynamicSheet() {
  const { config: dplCmsConfig, isLoading: configIsLoading } = useDplCmsPublicConfig()
  const loginUrlAdgangsplatformen =
    (!configIsLoading && dplCmsConfig?.loginUrls?.adgangsplatformen) || undefined

  const open = useSelector(sheetStore, state => state.context.open)
  const sheetType = useSelector(sheetStore, state => state.context.sheetType)
  const storeProps = useSelector(sheetStore, state => state.context.props)
  const props = { ...storeProps, open }

  if (sheetType === "LoginSheet") {
    return <LoginSheet loginUrlAdgangsplatformen={loginUrlAdgangsplatformen} {...props} />
  }
  if (sheetType === "SearchFilterSheet") {
    return <SearchFilterSheet facets={[]} {...props} />
  }

  return null
}
