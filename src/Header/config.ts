import type { GlobalConfig } from 'payload'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        {
          name: 'linkType',
          type: 'radio',
          options: [
            {
              label: 'Page',
              value: 'page',
            },
            {
              label: 'Custom URL',
              value: 'custom',
            },
          ],
          defaultValue: 'page',
          required: true,
        },
        {
          name: 'link',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
          hasMany: false,
          admin: {
            condition: (_, siblingData) => siblingData.linkType === 'page',
          },
        },
        {
          name: 'customUrl',
          type: 'text',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData.linkType === 'custom',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'hasChildren',
          type: 'checkbox',
          required: true,
          defaultValue: false,
        },
        {
          name: 'childLinks',
          type: 'array',
          fields: [
            {
              name: 'link',
              type: 'relationship',
              relationTo: 'pages',
              required: true,
              hasMany: false,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
          admin: {
            condition: (_, siblingData) => siblingData.hasChildren,
          },
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
