import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Allow Paddle's CDN for checkout overlay
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://cdn.paddle.com",
              "frame-src 'self' https://checkout.paddle.com https://sandbox-checkout.paddle.com",
              "connect-src 'self' https://*.paddle.com",
              "style-src 'self' 'unsafe-inline' https://cdn.paddle.com",
              "img-src 'self' data: https://*.paddle.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
