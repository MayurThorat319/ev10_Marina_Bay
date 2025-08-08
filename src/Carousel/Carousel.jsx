// Carousel.jsx
import React, { useState, useEffect } from 'react';
import './Carousel.css'; // For styling

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState(null); // 'next' or 'prev'

  const handleNext = () => {
    if (transitioning) return;
    setDirection('next');
    setTransitioning(true);
    // After a short delay to allow CSS transition to start, update the index
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setTransitioning(false);
      setDirection(null);
    }, 500); // Match this with your CSS transition duration
  };

  const handlePrev = () => {
    if (transitioning) return;
    setDirection('prev');
    setTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      setTransitioning(false);
      setDirection(null);
    }, 500); // Match this with your CSS transition duration
  };

  // Calculate indices for current, next, and previous images
  const currentImage = images[currentIndex];
  const nextImage = images[(currentIndex + 1) % images.length];
  const prevImage = images[(currentIndex - 1 + images.length) % images.length];

  return (
    <div className="carousel-container">
      <div className={`carousel-wrapper ${transitioning ? 'transitioning' : ''} ${direction}`}>
        {/* Display previous image (off-screen left) */}
        <div className="carousel-item prev">
          <img src={prevImage} alt="Previous" />
        </div>

        {/* Display current image */}
        <div className="carousel-item current">
          <img src={currentImage} alt="Current" />
        </div>

        {/* Display next image (preview) */}
        <div className="carousel-item next">
          <img src={nextImage} alt="Next" />
        </div>
      </div>

      <button onClick={handlePrev} className="carousel-arrow prev-arrow">{'<'}</button>
      <button onClick={handleNext} className="carousel-arrow next-arrow">{'>'}</button>
    </div>
  );
};

export default Carousel;
