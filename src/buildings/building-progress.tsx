"use client"

import type React from "react"
import { useState, useEffect } from "react"
import "./building-progress.css"

const BuildingProgress: React.FC = () => {
  // Sample images - you can replace these with your actual building/construction images
  const images = [
    "/images/Marina_bay_garden.png",
    "/images/Meditation_center.png",
    "/images/rooftop_lounge.png",
    "/images/GYM.png",
    "/images/Barbeque_zone.png",
    "/images/Infinity_pool.png",
    "/images/Kids_play_area.png",
    "/images/floor_plan.png",
  ]

  // Define the container positions and their current image indices
  const [imagePositions, setImagePositions] = useState([0, 1, 2, 3, 4, 5])

  useEffect(() => {
    const interval = setInterval(() => {
      setImagePositions((prev) => {
        // Rotate images: each image moves to the next position
        const newPositions = [...prev]
        const lastImage = newPositions.pop()!
        newPositions.unshift(lastImage)
        return newPositions
      })
    }, 3000) // Change images every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="building-progress-container">
      <h1 className="title">Stay Updated On Your Building Progress</h1>

      <div className="gallery-grid">
        <div className="image-container small top-left">
          <img
            src={images[imagePositions[0]] || "/placeholder.svg"}
            alt="Building progress"
            className="gallery-image"
          />
        </div>

        <div className="image-container large center">
          <img
            src={images[imagePositions[1]] || "/placeholder.svg"}
            alt="Building progress"
            className="gallery-image"
          />
        </div>

        <div className="image-container medium top-right">
          <img
            src={images[imagePositions[2]] || "/placeholder.svg"}
            alt="Building progress"
            className="gallery-image"
          />
        </div>

        <div className="image-container medium bottom-left">
          <img
            src={images[imagePositions[3]] || "/placeholder.svg"}
            alt="Building progress"
            className="gallery-image"
          />
        </div>

        <div className="image-container medium bottom-center">
          <img
            src={images[imagePositions[4]] || "/placeholder.svg"}
            alt="Building progress"
            className="gallery-image"
          />
        </div>

        <div className="image-container partial bottom-right">
          <img
            src={images[imagePositions[5]] || "/placeholder.svg"}
            alt="Building progress"
            className="gallery-image"
          />
        </div>
      </div>
    </div>
  )
}

export default BuildingProgress
