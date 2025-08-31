'use client'
import React, { useState } from 'react'
import { MdArrowOutward } from 'react-icons/md'

import type { Page } from '@/payload-types'

import Link from 'next/link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { generatePageUrl } from '@/utilities/generatePageUrl'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const [scrollPercent, setScrollPercent] = useState(0)
  console.log(links)
  return (
    <div className="relative w-full overflow-hidden">
      <div className="z-10 grid grid-cols-1 md:grid-cols-2 container px-0">
        <div className="h-full flex flex-col justify-center py-16">
          <div className="md:max-w-[70%]">
            <h1 className="text-white text-6xl font-bold mb-6 drop-shadow-lg">
              VoidWorks
              <span className="block text-2xl md:text-3xl my-4">
                Web Development Agency Cornwall - Custom Digital Solutions
              </span>
            </h1>
            {richText && (
              <RichText
                data={richText}
                className="text-white text-base md:text-lg mb-4 opacity-90 px-0"
              />
            )}
          </div>
          {links && links.length > 0 && (
            <div className="w-full flex flex-row md:flex-col mt-6 justify-start">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={generatePageUrl(
                    link.link?.reference?.relationTo === 'pages' &&
                      typeof link.link.reference.value !== 'number'
                      ? (link.link.reference.value as Page)
                      : undefined,
                  )}
                  className="group flex-1 relative inline-block border-b-[1px] border-t-[1px] border-white/30 px-8 py-5 overflow-hidden bg-transparent hover:bg-white transition-colors duration-300 max-md:border-r-[1px] border-white/30 md:w-1/2"
                >
                  <span className="relative z-10 flex items-center justify-between gap-2 text-white text-sm text-center transition-all duration-300 group-hover:-translate-y-[200%] group-hover:text-black">
                    <span>{link.link.label}</span>
                    <MdArrowOutward className="text-lg" />
                  </span>
                  <span className="absolute inset-0 flex items-center justify-between gap-2 text-sm text-black translate-y-full group-hover:translate-y-0 transition-all duration-300 px-9">
                    <span>{link.link.label}</span>
                    <MdArrowOutward className="text-lg" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="relative md:hidden">
          <div className="h-full flex flex-col justify-center relative overflow-hidden">
            <Media resource={media} className="my-auto w-full h-full object-cover" />
          </div>
        </div>
      </div>
      <div className="hidden md:block absolute top-0 md:w-[calc(50vw)] h-full left-1/2">
        <div className="h-full flex flex-col justify-center relative overflow-hidden">
          <Media
            resource={media}
            className="w-full h-full flex flex-col justify-center"
            pictureClassName="relative w-full h-full"
            imgClassName="w-full h-full object-cover object-left min-h-[400px]"
          />
        </div>
      </div>
    </div>
  )
}
