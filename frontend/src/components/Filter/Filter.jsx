/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Modal from "react-modal";
import { AiOutlineEuroCircle } from "react-icons/ai";
import { GiClothes, GiBodyHeight } from "react-icons/gi";
import { BsTagsFill } from "react-icons/bs";
import { PiHandHeartFill } from "react-icons/pi";
import { IoIosColorPalette } from "react-icons/io";

export default function FilterModal({
  filterParams,
  setFilterParams,
  onFilterChange,
  isOpen,
  onRequestClose,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilterParams = { ...filterParams, [name]: value };
    setFilterParams(newFilterParams);
    onFilterChange(newFilterParams);
  };

  return (
    <Modal
      appElement={document.getElementById("root")}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Filters"
      className="filter-modal flex h-screen flex-col gap-4 pb-20 md:pb-8"
    >
      <h3 className="h3 relative mt-4 w-full self-start pl-[5%] xl:mt-8">
        Filtrer par :{" "}
        <span
          className="absolute bottom-1 right-3 cursor-pointer text-4xl xl:text-5xl"
          onClick={onRequestClose}
        >
          &times;
        </span>
      </h3>

      <div className="relative mx-[5%] mb-2 flex flex-col gap-1">
        <AiOutlineEuroCircle className="absolute top-1 text-xl text-[#ec5a13]" />
        <p className="pl-8 font-medium md:text-xl">Prix</p>

        <div className="flex justify-between ">
          <div className="flex w-[45%] flex-col">
            <label>Min</label>
            <input
              type="number"
              name="minPrice"
              value={filterParams.minPrice}
              onChange={handleChange}
            />
          </div>

          <div className="flex w-[45%] flex-col">
            <label>Max</label>
            <input
              type="number"
              name="maxPrice"
              value={filterParams.maxPrice}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="relative mx-[5%] mb-2 flex w-[90%] flex-col gap-1">
        <GiClothes className="absolute top-1 text-xl text-[#ec5a13]" />
        <label className="pl-8 font-medium md:text-xl">Type de vêtement</label>

        <select
          type="string"
          name="clothing_type"
          value={filterParams.clothing_type}
          onChange={handleChange}
        >
          <option value="">Sélectionnez une option...</option>
          <option value="T-shirt">T-shirt</option>
          <option value="Pantalon">Pantalon</option>
          <option value="Jean">Jean</option>
          <option value="Robe">Robe</option>
          <option value="Short">Short</option>
          <option value="Sous-vêtement">Sous-vêtement</option>
          <option value="Chapeau">Chapeau</option>
          <option value="Pull">Pull</option>
          <option value="Chaussures">Chaussures</option>
          <option value="Chemise">Chemise</option>
          <option value="Écharpe">Écharpe</option>
        </select>
      </div>

      <div className="relative mx-[5%] mb-2 flex w-[90%] flex-col gap-1">
        <BsTagsFill className="absolute top-1 text-xl text-[#ec5a13]" />
        <label className="pl-8 font-medium md:text-xl">Marque</label>

        <select name="brand" value={filterParams.brand} onChange={handleChange}>
          <option value="">Sélectionnez une option...</option>
          <option value="Nike">Nike</option>
          <option value="Adidas">Adidas</option>
          <option value="Lacoste">Lacoste</option>
          <option value="H&M">H&M</option>
          <option value="Levis">Levis</option>
          <option value="Puma">Puma</option>
          <option value="Zara">Zara</option>
          <option value="Gucci">Gucci</option>
        </select>
      </div>

      <div className="relative mx-[5%] mb-2 flex w-[90%] flex-col gap-1">
        {" "}
        <GiBodyHeight className="absolute top-1 text-xl text-[#ec5a13]" />
        <label className="pl-8 font-medium md:text-xl">Taille</label>
        <select name="size" value={filterParams.size} onChange={handleChange}>
          <option value="">Sélectionnez une option...</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
          <option value="XXXL">XXXL</option>
        </select>
      </div>

      <div className="relative mx-[5%] mb-2 flex w-[90%] flex-col gap-1">
        <PiHandHeartFill className="absolute top-1 text-xl text-[#ec5a13]" />
        <label className="pl-8 font-medium md:text-xl">Etat</label>

        <select name="state" value={filterParams.state} onChange={handleChange}>
          <option value="">Sélectionnez une option...</option>
          <option value="Neuf">Neuf</option>
          <option value="Très bon état">Très bon état</option>
          <option value="Bon état">Bon état</option>
          <option value="Satisfaisant">Satisfaisant</option>
        </select>
      </div>

      <div className="relative mx-[5%] mb-2 flex w-[90%] flex-col gap-1">
        <IoIosColorPalette className="absolute top-1 text-xl text-[#ec5a13]" />
        <label className="pl-8 font-medium md:text-xl">Couleur</label>

        <select name="color" value={filterParams.color} onChange={handleChange}>
          <option value="">Sélectionnez une option...</option>
          <option value="rouge">Rouge</option>
          <option value="orange">Orange</option>
          <option value="gris">gris</option>
          <option value="noir">noir</option>
          <option value="bleu">bleu</option>
          <option value="vert">vert</option>
          <option value="jaune">jaune</option>
          <option value="violet">violet</option>
        </select>
      </div>
    </Modal>
  );
}
