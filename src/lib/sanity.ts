import { sanityClient } from 'sanity:client';
import { createImageUrlBuilder } from '@sanity/image-url';

const builder = createImageUrlBuilder(sanityClient);

export function img(source: any) {
  return builder.image(source).auto('format');
}

// Fetch from Sanity. On Cloudflare builds (CF_PAGES or WORKERS_CI is set) a failure stops the build,
// so a broken connection never publishes an empty site. Locally it falls back
// to the given value so the site can still be previewed without content.
export async function load<T>(query: string, fallback: T, params: Record<string, unknown> = {}): Promise<T> {
  try {
    const result = await sanityClient.fetch<T>(query, params);
    return result ?? fallback;
  } catch (err) {
    if (process.env.CF_PAGES || process.env.WORKERS_CI) throw err;
    console.warn(`[sanity] Could not reach Sanity, using empty content: ${(err as Error).message}`);
    return fallback;
  }
}

export type Settings = {
  companyName?: string;
  tagline?: string;
  intro?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
};

export const settingsQuery = `*[_id == "siteSettings"][0]`;

export const projectFields = `_id, title, "slug": slug.current, location, category, completed, summary, cover, featured`;

export function formatDate(d?: string) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}
