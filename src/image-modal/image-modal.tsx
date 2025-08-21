"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

interface ImageModalProps {
  isOpen: boolean
  imageSrc: string | null
  onClose: () => void
}

const isVideoFile = (src: string): boolean => {
  const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi"]
  return videoExtensions.some((ext) => src.toLowerCase().includes(ext.toLowerCase()))
}

export function ImageModal({ isOpen, imageSrc, onClose }: ImageModalProps) {
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

  if (!isOpen || !imageSrc) return null

  return (
    <div
      className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md"
      onClick={onClose}
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#00000094",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        objectFit: "cover",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative max-w-5xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
          {/* Close button */}
          <button onClick={onClose} className=" absolute -top-3 -right-4 z-[100000] p-1" aria-label="Close modal">
            <X className="w-6 h-6 text-red-500 hover:text-red-600" />
          </button>

          <div className="relative overflow-hidden rounded-lg shadow-2xl bg-white flex items-center justify-center">
            {isVideoFile(imageSrc) ? (
              <video
                src={imageSrc}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="max-w-[40vw] max-h-[85vh] object-contain"
                style={{ minHeight: "480px", minWidth: "600px", maxWidth: "400px", maxHeight: "400px" }}
                onError={(e) => {
                  console.log("[v0] Video failed to load in modal:", e.currentTarget.src)
                }}
              >
                <source src={imageSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={imageSrc || "/placeholder.svg"}
                alt="Building progress detail"
                className="max-w-[40vw] max-h-[85vh] object-contain"
                style={{ minHeight: "480px", minWidth: "600px", maxWidth: "400px", maxHeight: "400px" }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
