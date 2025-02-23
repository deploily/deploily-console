
// const BASE_URL = "http://localost:5000"; // for DEV  
const BASE_URL = "https://console.deploily.cloud";  // for PROD

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['next-international', 'international-types'],
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

