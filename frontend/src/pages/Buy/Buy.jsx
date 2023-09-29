/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineFilter } from "react-icons/ai";

export default function Buy() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

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
          <Link to="#" className="button-filter relative pl-3 pr-9">
            Filtres
            <AiOutlineFilter className="absolute bottom-1 right-1 text-xl text-[#ec5a13] " />
          </Link>
        </div>
        <div className="tend-imgs">
          {products
            // .filter((product) => product.id >= 1 && product.id <= 13)
            .map((product) => (
              <Link key={product.id} to={`product/${product.id}`}>
                <div key={product.id}>
                  <h3>
                    {product.title} <span>{product.price} €</span>
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
