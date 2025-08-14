// "use client"

// import type React from "react"
// import { useState } from "react"
// import "./building-progress.css"
// import { ImageSlider } from "../image-slider/image-slider"
// import { ImageModal } from "../image-modal/image-modal"

// const BuildingProgress: React.FC = () => {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null)
//   const [isModalOpen, setIsModalOpen] = useState(false)

// const images = [
//     "/images/Marina_bay_garden.png",
//     "/images/Meditation_center.png",
//     "/images/rooftop_lounge.png",
//     "/images/GYM.png",
//     "/images/Barbeque_zone.png",
//     "/images/Infinity_pool.png",
//     "/images/Kids_play_area.png",
//     "/images/floor_plan.png",
//   ]


//   const handleImageClick = (imageSrc: string) => {
//     console.log("Image clicked:", imageSrc) // Added debug logging
//     setSelectedImage(imageSrc)
//     setIsModalOpen(true)
//   }

//   const handleCloseModal = () => {
//     setIsModalOpen(false)
//     setSelectedImage(null)
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex flex-col items-center justify-center gap-8 p-8">
//         {/* Header Section */}
       

//         <div className="w-full max-w-6xl bg-black/20 backdrop-blur-sm rounded-lg p-6 space-y-6">
//           {/* Left scrolling slider */}
//           <div className="w-full">
//             <ImageSlider images={images} direction="left" speed="slow" onImageClick={handleImageClick} />
//           </div>

//           {/* Right scrolling slider */}
//           <div className="w-full">
//             <ImageSlider images={images} direction="right" speed="slow" onImageClick={handleImageClick} />
//           </div>
//         </div>

//         {/* Amenities Section */}
       
//       </div>

//       {/* Modal */}
//       {isModalOpen && <ImageModal isOpen={isModalOpen} imageSrc={selectedImage} onClose={handleCloseModal} />}
//     </>
//   )
// }

// export default BuildingProgress
