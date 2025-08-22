"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import styles from "./building-slider.module.css"

interface BuildingSliderProps {
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

export function BuildingSlider({
  images,
  direction = "left",
  speed = "slow",
  className = "",
  onImageClick,
}: BuildingSliderProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const hasInitialized = useRef(false)

  // Intersection Observer to detect when slider is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.5 }
    )

    if (scrollerRef.current) {
      observer.observe(scrollerRef.current)
    }

    return () => {
      if (scrollerRef.current) {
        observer.unobserve(scrollerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller || hasInitialized.current) return

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!prefersReducedMotion) {
      // Add animation attribute
      scroller.setAttribute("data-animated", "true")

      // Get the inner container
      const scrollerInner = scroller.querySelector(`.${styles.scrollerInner}`) as HTMLElement
      if (!scrollerInner) return

      // Create a function to generate items
      const createItem = (src: string, index: number, isClone = false) => {
        const itemDiv = document.createElement("div")
        itemDiv.className = styles.itemContainer

        if (isVideoFile(src)) {
          // Create container for video with play button overlay
          const videoContainer = document.createElement("div")
          videoContainer.className = styles.videoContainer
          
          const video = document.createElement("video")
          video.src = src
          video.className = styles.clickableImage
          video.muted = true
          video.loop = true
          video.playsInline = true
          video.preload = "metadata"
          video.style.objectFit = "cover"
          video.style.backgroundColor = "#f3f4f6"

          // Add play button overlay
          const playButton = document.createElement("div")
          playButton.className = styles.playButton
          playButton.innerHTML = `
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11" fill="white" fill-opacity="0.6"/>
              <path d="M9 7L17 12L9 17V7Z" fill="black"/>
            </svg>
          `

          videoContainer.appendChild(video)
          videoContainer.appendChild(playButton)

          // Play video on hover only when in view
          videoContainer.addEventListener("mouseenter", () => {
            if (isInView) {
              video.play().catch((err) => console.log("[v0] Video play failed:", err))
            }
          })
          
          videoContainer.addEventListener("mouseleave", () => {
            video.pause()
            video.currentTime = 0
          })

          if (onImageClick) {
            videoContainer.addEventListener("click", () => onImageClick(src))
            playButton.addEventListener("click", (e) => {
              e.stopPropagation()
              onImageClick(src)
            })
          }

          itemDiv.appendChild(videoContainer)
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

        return itemDiv
      }

      // Create original items
      images.forEach((src, index) => {
        scrollerInner.appendChild(createItem(src, index))
      })

      // Create duplicated items for seamless scrolling
      images.forEach((src, index) => {
        const duplicatedItem = createItem(src, index, true)
        duplicatedItem.setAttribute("aria-hidden", "true")
        scrollerInner.appendChild(duplicatedItem)
      })
      
      hasInitialized.current = true
    }
  }, [images, onImageClick, isInView]) // Added isInView to dependency array

  return (
    <div ref={scrollerRef} className={`${styles.scroller} ${className}`} data-direction={direction} data-speed={speed}>
      <div className={styles.scrollerInner}></div>
    </div>
  )
}