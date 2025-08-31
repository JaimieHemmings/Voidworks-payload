import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '6',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="bg-black relative">
      <div className="absolute top-0 left-0 inset-0">
        <div className="container relative h-full w-[calc(100vw-2rem)]">
          <div className="absolute inset-0">
            {/* Left edge */}
            <div className="absolute left-0 top-0 w-px h-full bg-white/30"></div>
            {/* Quarter line (25%) */}
            <div className="max-md:hidden absolute left-1/4 top-0 w-px h-full bg-white/30"></div>
            {/* Center line (50%) */}
            <div className="max-md:hidden absolute left-1/2 top-0 w-px h-full bg-white/30"></div>
            {/* Three-quarter line (75%) */}
            <div className="max-md:hidden absolute left-3/4 top-0 w-px h-full bg-white/30"></div>
            {/* Right edge */}
            <div className="absolute right-0 top-0 w-px h-full bg-white/30"></div>
          </div>
        </div>
      </div>
      <div className="container py-16 bg-transparent">
        <div className={`grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16`}>
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const { enableLink, link, richText, size } = col

              if (size === 'full') {
                return (
                  <div className="col-span-6 lg:col-start-4 [&_strong]:text-white" key={index}>
                    <h2 className="text-white block text-2xl md:text-3xl my-4 font-bold">
                      {col.heading}
                    </h2>
                    <RichText
                      data={
                        richText ?? {
                          root: {
                            type: 'root',
                            children: [],
                            direction: null,
                            format: '',
                            indent: 0,
                            version: 1,
                          },
                        }
                      }
                      enableGutter={false}
                      className="text-white"
                    />
                  </div>
                )
              }

              return (
                <div
                  className={cn(
                    `col-span-4 lg:col-span-${colsSpanClasses[size as keyof typeof colsSpanClasses]}`,
                  )}
                  key={index}
                >
                  {richText && (
                    <RichText data={richText} enableGutter={false} className="text-white" />
                  )}

                  {enableLink && link && <CMSLink link={link} />}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
