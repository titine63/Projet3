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

  // Changement de slide automatique toutes les 15 secondes
  useEffect(() => {
    const intervalId = setInterval(() => {
      setId((prevId) => (prevId + 1) % length);
    }, 15000); // Change slide every 15 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [length]);

  return (
    <div className="carousel">
      <FaChevronLeft
        className="leftArrow cursor-pointer text-[#ec5a13] sm:text-lg md:text-xl lg:text-2xl"
        onClick={handlePrevious}
      />
      {children[id]}
      <FaChevronRight
        className="rightArrow cursor-pointer text-[#ec5a13] sm:text-lg md:text-xl lg:text-2xl"
        onClick={handleNext}
      />
    </div>
  );
}
