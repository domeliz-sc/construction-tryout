import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [
    sanity({
      projectId: '9sbj6aed',
      dataset: 'production',
      apiVersion: '2026-10-01',
      // Static build: always fetch fresh content at build time.
      useCdn: false,
      // Admin panel lives at /studio
      studioBasePath: '/studio',
    }),
    react(),
  ],
});
