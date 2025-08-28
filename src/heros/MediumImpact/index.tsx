import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ title, links, media, richText }) => {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center">
      {/* Background Media */}
      {media && typeof media === 'object' && (
        <Media
          className="absolute inset-0 w-full h-full"
          imgClassName="object-cover w-full h-full"
          priority
          resource={media}
        />
      )}
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      {/* Content */}
      <div className="container relative z-10 flex flex-col items-center justify-center py-12 px-4 text-center">
        {title && <h1>{title}</h1>}
        {richText && (
          <RichText
            className="mb-6 text-white text-lg md:text-2xl font-semibold drop-shadow-lg"
            data={richText}
            enableGutter={false}
          />
        )}
        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-4 mt-4">
            {links.map(({ link }, i) => (
              <li key={i}>
                <CMSLink
                  link={{
                    ...link,
                    className:
                      'inline-block bg-white/90 text-black font-medium px-5 py-2 rounded-lg shadow hover:bg-blue-600 hover:text-white transition-colors duration-200',
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
