/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { AiOutlineFilter } from "react-icons/ai";

export default function Buy() {
  const products = [
    {
      id: 1,
      title: "magnifique veste",
      description: "veste de taille M",
      price: 15,
      size: "M",
      image: "./../../../public/images/man-image.png",
      clothing_type: "Veste",
      brand: "Autre",
      color: "noir",
      category: "man",
    },
    {
      id: 2,
      title: "magnifique veste",
      description: "veste de taille M",
      price: 15,
      size: "M",
      image: "./../../../public/images/woman-image.png",
      clothing_type: "Veste",
      brand: "Autre",
      color: "noir",
      category: "man",
    },
    {
      id: 3,
      title: "magnifique veste",
      description: "veste de taille M",
      price: 15,
      size: "M",
      image: "./../../../public/images/kids-image.png",
      clothing_type: "Veste",
      brand: "Autre",
      color: "noir",
      category: "man",
    },
  ];

  return (
    <main className="main flex flex-col justify-center">
      <div className="buy-page-home">
        <h2 className="buy-page-home-h2">Filtrer par catégorie</h2>
        <div className="buy-imgs">
          <img
            className="buy-img"
            src="./../../../public/images/man-image.png"
            alt="man-img"
          />
          <img
            className="buy-img"
            src="./../../../public/images/woman-image.png"
            alt="woman-img"
          />
          <img
            className="buy-img"
            src="./../../../public/images/kids-image.png"
            alt="kids-img"
          />
        </div>

        <div className="tendence">
          <h2 className="buy-page-home-h2">Tendences du moment</h2>
          <Link to="/buy" className="button-filter relative pl-3 pr-9">
            Filtres
            <AiOutlineFilter className="absolute bottom-1 right-1 text-xl text-[#ec5a13] " />
          </Link>
        </div>
        <div className="tend-imgs">
          {products.map((product) => (
            <Link key={product.id} to={`product/${product.id}`}>
              <img
                key={product.id}
                className="tend-img"
                src={product.image}
                alt="man-img"
              />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
