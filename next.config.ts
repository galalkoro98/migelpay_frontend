import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL, // Ensure backend URL is accessible
    NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET, // Secret for NextAuth.js
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
  images: {
    domains: ["res.cloudinary.com"], // Allow Cloudinary images if used
  },
};

export default nextConfig;
