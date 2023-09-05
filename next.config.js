/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "feedback-system-uploads.s3.amazonaws.com"
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com"
            }
        ]
    }
}

module.exports = nextConfig
