/* eslint-disable react/prop-types */
import { MdFilterList } from "react-icons/md"; // Supposons que c'est l'icône alternative que vous avez choisie

export default function ButtonFilter({ openFilterModal }) {
  return (
    <>
      <button
        type="button"
        className="relative flex items-center max-h-8 gap-2 rounded border border-orange-600 bg-[#FCE3D7] px-4 py-2 text-lg hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
        onClick={openFilterModal}
      >
        <MdFilterList className="text-xl text-[#ec5a13]" /> {/* Icône plus stylisée */}
        <span>Affiner la recherche</span> {/* Texte mis à jour */}
      </button>
    </>
  );
}

