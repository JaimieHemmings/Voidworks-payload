import React from 'react'

const BgVideo = () => {
  return (
    <div className="w-screen h-screen absolute inset-0 pointer-events-none z-1">
      <video className="w-full h-full object-cover grayscale" autoPlay loop muted>
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  )
}

export default BgVideo
