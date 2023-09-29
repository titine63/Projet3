/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineFilter } from "react-icons/ai";
import FilterModal from "../../components/Filter/Filter";
import Modal from "react-modal";

export default function Buy() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [products, setProducts] = useState([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };
  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  useEffect(() => {
    axios
      .get(`${backendURL}/product`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <main className="main flex flex-col justify-center">
      <div className="buy-page-home">
        <h2 className="buy-page-home-h2">Filtrer par catégorie</h2>
        <div className="buy-imgs">
          <Link to={`/product/category/homme`}>
            <div>
              <img
                className="buy-img"
                src="./../../../public/images/man-image.png"
                alt="man-img"
              />
            </div>
          </Link>

          <Link to={`/product/category/femme`}>
            <div>
              <img
                className="buy-img"
                src="./../../../public/images/woman-image.png"
                alt="man-img"
              />
            </div>
          </Link>
          <Link to={`/product/category/enfant`}>
            <div>
              <img
                className="buy-img"
                src="./../../../public/images/kids-image.png"
                alt="man-img"
              />
            </div>
          </Link>
        </div>

        <div className="tendence">
          <h2 className="buy-page-home-h2">Tendences du moment</h2>

          <Link
            to="#"
            className="button-filter relative pl-3 pr-9"
            onClick={openFilterModal}
          >
            Filtres
            <AiOutlineFilter className="absolute bottom-1 right-1 text-xl text-[#ec5a13] " />
          </Link>

          <FilterModal
            isOpen={isFilterModalOpen}
            onRequestClose={closeFilterModal}
          />
        </div>

        <div className="tend-imgs">
          {products
            .filter((product) => product.id >= 1 && product.id <= 13)
            .map((product) => (
              <Link key={product.id} to={`product/${product.id}`}>
                <div key={product.id}>
                  <h3 className="text-center">
                    {product.title} <br />
                    <span>{product.price} €</span>
                  </h3>
                  <img
                    key={product.id}
                    className="tend-img"
                    src="https://picsum.photos/150/200"
                    alt="man-img"
                  />
                </div>
              </Link>
            ))}
        </div>
      </div>
    </main>
  );
}
