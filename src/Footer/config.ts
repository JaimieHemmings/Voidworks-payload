import type { GlobalConfig } from 'payload'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'blurb',
      type: 'textarea',
      required: true,
      label: 'Footer Blurb',
      defaultValue:
        "Ireland's leading water treatment specialists. Providing comprehensive solutions for hard water, filtration, and water quality improvement since 2003.",
      admin: {
        description: 'A short description to display in the footer.',
      },
    },
    {
      name: 'quickLinks',
      type: 'array',
      label: 'Quick Links',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Link Label',
          defaultValue: 'Quick Link',
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
        },
      ],
    },
    {
      name: 'resourceLinks',
      type: 'array',
      label: 'Resources',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Resource Label',
          defaultValue: 'Resource Link',
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: ['Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'YouTube', 'WhatsApp'],
          required: true,
          defaultValue: 'Facebook',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
          defaultValue: 'https://www.facebook.com/yourpage',
        },
      ],
      admin: {
        description: 'Links to your social media profiles.',
      },
    },
  ],
  admin: {
    group: 'Globals',
  },
  hooks: {
    afterChange: [revalidateFooter],
  },
}
