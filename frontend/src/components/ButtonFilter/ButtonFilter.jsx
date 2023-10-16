/* eslint-disable react/prop-types */
import { AiOutlineFilter } from "react-icons/ai";

export default function ButtonFilter({ openFilterModal }) {
  return (
    <>
      <button
        type="button"
        className="relative flex max-h-8 gap-3 rounded border border-orange-600 bg-[#FCE3D7] pl-2 pr-10 text-lg"
        onClick={openFilterModal}
      >
        Filtres
        <AiOutlineFilter className="absolute bottom-1 right-1 text-xl text-[#ec5a13]" />
      </button>
    </>
  );
}
