"use client"

import type React from "react"

import { useEffect } from "react"
import { X } from "lucide-react"

interface MediaModalProps {
  isOpen: boolean
  mediaSrc: string | null
  onClose: () => void
}

const isVideoFile = (src: string): boolean => {
  const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi"]
  return videoExtensions.some((ext) => src.toLowerCase().includes(ext.toLowerCase()))
}

export function MediaModal({ isOpen, mediaSrc, onClose }: MediaModalProps) {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.log("[v0] Video failed to load in modal:", e.currentTarget.src)
    const video = e.currentTarget
    video.style.display = "none"
    // Create a fallback message
    const fallback = document.createElement("div")
    fallback.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 400px; background: #f3f4f6; border-radius: 8px;">
        <p style="color: #6b7280; font-size: 18px; margin-bottom: 8px;">Video unavailable</p>
        <p style="color: #9ca3af; font-size: 14px;">The video could not be loaded</p>
      </div>
    `
    video.parentNode?.insertBefore(fallback, video)
  }

  const handleVideoCanPlay = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.log("[v0] Video can play in modal:", e.currentTarget.src)
  }

  if (!isOpen || !mediaSrc) return null

  const isVideo = isVideoFile(mediaSrc)

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div className="relative max-w-4xl max-h-[90vh] mx-4" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-[100000] bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        {/* Media container */}
        <div className="relative overflow-hidden rounded-lg shadow-2xl bg-white">
          {isVideo ? (
            <video
              src={mediaSrc}
              className="max-w-full max-h-[85vh] object-contain w-full"
              style={{ minHeight: "400px", backgroundColor: "#f3f4f6" }}
              controls
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onError={handleVideoError}
              onCanPlay={handleVideoCanPlay}
            >
              <source src={mediaSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={mediaSrc || "/placeholder.svg"}
              alt="Media detail"
              className="max-w-full max-h-[85vh] object-contain w-full"
              style={{ minHeight: "400px" }}
            />
          )}

          {/* Media overlay with gradient for better text readability */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <h3 className="text-white text-xl font-semibold mb-2">{isVideo ? "Video Preview" : "Image Preview"}</h3>
            <p className="text-white/90 text-sm">Click outside or press ESC to close</p>
          </div>
        </div>
      </div>
    </div>
  )
}
