

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['next-international', 'international-types'],
    reactStrictMode: true,
    output: "standalone",
    env: {
        WEB_SITE_URL: "https://deploily.cloud",
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'deploily.cloud',
                pathname: '**',
            },
        ],
    },
    swcMinify: true
};

export default nextConfig

