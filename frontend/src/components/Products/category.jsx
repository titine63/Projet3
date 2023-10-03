/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineFilter } from "react-icons/ai";
import FilterModal from "../Filter/Filter";

export default function Category() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filtredProducts, setFiltredProducts] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [filterParams, setFilterParams] = useState({
    minPrice: "",
    category: category,
    maxPrice: "",
    clothing_type: "",
    brand: "",
    size: "",
    state: "",
    color: "",
  });

  const handleFilterChange = (newValues) => {
    setFilterParams({ ...filterParams, ...newValues });
  };

  const openFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(filterParams);
    const filterUrl = `${backendURL}/product/filter?${queryParams.toString()}`;

    axios
      .get(filterUrl)
      .then((res) => {
        setFiltredProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [filterParams]);
  console.log("filteredProducts :>> ", filtredProducts);

  useEffect(() => {
    axios
      .get(`${backendURL}/product/category/${category}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <main className="main">
      <div className="tendence">
        <h2 className="buy-page-home-h2 mt-9">Filtrer par : {category}</h2>

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
          filterParams={filterParams}
          setFilterParams={setFilterParams}
          onFilterChange={handleFilterChange}
        />
      </div>
      {filtredProducts && filtredProducts.length === 0 ? (
        <h2 className="not-found">
          Désolé ! Aucun produit de correspond à votre recherche ...{" "}
        </h2>
      ) : null}

      <div className="tend-imgs">
        {filtredProducts && filtredProducts.length != 0
          ? filtredProducts.map((product) => {
              return (
                <Link key={product.id} to={`/buy/product/${product.id}`}>
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
          : filtredProducts && filtredProducts.length === 0
          ? null
          : products.map((product) => (
              <Link key={product.id} to={`/buy/product/${product.id}`}>
                <div key={product.id}>
                  <h3 className="text-center">
                    {product.title} <br /> <span>{product.price} €</span>
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
    </main>
  );
}
