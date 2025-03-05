import React from "react"

import ImageBase, { TImageBaseProps } from "./ImageBase"
import { getBase64 } from "./helper"

type TImageWrapperProps = Omit<TImageBaseProps, "base64">

export default async function ImageBaseWithPlaceholder(props: TImageWrapperProps) {
  const { src, ...otherProps } = props

  if (!src) return null

  // Get base64 image
  const base64 = await getBase64(src)

  if (!base64) {
    return null
  }

  return <ImageBase src={src} base64={base64} {...otherProps} />
}
