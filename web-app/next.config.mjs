const nextConfig = {
  turbopack: { root: process.cwd() },
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig
