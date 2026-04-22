/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8080/:path*",
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/auth/sign-in',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
