/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

function Carousel({ children }) {
  const [id, setId] = useState(0); // Start with the first slide
  const length = children.length;

  const handlePrevious = () => {
    setId((prevId) => (prevId - 1 + length) % length);
  };

  const handleNext = () => {
    setId((prevId) => (prevId + 1) % length);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setId((prevId) => (prevId + 1) % length);
    }, 15000); // Change slide every 15 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [length]);

  return (
    <div className="carousel">
      <FaChevronLeft
        className="leftArrow sm:text-lg md:text-xl lg:text-2xl"
        onClick={handlePrevious}
      />
      {children[id]}
      <FaChevronRight
        className="rightArrow sm:text-lg md:text-xl lg:text-2xl"
        onClick={handleNext}
      />
    </div>
  );
}

export default Carousel;
