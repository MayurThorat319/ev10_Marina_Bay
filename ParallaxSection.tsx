"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"

interface ParallaxSectionProps {
  children: ReactNode
  backgroundImage?: string
  strength?: number
  className?: string
  style?: React.CSSProperties
}

export default function ParallaxSection({
  children,
  backgroundImage,
  strength = 0.5,
  className = "",
  style = {},
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (!backgroundImage) return

    const handleScroll = () => {
      if (ref.current) {
        const elementTop = ref.current.getBoundingClientRect().top
        const elementHeight = ref.current.offsetHeight
        const scrollY = window.scrollY
        
        // Calculate parallax effect
        if (elementTop < window.innerHeight && elementTop > -elementHeight) {
          setOffset(scrollY * strength)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [backgroundImage, strength])

  return (
    <div
      ref={ref}
      className={`parallax-section ${className}`}
      style={{
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {backgroundImage && (
        <div
          className="parallax-background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transform: `translateY(${offset}px)`,
            willChange: "transform",
            zIndex: -1,
          }}
        />
      )}
      <div className="parallax-content" style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}