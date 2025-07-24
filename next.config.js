/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Ensures Next.js outputs static HTML, CSS, and JS files
  reactStrictMode: true, // Recommended for Next.js apps
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configure assetPrefix and basePath for GitHub Pages
  // Replace 'your-repo-name' with the actual name of your GitHub repository
  assetPrefix: process.env.NODE_ENV === "production" ? "/tech/" : "", // e.g., '/your-repo-name/'
  basePath: process.env.NODE_ENV === "production" ? "/tech" : "", // e.g., '/your-repo-name'
  images: {
    unoptimized: true, // Required for static export when using next/image
  },
}

module.exports = nextConfig
