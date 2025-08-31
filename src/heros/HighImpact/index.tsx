'use client'
import React, { useState } from 'react'

// Update the import path to the correct relative location, for example:
import type { Page } from '@/payload-types'

import Parallax from './Parallax'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const [scrollPercent, setScrollPercent] = useState(0)
  return (
    <div className="h-[70vh] overflow-hidden bg-black relative z-10">
      <Parallax
        className="parallax-bg"
        waveSize={300}
        pointSpacing={5}
        onScroll={setScrollPercent}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-2xl px-6">
        <h1 className="text-white text-5xl font-bold text-center mb-6 drop-shadow-lg">
          VoidWorks{' '}
          <span className="block">Web Development Agency Cornwall | Custom Digital Solutions</span>
        </h1>
        <p className="text-white text-lg text-center mb-4 opacity-90">
          We create high-performance websites and web applications for Cornwall businesses using
          modern technologies. From concept to deployment, we deliver scalable digital solutions
          that drive real results.
        </p>
        <p className="text-white text-xl text-center font-semibold mt-6">
          Start Your Project With VoidWorks
        </p>
      </div>
    </div>
  )
}
