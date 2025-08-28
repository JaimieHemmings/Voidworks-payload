import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React from 'react'
import { unstable_cache } from 'next/cache'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    where: {
      parent: {
        exists: true,
      },
    },
    select: {
      slug: true,
      parent: true,
    },
  })

  const params: { slug: string[] }[] = []

  // Generate paths for nested pages
  for (const page of pages.docs) {
    if (page.parent && typeof page.parent === 'object' && 'slug' in page.parent) {
      const parentSlug = page.parent.slug
      if (parentSlug && page.slug) {
        params.push({
          slug: [parentSlug, page.slug],
        })
      }
    }
  }

  return params
}

type Args = {
  params: Promise<{
    slug: string[]
  }>
}

export default async function NestedPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await paramsPromise

  // For nested pages, the full slug path is the last element
  const fullSlugPath = slug.join('/')
  const pageSlug = slug[slug.length - 1]
  const url = '/' + fullSlugPath

  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryNestedPageBySlug(
    pageSlug,
    slug.length > 1 ? slug[slug.length - 2] : undefined,
  )()

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article>
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const pageSlug = slug[slug.length - 1]
  const parentSlug = slug.length > 1 ? slug[slug.length - 2] : undefined

  const page = await queryNestedPageBySlug(pageSlug, parentSlug)()

  return generateMeta({ doc: page })
}

const queryNestedPageBySlug = (slug: string | undefined, parentSlug?: string) =>
  unstable_cache(
    async () => {
      const { isEnabled: draft } = await draftMode()
      const payload = await getPayload({ config: configPromise })

      // First, find the parent page if parentSlug is provided
      let parentPage = null
      if (parentSlug) {
        const parentResult = await payload.find({
          collection: 'pages',
          draft,
          limit: 1,
          pagination: false,
          overrideAccess: draft,
          where: {
            slug: {
              equals: parentSlug,
            },
          },
        })
        parentPage = parentResult.docs?.[0] || null
      }

      // Then find the child page
      const result = await payload.find({
        collection: 'pages',
        draft,
        limit: 1,
        pagination: false,
        overrideAccess: draft,
        depth: 2,
        where: {
          and: [
            {
              slug: {
                equals: slug,
              },
            },
            parentSlug && parentPage?.id
              ? {
                  parent: {
                    equals: parentPage.id,
                  },
                }
              : parentSlug
                ? {
                    // If parentSlug is provided but parentPage wasn't found, return no results
                    id: {
                      equals: 'non-existent-id',
                    },
                  }
                : {
                    parent: {
                      exists: false,
                    },
                  },
          ],
        },
        select: {
          id: true,
          title: true,
          slug: true,
          hero: true,
          layout: true,
          meta: true,
          publishedAt: true,
          breadcrumbs: true,
          parent: true,
          _status: true,
          updatedAt: true,
          createdAt: true,
        },
      })

      return result.docs?.[0] || null
    },
    [`nested_page_${parentSlug || 'root'}_${slug}`],
    {
      tags: [`pages_${slug}`, ...(parentSlug ? [`pages_${parentSlug}`] : []), 'pages'],
    },
  )
