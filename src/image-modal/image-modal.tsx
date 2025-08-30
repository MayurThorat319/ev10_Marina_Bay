"use client"

import { useEffect, useRef } from "react"
import "./image-modal.css"
import VideoPlayer from "./videoplayer"

interface ImageModalProps {
  isOpen: boolean
  imageSrc: string | null
  onClose: () => void
}

const isVideoFile = (src: string): boolean => {
  const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi", ".m3u8"]
  return videoExtensions.some((ext) => src.toLowerCase().includes(ext.toLowerCase()))
}

export function ImageModal({ isOpen, imageSrc, onClose }: ImageModalProps) {
  const contentRef = useRef<HTMLDivElement>(null)

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
      className="modal-overlay fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      

      <div
        ref={contentRef}
        className="modal-content relative bg-gray-900 rounded-xl shadow-2xl overflow-hidden max-w-5xl w-full max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        
      >
        {/* Modal content */}
        <div className="h-full w-full flex items-center justify-center p-8">
          {isVideoFile(imageSrc) ? (
            <>
            <VideoPlayer imageSrc={imageSrc} />
          
            </>

          ) : (
            <img
              src={imageSrc || "/placeholder.svg"}
              alt="Building progress detail"
              className="max-w-full max-h-[50vh] object-contain rounded-lg"
              style={{ minHeight: "480px", minWidth: "600px", maxWidth: "400px", maxHeight: "400px" }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
