'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = (data?.navItems || []).filter(
    (item) => item.link !== undefined && item.link !== null && typeof item.link === 'object',
  )

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        if (
          link &&
          typeof link === 'object' &&
          'url' in link &&
          (typeof link.url === 'string' || link.url === null || link.url === undefined)
        ) {
          return <CMSLink key={i} link={{ ...link, url: link.url as string | null | undefined }} />
        }
        return null
      })}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}
