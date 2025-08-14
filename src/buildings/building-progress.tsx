"use client"

import type React from "react"
import "./building-progress.css"
import { ImageSlider } from "../image-slider/image-slider"

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

  const sampleImages = [
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
  //  const [imagePositions, setImagePositions] = useState([0, 1, 2, 3, 4, 5])
  // const [animationClasses, setAnimationClasses] = useState(Array(6).fill(""))

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setAnimationClasses(Array(6).fill("swipe-out"))

  //     setTimeout(() => {
  //       setImagePositions((prev) => {
  //         // Rotate images: each image moves to the next position
  //         const newPositions = [...prev]
  //         const lastImage = newPositions.pop()!
  //         newPositions.unshift(lastImage)
  //         return newPositions
  //       })

  //       setAnimationClasses(Array(6).fill("swipe-in"))

  //       setTimeout(() => {
  //         setAnimationClasses(Array(6).fill(""))
  //       }, 1500)
  //     }, 750) // Half of the animation duration
  //   }, 5000) // Increased interval to 5 seconds for slower transitions

  //   return () => clearInterval(interval)
  // }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-8 p-8">
      <div className="w-full max-w-4xl bg-black/20 backdrop-blur-sm rounded-lg p-6 space-y-6">
        {/* Left scrolling slider */}
        <div className="w-full">
          {/* <h2 className="text-xl font-semibold mb-4">Scrolling Left (Slow)</h2> */}
          <ImageSlider images={sampleImages} direction="left" speed="slow" />
        </div>

        {/* Right scrolling slider */}
        <div className="w-full">
          {/* <h2 className="text-xl font-semibold mb-4">Scrolling Right (Fast)</h2> */}
          <ImageSlider images={sampleImages} direction="right" speed="slow" />
        </div>
      </div>
    </div>
  )

  // return (
  //   <div className="building-progress-container">
  //     <h1 className="title">Stay Updated On Your Building Progress</h1>

  //     <div className="gallery-grid">
  //       <div className="image-container small top-left">
  //         <img
  //           src={images[imagePositions[0]] || "/placeholder.svg"}
  //           alt="Building progress"
  //           className={`gallery-image ${animationClasses[0]}`}
  //         />
  //       </div>

  //       <div className="image-container large center">
  //         <img
  //           src={images[imagePositions[1]] || "/placeholder.svg"}
  //           alt="Building progress"
  //           className={`gallery-image ${animationClasses[1]}`}
  //         />
  //       </div>

  //       <div className="image-container medium top-right">
  //         <img
  //           src={images[imagePositions[2]] || "/placeholder.svg"}
  //           alt="Building progress"
  //           className={`gallery-image ${animationClasses[2]}`}
  //         />
  //       </div>

  //       <div className="image-container medium bottom-left">
  //         <img
  //           src={images[imagePositions[3]] || "/placeholder.svg"}
  //           alt="Building progress"
  //           className={`gallery-image ${animationClasses[3]}`}
  //         />
  //       </div>

  //       <div className="image-container medium bottom-center">
  //         <img
  //           src={images[imagePositions[4]] || "/placeholder.svg"}
  //           alt="Building progress"
  //           className={`gallery-image ${animationClasses[4]}`}
  //         />
  //       </div>

  //       <div className="image-container partial bottom-right">
  //         <img
  //           src={images[imagePositions[5]] || "/placeholder.svg"}
  //           alt="Building progress"
  //           className={`gallery-image ${animationClasses[5]}`}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // )
}

export default BuildingProgress
