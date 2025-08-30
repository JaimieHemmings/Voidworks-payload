'use client'
import React, { useState } from 'react'

// Update the import path to the correct relative location, for example:
import type { Page } from '../../payload-types.ts'
// Or, if you want to use the alias '@', ensure your tsconfig.json has:
//
// "compilerOptions": {
//   "baseUrl": "./src",
//   "paths": {
//     "@/*": ["*"]
//   }
// }

import Parallax from './Parallax'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const [scrollPercent, setScrollPercent] = useState(0)
  return (
    <div className="h-[70vh] overflow-hidden bg-black relative">
      <Parallax
        className="parallax-bg"
        waveSize={300}
        pointSpacing={5}
        onScroll={setScrollPercent}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-2xl px-6">
        <h1 className="text-white text-5xl font-bold text-center mb-6 drop-shadow-lg">
          VoidWorks | Professional Web Development & Digital Solutions Agency
        </h1>
        <p className="text-white text-lg text-center mb-4 opacity-90">
          Crafting high-performance websites and web applications that elevate your business. From
          sleek corporate sites to complex custom platforms, VoidWorks delivers cutting-edge
          solutions that drive growth and engagement.
        </p>
        <p className="text-white text-sm text-center mb-4 opacity-80 font-semibold">
          Specializing in modern web technologies including React, Node.js, and cloud deployment.
          Trusted by businesses to transform ideas into powerful digital experiences that perform at
          scale.
        </p>
        <p className="text-white text-xl text-center font-semibold mt-6">
          Start Your Project With VoidWorks
        </p>
      </div>
    </div>
  )
}
