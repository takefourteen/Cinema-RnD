import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl: string = "https://cozycinema.vercel.app"
    return [
        {
            url: baseUrl,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${baseUrl}/explore-movies`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${baseUrl}/explore-tv-shows`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${baseUrl}/library`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${baseUrl}/login`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${baseUrl}/sign-up`,
            lastModified: new Date().toISOString(),
        }
    ]
}