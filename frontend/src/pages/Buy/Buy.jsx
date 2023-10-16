/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import ButtonFilter from "../../components/ButtonFilter/ButtonFilter";
import FilterModal from "../../components/Filter/Filter";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function Buy() {
  const [products, setProducts] = useState([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [filterParams, setFilterParams] = useState({
    minPrice: "",
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

  const openFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  const categories = [
    { name: "Homme", picture: "/images/man-image.png" },
    { name: "Femme", picture: "/images/woman-image.png" },
    { name: "Enfant", picture: "/images/kids-image.png" },
  ];

  return (
    <main className="main flex flex-col items-center gap-8">
      <h1 className="h1 mt-8 text-center">Filtrer par catégorie</h1>
      <div className="grid w-[90%] grid-cols-3 justify-center gap-4 md:gap-8 lg:w-[80%] lg:gap-12 xl:w-[70%] xl:gap-24">
        {categories.map((category) => (
          <div key={category.name} className="flex flex-col gap-2">
            <Link
              to={`/product/category/${category.name.toLowerCase()}`}
              className="rounded-lg border-2 bg-slate-100 p-1 shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:translate-x-1 hover:shadow-xl"
            >
              <img
                className="w-full"
                src={category.picture}
                alt={category.name}
              />
            </Link>
            <h2 className="h2 text-center">{category.name}</h2>
          </div>
        ))}
      </div>

      <div className="flex gap-8">
        <h2 className="h2">Tendances du moment</h2>

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
        <div className="grid w-[90%] grid-cols-2 items-center justify-center gap-6 sm:grid-cols-3 md:grid-cols-4 lg:w-[80%] lg:grid-cols-5 xl:grid-cols-6">
          {filteredProducts && filteredProducts.length != 0
            ? filteredProducts
                .filter((product) => product.id >= 1 && product.id <= 12)
                .map((product) => (
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
