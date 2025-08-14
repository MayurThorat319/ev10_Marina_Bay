"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

interface ImageModalProps {
  isOpen: boolean
  imageSrc: string | null
  onClose: () => void
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

        {/* Image */}
        <div className="relative overflow-hidden rounded-lg shadow-2xl bg-white">
          <img
            src={imageSrc || "/placeholder.svg"}
            alt="Building progress detail"
            className="max-w-full max-h-[85vh] object-contain w-full"
            style={{ minHeight: "400px" }}
          />

          {/* Image overlay with gradient for better text readability */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <h3 className="text-white text-xl font-semibold mb-2">Building Progress Update</h3>
            <p className="text-white/90 text-sm">Click outside or press ESC to close</p>
          </div>
        </div>
      </div>
    </div>
  )
}
