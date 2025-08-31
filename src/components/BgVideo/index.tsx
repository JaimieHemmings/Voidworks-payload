import React from 'react'

const BgVideo = () => {
  return (
    <div className="w-screen h-screen fixed inset-0 pointer-events-none z-1">
      <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
        <source src="/glass-animation-5.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '10px 10px',
        }}
      ></div>
      {/* Vertical white lines */}
      <div className="fixed top-0 left-0 inset-0">
        <div className="container relative h-full">
          <div className="absolute inset-0">
            {/* Left edge */}
            <div className="absolute left-0 top-0 w-px h-full bg-white/30"></div>
            {/* Quarter line (25%) */}
            <div className="absolute left-1/4 top-0 w-px h-full bg-white/30"></div>
            {/* Center line (50%) */}
            <div className="absolute left-1/2 top-0 w-px h-full bg-white/30"></div>
            {/* Three-quarter line (75%) */}
            <div className="absolute left-3/4 top-0 w-px h-full bg-white/30"></div>
            {/* Right edge */}
            <div className="absolute right-0 top-0 w-px h-full bg-white/30"></div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
    </div>
  )
}

export default BgVideo
