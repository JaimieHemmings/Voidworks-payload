import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import { generatePageUrl } from '@/utilities/generatePageUrl'

import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<{ link: CMSLinkType }> = ({ link }) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = link

  let href: string | null = null

  if (type === 'reference' && typeof reference?.value === 'object') {
    if (reference.relationTo === 'pages') {
      href = generatePageUrl(reference.value as Page)
    } else if (reference.relationTo === 'posts') {
      // Add logic for posts if needed, or leave as null
      href = ''
    }
  } else if (type === 'custom' && url) {
    href = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`
  }

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link
        className={cn(className)}
        href={
          type === 'reference' &&
          reference?.relationTo === 'pages' &&
          typeof reference?.value === 'object'
            ? generatePageUrl(link as Page) || ''
            : href || ''
        }
        {...newTabProps}
      >
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
