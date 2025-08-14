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
    <div className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md" onClick={onClose}
    style={{ position: "absolute", top: 0,bottom: 0, left:0,right:0, backgroundColor: "#00000094",display:"flex",justifyContent:"center",alignItems:"center", objectFit: "cover"}}
    >
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative max-w-5xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 z-[100000] bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          <div className="relative overflow-hidden rounded-lg shadow-2xl bg-white flex items-center justify-center">
            <img
              src={imageSrc || "/placeholder.svg"}
              alt="Building progress detail"
              className="max-w-[40vw] max-h-[85vh] object-contain"
              style={{ minHeight: "400px", minWidth: "600px",maxWidth:"400px",maxHeight: "400px" }}
            />

           
          </div>
        </div>
      </div>
    </div>
  )
}
