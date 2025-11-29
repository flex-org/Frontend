import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  compress: true,
  poweredByHeader: false,
 images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.platme.com",
      },
    ],
    formats: ["image/avif", "image/webp"], // 🆕 Add this
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
    ];
  },
    experimental: {
    optimizePackageImports: [
      "lucide-react",
      "recharts",
      "@radix-ui/react-accordion",
      "@radix-ui/react-select",
    ],
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

// 👇 الفكرة هنا في require الديناميكي
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true,
});

export default withBundleAnalyzer(nextConfig);
