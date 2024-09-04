import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages에 최적화된 설정
  output: "standalone",

  // Cloudflare Pages에서 사용할 수 있는 웹 플랫폼 API 활성화
  experimental: {
    webVitalsAttribution: ["CLS", "LCP"],
  },
};

if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

export default nextConfig;
