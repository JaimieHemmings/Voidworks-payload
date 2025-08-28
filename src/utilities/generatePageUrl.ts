import type { Page } from '@/payload-types'

/**
 * Generate a URL for a page, supporting nested pages
 * Uses the nestedDocs plugin's breadcrumbs to build the full URL path
 * This follows the same logic as the generateURL function in the payload config
 */
export function generatePageUrl(page: Partial<Page> | null | undefined): string {
  if (!page) return '/'

  if (!page.slug) return '/'

  if (page.slug === 'home') return '/'

  // If the page has breadcrumbs from the nested docs plugin, use the generated URL
  if (page.breadcrumbs && page.breadcrumbs.length > 0) {
    // Get the last breadcrumb's URL (which already contains the full path including current page)
    const lastBreadcrumb = page.breadcrumbs[page.breadcrumbs.length - 1]
    if (lastBreadcrumb && lastBreadcrumb.url) {
      return lastBreadcrumb.url
    }
  }

  // For pages without breadcrumbs, return simple slug-based URL
  return `/${page.slug}`
}

/**
 * Build breadcrumbs for a nested page using the nestedDocs plugin's breadcrumbs data
 */
export function generatePageBreadcrumbs(
  page: Partial<Page> | null | undefined,
): Array<{ label: string; url: string }> {
  if (!page || !page.breadcrumbs || page.breadcrumbs.length === 0) {
    return []
  }

  return page.breadcrumbs.map((breadcrumb) => ({
    label: breadcrumb.label || 'Page',
    url: breadcrumb.url || '/',
  }))
}
