/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function AdsByUser({ userId, route }) {
  const [ads, setAds] = useState([]); // ads = [{}] (array d'objets)

  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${backendURL}/${route}/${userId}`)
      .then((response) => {
        setAds(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // .finally(() => {
    //   // setIsLoading(false);
    // });
  }, []);

  return (
    <>
      {ads.map((ad) => (
        <ProductCard key={ad.id} product={ad} />
      ))}
    </>
  );
}
