/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // ✅ เพิ่ม limit ได้ถึง 10MB
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hquwwxizeiwpilvjgeig.supabase.co',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/event/:path*",
    "/memorypage/:path*",
    "/invitationpage/:path*",
  ],
};