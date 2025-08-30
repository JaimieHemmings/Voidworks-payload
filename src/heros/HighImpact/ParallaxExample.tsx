import React, { useState } from 'react'
import { Parallax } from './Parallax'

export const ParallaxExample: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      {/* Parallax background - now configured for hero use */}
      <Parallax
        className="parallax-bg"
        waveSize={300}
        pointSpacing={5}
        scrollIntensity={3} // Subtle movement
        scrollDistance={1.5} // Effect lasts for 1.5 viewport heights
        onScroll={setScrollPercent}
      />

      {/* Hero Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '200vh', // Less content for hero demo
          background: 'transparent',
        }}
      >
        {/* Hero Section */}
        <section
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            textAlign: 'center',
            padding: '0 2rem',
          }}
        >
          <h1
            style={{
              fontSize: '4rem',
              fontWeight: 'bold',
              textShadow: '0 0 20px rgba(255,255,255,0.5)',
              letterSpacing: '3px',
              margin: '0 0 1rem 0',
              background: 'linear-gradient(45deg, #fff, #a0a0ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Hero Title
          </h1>
          <p
            style={{
              fontSize: '1.5rem',
              opacity: 0.9,
              maxWidth: '600px',
              lineHeight: '1.6',
              margin: '0 0 2rem 0',
            }}
          >
            This is a hero section with a subtle parallax effect that responds to scroll
          </p>
          <div
            style={{
              fontSize: '1rem',
              opacity: 0.7,
              padding: '0.5rem 1rem',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '20px',
            }}
          >
            Scroll Progress: {Math.round(scrollPercent * 100)}%
          </div>
        </section>

        {/* Content Section */}
        <section
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            background: 'rgba(0,0,0,0.5)',
            fontSize: '2rem',
            fontWeight: 'bold',
            textShadow: '0 0 10px rgba(255,255,255,0.5)',
            letterSpacing: '2px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h2>Content Section</h2>
            <p style={{ fontSize: '1rem', marginTop: '20px', opacity: 0.8 }}>
              The parallax effect is subtle and perfect for hero sections
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ParallaxExample
