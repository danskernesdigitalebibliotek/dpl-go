import { getPlaiceholder } from "plaiceholder"

export async function getBase64(url: string) {
  const buffer = await fetch(url.toString()).then(async res => Buffer.from(await res.arrayBuffer()))

  const { base64 } = await getPlaiceholder(buffer, {
    size: 20,
    saturation: 1.2,
    lightness: 1.3,
  })

  return base64
}
