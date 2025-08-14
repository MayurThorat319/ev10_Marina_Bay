"use client"

import { useEffect, useRef } from "react"
import styles from "./image-slider.module.css"

interface ImageSliderProps {
  images: string[]
  direction?: "left" | "right"
  speed?: "slow" | "fast"
  className?: string
  onImageClick?: (imageSrc: string) => void
}

export function ImageSlider({
  images,
  direction = "left",
  speed = "slow",
  className = "",
  onImageClick,
}: ImageSliderProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!prefersReducedMotion) {
      // Add animation attribute
      scroller.setAttribute("data-animated", "true")

      // Get the inner container
      const scrollerInner = scroller.querySelector(`.${styles.scrollerInner}`) as HTMLElement
      if (!scrollerInner) return

      const existingItems = Array.from(scrollerInner.children)
      const originalItemCount = images.length

      // Remove any duplicated items from previous renders
      while (scrollerInner.children.length > originalItemCount) {
        scrollerInner.removeChild(scrollerInner.lastChild!)
      }

      // Get the current original children
      const scrollerContent = Array.from(scrollerInner.children)

      // Clone each item for infinite scroll effect
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true) as HTMLElement
        duplicatedItem.setAttribute("aria-hidden", "true")
        // Add click handler to cloned items as well
        const img = duplicatedItem.querySelector("img")
        if (img && onImageClick) {
          img.addEventListener("click", () => onImageClick(img.src))
        }
        scrollerInner.appendChild(duplicatedItem)
      })
    }
  }, [images, onImageClick])

  const handleImageClick = (imageSrc: string) => {
    if (onImageClick) {
      onImageClick(imageSrc)
    }
  }

  return (
    <div ref={scrollerRef} className={`${styles.scroller} ${className}`} data-direction={direction} data-speed={speed}>
      <div className={styles.scrollerInner}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src || "/placeholder.svg"}
            alt={`Building progress ${index + 1}`}
            onClick={() => handleImageClick(src)}
            className={styles.clickableImage}
          />
        ))}
      </div>
    </div>
  )
}
