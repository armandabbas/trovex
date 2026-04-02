import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollSequenceProps {
  frameCount: number
  baseUrl: string
  triggerId: string
  dir?: string
  isIntro?: boolean
  onComplete?: () => void
}

export function ScrollSequence({ frameCount, baseUrl, triggerId, dir = '/src/assets/sequence', isIntro = false, onComplete }: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const currentFrame = useRef({ value: 0 })

  // 1. Preload Images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = []
    let imagesLoadedCount = 0

    const preloadImages = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image()
        const frameNum = i.toString().padStart(4, '0')
        img.src = `${dir}/${baseUrl}_${frameNum}.jpg`
        img.onload = () => {
          imagesLoadedCount++
          if (imagesLoadedCount === frameCount) {
             setImages(loadedImages)
             setIsLoaded(true)
             renderFrame(0, loadedImages) // Initial render
          }
        }
        loadedImages[i] = img
      }
    }

    preloadImages()
  }, [frameCount, baseUrl, dir])

  const renderFrame = (index: number, imgs: HTMLImageElement[]) => {
    const canvas = canvasRef.current
    if (!canvas || !imgs[index]) return
    const context = canvas.getContext('2d')
    if (!context) return

    const img = imgs[index]
    const ratio = Math.max(canvas.width / img.width, canvas.height / img.height)
    const centerShiftX = (canvas.width - img.width * ratio) / 2
    const centerShiftY = (canvas.height - img.height * ratio) / 2

    context.clearRect(0, 0, canvas.width, canvas.height)
    context.drawImage(
      img, 
      0, 0, img.width, img.height,
      centerShiftX, centerShiftY, img.width * ratio, img.height * ratio
    )
  }

  // 2. Setup Animation (Intro or Scroll)
  useEffect(() => {
    if (!isLoaded || images.length === 0) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      if (isIntro) {
        // Intro Mode: Auto-play frames
        tl.to(currentFrame.current, {
          value: frameCount - 1,
          duration: 4, // Slightly longer for a more cinematic, smooth flow
          ease: 'power3.inOut',
          onUpdate: () => {
             renderFrame(Math.round(currentFrame.current.value), images)
          },
          onComplete: () => {
             if (onComplete) onComplete()
          }
        })
      } else {
        // Scroll Mode: Link to ScrollTrigger
        tl.to(currentFrame.current, {
          value: frameCount - 1,
          snap: 'value',
          ease: 'none',
          scrollTrigger: {
            trigger: triggerId,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5, // Increased scrub for smoother "liquid" movement
          },
          onUpdate: () => {
            renderFrame(Math.round(currentFrame.current.value), images)
          },
        })
      }
    })

    const handleResize = () => {
      const canvas = canvasRef.current
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        renderFrame(Math.round(currentFrame.current.value), images)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      ctx.revert()
      window.removeEventListener('resize', handleResize)
    }
  }, [isLoaded, images, frameCount, triggerId])

  return (
    <canvas 
      ref={canvasRef}
      className={`fixed inset-0 z-0 h-screen w-screen pointer-events-none transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{ filter: 'brightness(0.5)' }}
    />
  )
}
