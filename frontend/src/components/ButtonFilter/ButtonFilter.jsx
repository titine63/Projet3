/* eslint-disable react/prop-types */
import { AiOutlineFilter } from "react-icons/ai";

export default function ButtonFilter({ openFilterModal }) {
  return (
    <>
      <button type="button" className="button-filter" onClick={openFilterModal}>
        Filtres
        <AiOutlineFilter className="absolute bottom-1 right-1 text-xl text-[#ec5a13] " />
      </button>
    </>
  );
}
