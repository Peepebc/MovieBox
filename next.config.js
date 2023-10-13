/** @type {import('next').NextConfig} */
module.exports = {
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*' // Proxy to Backend
      }
    ]
  }
}