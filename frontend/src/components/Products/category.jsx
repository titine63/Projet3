import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineFilter } from "react-icons/ai";

export default function Category() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const { category } = useParams();
  const [products, setProducts] = useState([]);

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
    <div className="main">
      <div className="tendence">
        <h2 className="buy-page-home-h2 mt-9">Filtrer par : {category}</h2>
        <Link to="#" className="button-filter relative pl-3 pr-9">
          Filtres
          <AiOutlineFilter className="absolute bottom-1 right-1 text-xl text-[#ec5a13] " />
        </Link>
      </div>
      <div className="tend-imgs">
        {products.map((product) => (
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
    </div>
  );
}
