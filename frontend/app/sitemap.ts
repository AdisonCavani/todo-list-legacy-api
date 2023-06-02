import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/health", "/privacy", "/terms-of-service", "/auth"].map(
    (route) => ({
      url: process.env.VERCEL_URL || "http://localhost:3000" + route,
      lastModified: new Date(),
    })
  );

  return [...routes];
}
