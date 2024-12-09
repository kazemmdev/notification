import withPWA from "next-pwa"

const pwaConfig = {
  dest: "public",
  disable: false,
  register: true,
  dynamicStartUrl: true,
  skipWaiting: true,
  sw: "sw.js",
  swSrc: "service-worker.js",
  exclude: [
    ({ asset, _ }) => {
      return !!(asset.name.startsWith("server/") ||
        asset.name.match(/^((app-|^)build-manifest\.json|react-loadable-manifest\.json)$/));

    }
  ],
}

/** @type {import("next").NextConfig} */
const nextConfig = withPWA(pwaConfig)({
  swcMinify: true,
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           key: "X-Content-Type-Options",
  //           value: "nosniff"
  //         },
  //         {
  //           key: "X-Frame-Options",
  //           value: "DENY"
  //         },
  //         {
  //           key: "Referrer-Policy",
  //           value: "strict-origin-when-cross-origin"
  //         }
  //       ]
  //     },
  //     {
  //       source: "/sw.js",
  //       headers: [
  //         {
  //           key: "Content-Type",
  //           value: "application/javascript; charset=utf-8"
  //         },
  //         {
  //           key: "Cache-Control",
  //           value: "no-cache, no-store, must-revalidate"
  //         },
  //         {
  //           key: "Content-Security-Policy",
  //           value: "default-src 'self'; script-src 'self'"
  //         }
  //       ]
  //     }
  //   ]
  // }
})

export default nextConfig
