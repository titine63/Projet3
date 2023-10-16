/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

// Composant Carousel
export default function Carousel({ children }) {
  // État pour savoir sur quel slide on se trouve
  const [id, setId] = useState(0); // Start with the first slide
  // Constante pour savoir combien de slides il y a
  const length = children.length;

  // Fonction pour passer au slide précédent
  const handlePrevious = () => {
    setId((prevId) => (prevId - 1 + length) % length);
  };

  // Fonction pour passer au slide suivant
  const handleNext = () => {
    setId((prevId) => (prevId + 1) % length);
  };

  // Changement de slide automatique toutes les 7 secondes
  useEffect(() => {
    const intervalId = setInterval(() => {
      setId((prevId) => (prevId + 1) % length);
    }, 7000);

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [length]);

  return (
    <div className="carousel relative flex h-[25vh] w-full items-center justify-around bg-[#FCE3D7]">
      <span
        className="mx-1 cursor-pointer rounded-full bg-[#f5f5f4] bg-opacity-50 p-3"
        onClick={handlePrevious}
      >
        <FaChevronLeft
          className="leftArrow cursor-pointer pr-[3px] text-[#ec5a13] sm:text-lg md:text-xl lg:text-2xl"
          onClick={handlePrevious}
        />
      </span>
      {children[id]}
      <span
        className="mx-1 cursor-pointer rounded-full bg-[#f5f5f4] bg-opacity-50 p-3"
        onClick={handleNext}
      >
        <FaChevronRight
          className="rightArrow cursor-pointer p-0 pl-[3px] text-[#ec5a13] sm:text-lg md:text-xl lg:text-2xl"
          onClick={handleNext}
        />
      </span>
    </div>
  );
}
