import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.amparia.app',
      lastModified: new Date('2026-05-15'),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
