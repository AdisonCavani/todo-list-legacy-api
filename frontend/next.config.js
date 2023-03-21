const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,

  experimental: {
    appDir: true,
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/app",
        permanent: true,
      },
    ];
  },
};

if (process.env.ANALYZE === "true") {
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    openAnalyzer: true,
    enabled: true,
  });
  nextConfig = withBundleAnalyzer(nextConfig);
}

module.exports = withPWA(nextConfig);
