import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/health", "/privacy", "/terms-of-service", "/auth"].map(
    (route) => ({
      url: "https://todo.k1ng.dev" + route,
      lastModified: new Date(),
    })
  );

  return [...routes];
}
