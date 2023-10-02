/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineFilter } from "react-icons/ai";
import FilterModal from "../../components/Filter/Filter";

export default function Buy() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [products, setProducts] = useState([]);
  const [filterValues, setFilterValues] = useState({});
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const openFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  const handleFilterChange = (newValues) => {
    setFilterValues({ ...filterValues, ...newValues });
    console.log(filterValues);
  };

  const productsFiltred = products.filter((product) => {
    return product.price == filterValues.price;
  });

  useEffect(() => {
    setFilteredProducts(productsFiltred);
  }, [filterValues]);

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
            onRequestClose={openFilterModal}
            onFilterChange={handleFilterChange}
          />
        </div>
        {/* http://localhost:3000/products?price=15&title=pantalon */}
        <div className="tend-imgs">
          {filteredProducts.length
            ? filteredProducts.map((product) => {
                return (
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
                );
              })
            : products.map((product) => (
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
