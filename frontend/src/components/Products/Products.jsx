/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import ProductCard from "./ProductsCard";
import { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams();

  const [products, setProducts] = useState([]);

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

  const filteredProducts = products.filter(
    (product) => product.id === parseInt(id),
  );

  return (
    <main className="main">
      <section>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
};

export default Products;
