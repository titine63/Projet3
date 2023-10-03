/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Modal from "react-modal";
import { AiOutlineEuroCircle } from "react-icons/ai";
import { GiClothes, GiBodyHeight } from "react-icons/gi";
import { BsTagsFill } from "react-icons/bs";
import { PiHandHeartFill } from "react-icons/pi";
import { IoIosColorPalette } from "react-icons/io";
import { useState, useEffect } from "react";

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

        <div className="price-filter">
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
            <option value="T-shert">T-shert</option>
            <option value="Pantalon">Pantalon</option>
            <option value="Jean">Jean</option>
            <option value="Rob">Rob</option>
            <option value="Short">Short</option>
            <option value="Sous-vêtement">Sous-vêtement</option>
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
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Lacoste">Lacoste</option>
            <option value="About-You">About you</option>
            <option value="Celio">Celio</option>
            <option value="Puma">Puma</option>
          </select>
        </label>

        <label>
          <div className="relative my-4">
            <GiBodyHeight className="absolute top-1 text-xl text-[#ec5a13]" />
            <span className="criterias">Taille</span>
          </div>

          <select name="size" value={filterParams.size} onChange={handleChange}>
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
            <option value="Neuf">Neuf</option>
            <option value="Très bon état">Très bon état</option>
            <option value="bon état">bon état</option>
            <option value="Satisfaisnt">Satisfaisnt</option>
          </select>
        </label>

        <label>
          <div className="relative my-4">
            <IoIosColorPalette className="absolute top-1 text-xl text-[#ec5a13]" />
            <span className="criterias">Coleur</span>
          </div>

          <select
            name="color"
            value={filterParams.color}
            onChange={handleChange}
          >
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
