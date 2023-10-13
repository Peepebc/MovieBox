/** @type {import('next').NextConfig} */
module.exports = {
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://moviebox.1.us-1.fl0.io/:path*' // Proxy to Backend
      }
    ]
  }
}