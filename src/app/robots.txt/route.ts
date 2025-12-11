import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pnehomes.com'
  
  const robotsTxt = `User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Allow important SEO pages
Allow: /sitemap.xml
Allow: /robots.txt

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay (optional - helps prevent server overload)
Crawl-delay: 1`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 24 hours
    },
  })
}