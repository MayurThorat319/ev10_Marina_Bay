"use client"

import type React from "react"
import { useState } from "react"
import "./building-progress.css"
import { ImageSlider } from "../image-slider/image-slider"
import { ImageModal } from "../../image-modal/image-modal"

const BuildingProgress: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const images = [
    "/images/mb_vid_ind_1.mp4",
    "/images/mb_normal_1.jpg",
    "/images/mb_vid_normal_1.mp4",
    "/images/mb_ind_1.jpg",
    "/images/mb_normal_2.jpg",
  ]

    const images1 = [
    "/images/mb_vid_normal_2.mp4",
    "/images/mb_ind_2.jpg",
    "/images/mb_normal_3.jpg",
    "/images/mb_vid_ind_2.mp4",
    "/images/mb_normal_4.jpg",
  ]


    const handleImageClick = (imageSrc: string) => {
    console.log("[v0] Media clicked:", imageSrc) // Added debug logging
    const isVideo = imageSrc.toLowerCase().includes(".mp4") // Added video detection logging
    console.log("[v0] Is video file:", isVideo)
    setSelectedImage(imageSrc)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
  }

  return (
    <div className="wrapper">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex flex-col items-center justify-center gap-8 p-8">
       

        <div className="w-full max-w-6xl bg-black/20 backdrop-blur-sm rounded-lg p-6 space-y-6">
          {/* Left scrolling slider */}
          <div className="w-full">
            <ImageSlider images={images} direction="left" speed="slow" onImageClick={handleImageClick} />
          </div>

          {/* Right scrolling slider */}
          <div className="w-full">
            <ImageSlider images={images1} direction="right" speed="slow" onImageClick={handleImageClick} />
          </div>
        </div>

       
      </div>

      {/* Modal */}
      {isModalOpen && <ImageModal isOpen={isModalOpen} imageSrc={selectedImage} onClose={handleCloseModal} />}
    </div>
  )
}

export default BuildingProgress
