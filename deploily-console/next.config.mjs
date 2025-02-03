

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['next-international', 'international-types'],
    reactStrictMode: true,
    output: "standalone",
    env: {
        WEB_SITE_URL: "https://console.deploily.cloud",
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'console.deploily.cloud',
                pathname: '**',
            },
        ],
    },
    swcMinify: true
};

export default nextConfig

