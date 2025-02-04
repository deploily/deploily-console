/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://console.deploily.cloud', // Replace with your site URL
    generateRobotsTxt: true, // Enable robots.txt generation
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                disallow: '/', // Block all bots from crawling the site
            },
        ],
    },
    generateIndexSitemap: false, // Disable the sitemap index generation
    exclude: ['*'], // Exclude all pages from the sitemap
};
