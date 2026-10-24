import { defineField, defineType, defineArrayMember } from 'sanity';

const photo = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'image',
    options: { hotspot: true },
    fields: [
      defineField({
        name: 'alt',
        title: 'Describe the photo (for accessibility and Google)',
        type: 'string',
      }),
    ],
  });

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Project name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Web address',
      description: 'Click "Generate" to create it from the project name.',
      type: 'slug',
      options: { source: 'title', maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({
      name: 'category',
      title: 'Type of work',
      type: 'string',
      options: {
        list: ['Residential', 'Commercial', 'Renovation', 'Civil works'],
        layout: 'radio',
      },
    }),
    defineField({ name: 'completed', title: 'Completed', type: 'date', options: { dateFormat: 'MMMM YYYY' } }),
    defineField({ name: 'summary', title: 'Short description', type: 'text', rows: 4 }),
    photo('cover', 'Main photo'),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Describe the photo', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        }),
      ],
      options: { layout: 'grid' },
    }),
    defineField({
      name: 'featured',
      title: 'Show on the homepage',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [{ title: 'Newest first', name: 'completedDesc', by: [{ field: 'completed', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'location', media: 'cover' } },
});

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Service', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'summary', title: 'Short description', type: 'text', rows: 3 }),
    defineField({ name: 'order', title: 'Display order (1 = first)', type: 'number' }),
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
});

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Company settings',
  type: 'document',
  fields: [
    defineField({ name: 'companyName', title: 'Company name', type: 'string' }),
    defineField({ name: 'tagline', title: 'Homepage headline', type: 'string' }),
    defineField({ name: 'intro', title: 'Homepage intro', type: 'text', rows: 3 }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'whatsapp', title: 'WhatsApp number (digits only, with country code)', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'address', title: 'Address', type: 'text', rows: 2 }),
  ],
});

export const schemaTypes = [project, service, siteSettings];
