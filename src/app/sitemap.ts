import { MetadataRoute } from "next";
import { prisma } from "../../libs/prisma";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : 'http://localhost:3000';


    const [categories, products, post] = await Promise.all([
        prisma.category.findMany({ select: { link: true } }),
        prisma.product.findMany({ select: { link: true, category: { select: { link: true } } } }),
        prisma.post.findMany({ select: { link: true } })
    ])

    const staticPage: MetadataRoute.Sitemap = [
        { url: baseUrl, priority: 1, lastModified: new Date() },
        { url: `${baseUrl}/san-pham`, priority: 0.8, lastModified: new Date() },
        { url: `${baseUrl}/gioi-thieu`, priority: 0.8, lastModified: new Date() },
        { url: `${baseUrl}/lien-he`, priority: 0.8, lastModified: new Date() },
        { url: `${baseUrl}/tin-tuc`, priority: 0.8, lastModified: new Date() },
    ]

    const categoryPage: MetadataRoute.Sitemap = categories.map((cate) => {
        return {
            url: `${baseUrl}/san-pham/${cate.link}`,
            priority: 0.7,
            lastModified: new Date(),
        }
    })

    const productPage: MetadataRoute.Sitemap = products.map(product => {
        return {
            url: `${baseUrl}/san-pham/${product.category.link}/${product.link}`,
            priority: 0.6,
            lastModified: new Date(),
        }
    })

    const postPage: MetadataRoute.Sitemap = post.map(post => {
        return {
            url: `${baseUrl}/tin-tuc/${post.link}`,
            priority: 0.6,
            lastModified: new Date(),
        }
    })

    return [...staticPage, ...categoryPage, ...productPage, ...postPage];

}