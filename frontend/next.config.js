const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = withPWA(nextConfig);
