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

      scrollerInner.innerHTML = ""

      // Create original items
      images.forEach((src, index) => {
        const itemDiv = document.createElement("div")

        if (isVideoFile(src)) {
          const video = document.createElement("video")
          video.src = src
          video.className = styles.clickableImage
          video.muted = true
          video.loop = true
          video.playsInline = true
          video.preload = "metadata"
          video.style.objectFit = "cover"
          video.style.backgroundColor = "#f3f4f6"

          video.addEventListener("mouseenter", () => {
            video.play().catch((err) => console.log("[v0] Video play failed:", err))
          })
          video.addEventListener("mouseleave", () => video.pause())

          if (onImageClick) {
            video.addEventListener("click", () => onImageClick(src))
          }

          itemDiv.appendChild(video)
        } else {
          const img = document.createElement("img")
          img.src = src || "/placeholder.svg"
          img.alt = `Building progress ${index + 1}`
          img.className = styles.clickableImage

          if (onImageClick) {
            img.addEventListener("click", () => onImageClick(src))
          }

          itemDiv.appendChild(img)
        }

        scrollerInner.appendChild(itemDiv)
      })

      const originalItems = Array.from(scrollerInner.children)
      originalItems.forEach((item) => {
        const duplicatedItem = item.cloneNode(true) as HTMLElement
        duplicatedItem.setAttribute("aria-hidden", "true")

        // Re-attach event listeners to cloned items
        const img = duplicatedItem.querySelector("img")
        const video = duplicatedItem.querySelector("video")
        if (img && onImageClick) {
          img.addEventListener("click", () => onImageClick(img.src))
        }
        if (video && onImageClick) {
          video.addEventListener("click", () => onImageClick(video.src))
          video.addEventListener("mouseenter", () => {
            video.play().catch((err) => console.log("[v0] Video play failed:", err))
          })
          video.addEventListener("mouseleave", () => video.pause())
        }

        scrollerInner.appendChild(duplicatedItem)
      })
    }
  }, [images, onImageClick]) // Added images to dependency array to ensure proper re-rendering

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

  return (
    <div ref={scrollerRef} className={`${styles.scroller} ${className}`} data-direction={direction} data-speed={speed}>
      <div className={styles.scrollerInner}></div>
    </div>
  )
}
