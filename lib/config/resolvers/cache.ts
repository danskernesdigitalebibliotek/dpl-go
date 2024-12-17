const cache = {
  "cache.revalidate.secret": () => {
    if (process.env.REVALIDATE_CACHE_SECRET) {
      return process.env.REVALIDATE_CACHE_SECRET
    }
  },
}

export default cache
