# Construction Tryout

Astro website + Sanity CMS, hosted on Cloudflare.

- Website: Astro (static), content pulled from Sanity at build time
- Admin panel: `/studio` (Sanity Studio embedded in the site)
- Sanity project: `9sbj6aed`, dataset `production`

## Cloudflare Pages settings
- Build command: `npm run build`
- Output directory: `dist`

## Publishing flow
Publish in /studio → Sanity webhook → Cloudflare deploy hook → site rebuilds.
