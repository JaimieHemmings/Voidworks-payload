'use client'
import React, { useState } from 'react'
import { MdArrowOutward } from 'react-icons/md'

import type { Page } from '@/payload-types'

import Link from 'next/link'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const [scrollPercent, setScrollPercent] = useState(0)
  return (
    <div className="h-[90vh] md:h-[70vh] overflow-hidden relative z-10 grid grid-cols-1 md:grid-cols-2 container px-0">
      <div className="h-full flex flex-col justify-center items-center">
        <h1 className="text-white text-6xl font-bold mb-6 drop-shadow-lg">
          VoidWorks
          <span className="block text-2xl md:text-3xl my-4">
            Web Development Agency Cornwall - Custom Digital Solutions
          </span>
        </h1>
        <p className="text-white text-base md:text-lg mb-4 opacity-90">
          We create high-performance websites and web applications for Cornwall businesses using
          modern technologies. From concept to deployment, we deliver scalable digital solutions
          that drive real results.
        </p>
        <div className="w-full">
          <div className="w-full flex justify gap-0 mt-6">
            <Link
              href="/"
              className="group relative inline-block border-b-[1px] border-t-[1px] border-white/30 px-8 py-5 overflow-hidden bg-transparent hover:bg-white transition-colors duration-300 w-1/2"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-white text-sm text-center transition-all duration-300 group-hover:-translate-y-[200%] group-hover:text-black">
                <span>Start Your Project</span>
                <MdArrowOutward className="text-lg" />
              </span>
              <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm text-black translate-y-full group-hover:translate-y-0 transition-all duration-300">
                <span>Start Your Project</span>
                <MdArrowOutward className="text-lg" />
              </span>
            </Link>
          </div>
          <div className="w-full flex justify">
            <Link
              href="/"
              className="group relative inline-block border-b-[1px] border-t-[1px] border-white/30 px-8 py-5 overflow-hidden bg-transparent hover:bg-white transition-colors duration-300 w-1/2"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-white text-sm text-center transition-all duration-300 group-hover:-translate-y-[200%] group-hover:text-black">
                <span>Lean More</span>
                <MdArrowOutward className="text-lg" />
              </span>
              <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm text-black translate-y-full group-hover:translate-y-0 transition-all duration-300">
                <span>Learn More</span>
                <MdArrowOutward className="text-lg" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
