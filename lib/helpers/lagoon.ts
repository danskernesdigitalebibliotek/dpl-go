export const getLagoonUrl = (type: "nginx" | "varnish" | "node") => {
  const routes = process.env.LAGOON_AUTOGENERATED_ROUTES?.split(",") ?? []
  for (const route of routes) {
    if (route.includes(type)) {
      return route
    }
  }
}