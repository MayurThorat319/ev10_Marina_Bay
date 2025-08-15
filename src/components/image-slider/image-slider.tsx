"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import styles from "./image-slider.module.css"

interface ImageSliderProps {
  images: string[]
  direction?: "left" | "right"
  speed?: "slow" | "fast"
  className?: string
  onImageClick?: (imageSrc: string) => void
}

const isVideoFile = (src: string): boolean => {
  const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi"]
  return videoExtensions.some((ext) => src.toLowerCase().includes(ext.toLowerCase()))
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
        const img = duplicatedItem.querySelector("img")
        const video = duplicatedItem.querySelector("video")
        if (img && onImageClick) {
          img.addEventListener("click", () => onImageClick(img.src))
        }
        if (video && onImageClick) {
          video.addEventListener("click", () => onImageClick(video.src))
        }
        scrollerInner.appendChild(duplicatedItem)
      })
    }
  }, [images, onImageClick])

  const handleMediaClick = (mediaSrc: string) => {
    if (onImageClick) {
      onImageClick(mediaSrc)
    }
  }

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.log("[v0] Video failed to load:", e.currentTarget.src)
    const video = e.currentTarget
    video.style.display = "none"
    // Create a fallback image element
    const fallback = document.createElement("img")
    fallback.src = "/placeholder.svg?height=200&width=300"
    fallback.className = styles.clickableImage
    fallback.alt = "Video unavailable"
    fallback.onclick = () => handleMediaClick(video.src)
    video.parentNode?.insertBefore(fallback, video)
  }

  const handleVideoCanPlay = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.log("[v0] Video can play:", e.currentTarget.src)
  }

  const handleVideoLoad = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.log("[v0] Video loaded successfully:", e.currentTarget.src)
  }

  return (
    <div ref={scrollerRef} className={`${styles.scroller} ${className}`} data-direction={direction} data-speed={speed}>
      <div className={styles.scrollerInner}>
        {images.map((src, index) =>
          isVideoFile(src) ? (
            <video
              key={index}
              src={src}
              onClick={() => handleMediaClick(src)}
              className={styles.clickableImage}
              muted
              loop
              playsInline
              preload="metadata"
              onMouseEnter={(e) => {
                const video = e.currentTarget
                video.play().catch((err) => console.log("[v0] Video play failed:", err))
              }}
              onMouseLeave={(e) => e.currentTarget.pause()}
              onError={handleVideoError}
              onCanPlay={handleVideoCanPlay}
              onLoadedData={handleVideoLoad}
              style={{ objectFit: "cover", backgroundColor: "#f3f4f6" }}
            >
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              key={index}
              src={src || "/placeholder.svg"}
              alt={`Building progress ${index + 1}`}
              onClick={() => handleMediaClick(src)}
              className={styles.clickableImage}
            />
          ),
        )}
      </div>
    </div>
  )
}
