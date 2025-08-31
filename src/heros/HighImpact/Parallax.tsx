'use client'

import React, { useEffect, useRef } from 'react'

// Dynamic import for Three.js to avoid SSR issues
let THREE: any = null

export interface ParallaxProps {
  className?: string
  waveSize?: number
  pointSpacing?: number
  scrollIntensity?: number // How much the camera moves (default: 5)
  scrollDistance?: number // How much scroll distance to cover (default: 1 viewport height)
  onScroll?: (scrollPercent: number) => void
}

export const Parallax: React.FC<ParallaxProps> = ({
  className,
  waveSize = 300,
  pointSpacing = 5,
  scrollIntensity = 30,
  scrollDistance = 1,
  onScroll,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<any>(null)
  const rendererRef = useRef<any>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    // Dynamic import of Three.js to avoid SSR issues
    const loadThree = async () => {
      if (typeof window === 'undefined') return

      const ThreeModule = await import('three')
      THREE = ThreeModule

      if (!containerRef.current) return

      // Get container dimensions
      const containerRect = containerRef.current.getBoundingClientRect()
      const containerWidth = containerRect.width || window.innerWidth
      const containerHeight = containerRect.height || window.innerHeight

      // Scene setup
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000)

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      })
      renderer.setSize(containerWidth, containerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      containerRef.current.appendChild(renderer.domElement)

      sceneRef.current = scene
      rendererRef.current = renderer

      // Wave parameters
      const pointCount = Math.floor(waveSize / pointSpacing)
      const totalPoints = pointCount * pointCount

      // Create points geometry
      const pointsGeometry = new THREE.BufferGeometry()
      const positions = new Float32Array(totalPoints * 3)
      const colors = new Float32Array(totalPoints * 3)

      // Fill positions and colors with improved gradient
      let index = 0
      for (let i = 0; i < pointCount; i++) {
        for (let j = 0; j < pointCount; j++) {
          const x = (i - pointCount / 2) * pointSpacing
          const z = (j - pointCount / 2) * pointSpacing

          positions[index * 3] = x
          positions[index * 3 + 1] = 0
          positions[index * 3 + 2] = z

          // Enhanced color gradient
          const distance = Math.sqrt(x * x + z * z) / (waveSize / 2)
          const intensity = 1 - Math.min(distance, 1) * 0.8

          // Add subtle blue tint
          colors[index * 3] = intensity * 0.8 // R
          colors[index * 3 + 1] = intensity * 0.9 // G
          colors[index * 3 + 2] = intensity // B

          index++
        }
      }

      pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      pointsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

      // Enhanced points material
      const pointsMaterial = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        alphaTest: 0.1,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
      })

      const wavePoints = new THREE.Points(pointsGeometry, pointsMaterial)
      scene.add(wavePoints)

      // Create lines geometry with improved appearance
      const linesGeometry = new THREE.BufferGeometry()
      const lineIndices: number[] = []

      // Create faces for the mesh
      const faces: number[] = []
      for (let i = 0; i < pointCount - 1; i++) {
        for (let j = 0; j < pointCount - 1; j++) {
          const currentIndex = i * pointCount + j

          // Create two triangles for each square
          faces.push(
            currentIndex,
            currentIndex + 1,
            currentIndex + pointCount,
            currentIndex + 1,
            currentIndex + pointCount + 1,
            currentIndex + pointCount,
          )

          // Add lines
          if (j < pointCount - 1) {
            lineIndices.push(currentIndex, currentIndex + 1)
          }
          if (i < pointCount - 1) {
            lineIndices.push(currentIndex, currentIndex + pointCount)
          }
        }
      }

      linesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      linesGeometry.setIndex(lineIndices)

      // Enhanced line material
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x888888,
        transparent: true,
        opacity: 0.6,
      })

      const linesMesh = new THREE.LineSegments(linesGeometry, lineMaterial)
      scene.add(linesMesh)

      // Create mesh for filled squares
      const meshGeometry = new THREE.BufferGeometry()
      meshGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      meshGeometry.setIndex(faces)

      // Create mesh material
      const meshMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        wireframe: false,
      })

      const filledMesh = new THREE.Mesh(meshGeometry, meshMaterial)
      scene.add(filledMesh)

      // Camera setup
      camera.position.set(0, 10, 33)
      camera.lookAt(0, 0, 0)

      // Mouse interaction
      const mouse = new THREE.Vector2()

      const handleMouseMove = (event: MouseEvent) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      }

      window.addEventListener('mousemove', handleMouseMove)

      // Animation
      const clock = new THREE.Clock()

      const animate = () => {
        animationRef.current = requestAnimationFrame(animate)

        const time = clock.getElapsedTime()
        const positions = pointsGeometry.attributes.position.array as Float32Array

        // Enhanced wave animation
        for (let i = 0; i < pointCount; i++) {
          for (let j = 0; j < pointCount; j++) {
            const index = (i * pointCount + j) * 3
            const x = positions[index]
            const z = positions[index + 2]

            // Multiple wave frequencies
            const wave1 = Math.sin(x * 0.1 + time) * 2
            const wave2 = Math.cos(z * 0.1 + time * 0.8) * 2
            const wave3 = Math.sin(x * 0.05 + z * 0.05 + time * 1.2) * 1.5

            positions[index + 1] = wave1 + wave2 + wave3
          }
        }

        pointsGeometry.attributes.position.needsUpdate = true
        linesGeometry.attributes.position.needsUpdate = true
        meshGeometry.attributes.position.needsUpdate = true

        renderer.render(scene, camera)
      }

      // Handle window resize
      const handleResize = () => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const newWidth = rect.width || window.innerWidth
        const newHeight = rect.height || window.innerHeight

        camera.aspect = newWidth / newHeight
        camera.updateProjectionMatrix()
        renderer.setSize(newWidth, newHeight)
      }

      window.addEventListener('resize', handleResize)

      // Add ResizeObserver to handle container resizing
      let resizeObserver: ResizeObserver | null = null
      if (window.ResizeObserver) {
        resizeObserver = new ResizeObserver(() => {
          handleResize()
        })
        resizeObserver.observe(containerRef.current)
      }

      // Enhanced scroll effect for hero component
      const handleScroll = () => {
        const scrollY = window.scrollY || window.pageYOffset
        const clientHeight = window.innerHeight

        // For hero component, use configurable scroll distance
        const maxScrollDistance = clientHeight * scrollDistance
        const scrolledPercent = Math.min(scrollY / maxScrollDistance, 1) // Clamp to 1

        // Configurable camera movement intensity
        const cameraY = 10 - scrollIntensity * scrolledPercent
        camera.position.set(0, cameraY, 33)

        // Call optional onScroll callback
        onScroll?.(scrolledPercent)
      }

      window.addEventListener('scroll', handleScroll)

      animate()

      // Cleanup function
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('scroll', handleScroll)

        if (resizeObserver) {
          resizeObserver.disconnect()
        }

        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }

        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement)
        }

        renderer.dispose()
        pointsGeometry.dispose()
        pointsMaterial.dispose()
        linesGeometry.dispose()
        lineMaterial.dispose()
        meshGeometry.dispose()
        meshMaterial.dispose()
      }
    }

    loadThree()
  }, [waveSize, pointSpacing, scrollIntensity, scrollDistance, onScroll])

  return (
    <div
      ref={containerRef}
      className={`${className} z-10`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  )
}

export default Parallax
