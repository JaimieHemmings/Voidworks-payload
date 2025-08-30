# Parallax Wave Component

A React component that creates an animated 3D wave effect using Three.js, perfect for hero sections and background animations.

## Features

- 3D animated wave effect with particles and wireframe
- Scroll-based camera movement
- Mouse interaction
- Customizable wave parameters
- TypeScript support
- SSR-safe (dynamic Three.js loading)
- Proper cleanup and memory management

## Installation

The component requires Three.js as a dependency:

```bash
pnpm add three @types/three
```

## Usage

### Basic Usage

```tsx
import { Parallax } from '@/heros/HighImpact'

export const MyComponent = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Parallax />
      
      {/* Your content here */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h1>Your Content</h1>
      </div>
    </div>
  )
}
```

**Important**: The Parallax component needs a positioned parent container (relative, absolute, or fixed) to define its boundaries.

### Advanced Usage

```tsx
import { Parallax } from '@/heros/HighImpact'
import { useState } from 'react'

export const MyHeroComponent = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Parallax 
        waveSize={400}              // Wave grid size (default: 300)
        pointSpacing={4}            // Space between points (default: 5)
        scrollIntensity={3}         // Camera movement intensity (default: 5)
        scrollDistance={1.5}        // Scroll distance multiplier (default: 1)
        className="my-parallax"     // Custom CSS class
        onScroll={setScrollProgress} // Scroll callback
      />
      
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h1>Hero Title</h1>
        <p>Scroll Progress: {Math.round(scrollProgress * 100)}%</p>
      </div>
    </div>
  )
}
```

### Using the Example Component

```tsx
import { ParallaxExample } from '@/heros/HighImpact'

export const MyPage = () => {
  return <ParallaxExample />
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Optional CSS class name |
| `waveSize` | `number` | `300` | Size of the wave grid |
| `pointSpacing` | `number` | `5` | Spacing between wave points |
| `scrollIntensity` | `number` | `5` | How much the camera moves (lower = more subtle) |
| `scrollDistance` | `number` | `1` | Scroll distance multiplier (1 = 1 viewport height) |
| `onScroll` | `(scrollPercent: number) => void` | `undefined` | Callback fired on scroll with progress (0-1) |

## Hero Component Recommendations

For hero sections, use these settings for optimal effect:

```tsx
<Parallax 
  scrollIntensity={3}    // Subtle movement
  scrollDistance={1.5}   // Effect over 1.5 viewport heights
/>
```

## Styling

The Parallax component is positioned absolutely within its parent container. Make sure to:

1. **Set a positioned parent**: Use `position: relative`, `absolute`, or `fixed` on the parent
2. **Define container dimensions**: Set explicit width and height on the parent container
3. **Layer your content**: Use `z-index` to layer content above the parallax background

```css
.hero-container {
  position: relative;
  width: 100%;
  height: 100vh; /* or any desired height */
  overflow: hidden; /* optional: hide any overflow */
}

.content {
  position: relative;
  z-index: 2;
}
```

## Performance Notes

- The component uses dynamic imports to avoid SSR issues
- Proper cleanup is handled in the useEffect cleanup function
- The canvas is properly disposed when the component unmounts
- Uses requestAnimationFrame for smooth animations

## Browser Support

- Modern browsers that support WebGL
- Three.js compatible environments
- No IE support (uses ES6+ features)

## License

MIT
