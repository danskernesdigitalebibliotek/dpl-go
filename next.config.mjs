import withPlaiceholder from "@plaiceholder/next"
import { env } from "process"

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    dynamicIO: true,
  },
  typescript: {
    // @todo This is a temporary solution!!
    // We are trying to bring down the build time.
    // Remember to remove this once the build time is optimized!!!
    ignoreBuildErrors: true,
  },
  eslint: {
    // @todo This is a temporary solution!!
    // We are trying to bring down the build time.
    // Remember to remove this once the build time is optimized!!!
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: env.NEXT_PUBLIC_DPL_CMS_HOSTNAME || "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@svgr/webpack",
          options: { babel: false },
        },
      ],
    })
    return config
  },
}

export default withPlaiceholder(nextConfig)
