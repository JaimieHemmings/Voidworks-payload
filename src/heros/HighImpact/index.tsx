'use client'
import React, { useState } from 'react'

// Update the import path to the correct relative location, for example:
import type { Page } from '@/payload-types'

import Parallax from './Parallax'
import Link from 'next/link'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const [scrollPercent, setScrollPercent] = useState(0)
  return (
    <div className="h-[90vh] md:h-[70vh] overflow-hidden bg-black relative z-10">
      <Parallax
        className="parallax-bg"
        waveSize={300}
        pointSpacing={5}
        onScroll={setScrollPercent}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-2xl px-6">
        <h1 className="text-white text-4xl font-bold text-center mb-6 drop-shadow-lg">
          VoidWorks{' '}
          <span className="block text-2xl md:text-3xl">
            Web Development Agency Cornwall | Custom Digital Solutions
          </span>
        </h1>
        <p className="text-white text-base md:text-lg text-center mb-4 opacity-90">
          We create high-performance websites and web applications for Cornwall businesses using
          modern technologies. From concept to deployment, we deliver scalable digital solutions
          that drive real results.
        </p>
        <div className="w-full flex justify-center mt-6">
          <Link
            href="/"
            className="group relative inline-block border-2 border-white px-8 py-3 overflow-hidden bg-transparent hover:bg-white transition-colors duration-300"
          >
            <span className="relative z-10 block text-white text-xl font-semibold text-center transition-all duration-300 group-hover:-translate-y-[150%] group-hover:text-black">
              Start Your Project
            </span>
            <span className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-black translate-y-full group-hover:translate-y-0 transition-all duration-300">
              Start Your Project
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
