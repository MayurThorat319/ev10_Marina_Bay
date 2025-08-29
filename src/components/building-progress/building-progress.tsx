"use client";

import type React from "react";
import { useState } from "react";
import "./building-progress.css";
import { BuildingSlider } from "../building-slider/building-slider";
import { ImageModal } from "../../image-modal/image-modal";

const BuildingProgress: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const images = [
    "https://cdn.evhomes.tech/hls/mb_vid_ind_1/mb_vid_ind_1_1.m3u8",
    // "/images/mb_normal_1.jpg",
    "https://cdn.evhomes.tech/hls/mb_vid_n2/mb_vid_n2_1.m3u8",
    "https://cdn.evhomes.tech/hls/mb_vid_n6/mb_vid_n6_1.m3u8",
    "https://cdn.evhomes.tech/hls/mb_vid_n4/mb_vid_n4_1.m3u8",
  ];

  const images1 = [
    "https://cdn.evhomes.tech/hls/mb_vid_n2/mb_vid_n2_1.m3u8",
    // "/images/mb_ind_2.jpg",
    "https://cdn.evhomes.tech/hls/mb_vid_n7/mb_vid_n7_1.m3u8",
    "https://cdn.evhomes.tech/hls/mb_vid_ind_2/mb_vid_ind_2_1.m3u8",
    "https://cdn.evhomes.tech/hls/mb_vid_n5/mb_vid_n5_1.m3u8",
  ];

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="wrapper" data-scroll data-scroll-speed="-.8">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex flex-col items-center justify-center gap-8 p-8">
        <div className="w-full max-w-6xl bg-black/20 backdrop-blur-sm rounded-lg p-6 space-y-6">
          {/* Left scrolling slider - should only show images array */}
          <div className="w-full">
            <BuildingSlider
              images={images}
              direction="left"
              speed="slow"
              onImageClick={handleOpenModal}
            />
          </div>

          {/* Right scrolling slider - should only show images1 array */}
          <div className="w-full">
            <BuildingSlider
              images={images1}
              direction="right"
              speed="slow"
              onImageClick={handleOpenModal}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          imageSrc={selectedImage}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default BuildingProgress;
