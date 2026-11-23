// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is one long home page. These old page URLs jump to their section.
  async redirects() {
    return [
      { source: "/services", destination: "/#services", permanent: false },
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/lms", destination: "/#services", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
    ];
  },
};

export default nextConfig;
