//Category.jsx
/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import FilterModal from "../../components/Filter/Filter";
import ButtonFilter from "../../components/ButtonFilter/ButtonFilter";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function Category() {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(null);

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
    axios
      .get(`${backendURL}/product/category/${category}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(filterParams);
    const filterUrl = `${backendURL}/product/filter?${queryParams.toString()}`;

    axios
      .get(filterUrl)
      .then((res) => {
        setFilteredProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [filterParams]);

  return (
    <main className="main mb-8 flex flex-col items-center">
      <div className="my-8 flex w-[90%] items-baseline justify-center gap-6 lg:gap-12 xl:ml-36">
        <h1 className="h1 my-8 text-center">Catégorie {category}</h1>

        <ButtonFilter openFilterModal={openFilterModal} />
        <FilterModal
          isOpen={isFilterModalOpen}
          onRequestClose={openFilterModal}
          filterParams={filterParams}
          setFilterParams={setFilterParams}
          onFilterChange={handleFilterChange}
        />
      </div>
      {filteredProducts && filteredProducts.length === 0 ? (
        <h2 className="h2 mt-20 text-[#ec5a13]">
          Désolé ! Aucun produit de correspond à votre recherche ...
        </h2>
      ) : (
        <div className="my-8 grid w-[90%] grid-cols-2 items-center justify-center gap-6 sm:grid-cols-3 md:grid-cols-4 lg:w-[80%] lg:grid-cols-5 xl:grid-cols-6">
          {filteredProducts && filteredProducts.length != 0
            ? filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      )}
    </main>
  );
}
