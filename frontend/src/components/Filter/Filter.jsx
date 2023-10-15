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
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Filtres"
      className="filter-modal"
    >
      <div className="filter-modal-content main">
        <h3>Filtrer par :</h3>

        <div className="relative">
          <AiOutlineEuroCircle className="absolute top-1 text-xl text-[#ec5a13]" />
          <span className="criterias">Prix</span>
        </div>

        <div className="flex">
          <label>
            Min
            <br />
            <input
              type="number"
              name="minPrice"
              value={filterParams.minPrice}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Max
            <br />
            <input
              type="number"
              name="maxPrice"
              value={filterParams.maxPrice}
              onChange={handleChange}
            />
          </label>
        </div>

        <label>
          <div className="relative my-4">
            <GiClothes className="absolute top-1 text-xl text-[#ec5a13]" />
            <span className="criterias">Type de vêtement</span>
          </div>

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
        </label>

        <label>
          <div className="relative my-4">
            <BsTagsFill className="absolute top-1 text-xl text-[#ec5a13]" />
            <span className="criterias">Marque</span>
          </div>

          <select
            name="brand"
            value={filterParams.brand}
            onChange={handleChange}
          >
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
        </label>

        <label>
          <div className="relative my-4">
            <GiBodyHeight className="absolute top-1 text-xl text-[#ec5a13]" />
            <span className="criterias">Taille</span>
          </div>

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
        </label>

        <label>
          <div className="relative my-4">
            <PiHandHeartFill className="absolute top-1 text-xl text-[#ec5a13]" />
            <span className="criterias">Etat</span>
          </div>

          <select
            name="state"
            value={filterParams.state}
            onChange={handleChange}
          >
            <option value="">Sélectionnez une option...</option>
            <option value="Neuf">Neuf</option>
            <option value="Très bon état">Très bon état</option>
            <option value="Bon état">Bon état</option>
            <option value="Satisfaisant">Satisfaisant</option>
          </select>
        </label>

        <label>
          <div className="relative my-4">
            <IoIosColorPalette className="absolute top-1 text-xl text-[#ec5a13]" />
            <span className="criterias">Couleur</span>
          </div>

          <select
            name="color"
            value={filterParams.color}
            onChange={handleChange}
          >
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
        </label>
      </div>
    </Modal>
  );
}
