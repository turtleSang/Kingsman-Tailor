import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin', '/api', '/login'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl
    }
}