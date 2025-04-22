import React, { useEffect, useState } from 'react';
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import "./css/Carousel.css"

const images = [
  "src/assets/images/image1.webp",
  "src/assets/images/image2.webp",
  "src/assets/images/imagw3.webp",
];

const Carousels = () => {

  const [currentIndex , setCurrentIndex] = useState(0);

  const nextSlide = () =>
    setCurrentIndex((previndex) =>
      previndex === images.length - 1 ? 0 : previndex + 1
    );
  
  const prevSlide = () =>
    setCurrentIndex((previndex) =>
      previndex === 0 ? images.length - 1 : previndex - 1
    );

  useEffect(()=> {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="carousel">
      <button className="prev" onClick={prevSlide}>
        <GrPrevious />
      </button>
      <img
        src={images[currentIndex]}
        alt="slideimage"
        className="carousel-image"
      />
      <button className="next" onClick={nextSlide}>
        <GrNext />
      </button>
    </div>
  );
}

export default Carousels