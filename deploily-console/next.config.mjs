
const BASE_URL = `http://192.168.1.15:5000`; 

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['next-international', 'international-types'],
    reactStrictMode: true,
    output: "standalone",
    env: {
        BASE_URL: `${BASE_URL}`,
        API_BASE_URL: `${BASE_URL}/api/v1`,
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

