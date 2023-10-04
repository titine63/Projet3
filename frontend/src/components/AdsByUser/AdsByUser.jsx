/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdsByUser({userId, route}){
  const [ads, setAds] = useState([]); // ads = [{}] (array d'objets)
  // const [isLoading, setIsLoading] = useState(true);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
  axios.get(`${backendURL}/${route}/${userId}`)
    .then((response) => {
      setAds(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
    // .finally(() => {
    //   // setIsLoading(false);
    // });
  }
  , []);

  return (
    <>
    {ads.map((product) => (
              <Link key={product.id} to={`/buy/product/${product.id}`}>
                <div key={product.id} className="flex items-center gap-10">
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
      
    </>
  );
}