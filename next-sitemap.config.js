
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_URL || 'https://example.com',
    generateRobotsTxt: true, // (optional),
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 7000,
    exclude: [
        '/admin/*',
        "/api/*",
        '/login',
        '/_next/*',
        '/404',
        '/500',
    ],
    transform: async (config, url) => {
        let priority = 0.7;
        if (url === '/') {
            priority = 1
        } else if (url === '/san-pham/*' || url === '/gioi-thieu' || url === '/feedback' || url === '/tin-tuc/*' || url === '/lien-he') {
            priority = 0.9
        }
        return {
            priority,
            changefreq: 'daily',
            loc: url,
            lastmod: new Date().toISOString(),
        }
    },
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/api', '/login'],
            }
        ],
        additionalSitemaps: [`${process.env.NEXT_PUBLIC_URL}/sitemap.xml`]
    }
}