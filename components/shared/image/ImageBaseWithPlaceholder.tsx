import React from "react"

import { getEnv } from "@/lib/config/env"

import ImageBase, { TImageBaseProps } from "./ImageBase"

type TImageWrapperProps = Omit<TImageBaseProps, "base64">

export default async function ImageBaseWithPlaceholder(props: TImageWrapperProps) {
  const { src, ...otherProps } = props

  if (!src) return null

  // Get base64 image
  const response = await fetch(`${getEnv("APP_URL")}/api/getBase64?url=${encodeURIComponent(src)}`)
  const { data } = await response.json()
  const base64 = data?.base64

  if (!base64) {
    return null
  }

  return <ImageBase src={src} base64={base64} {...otherProps} />
}
