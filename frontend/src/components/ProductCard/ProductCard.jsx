/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GlobalContext } from "./../../contexts/GlobalContextProvider";

export default function ProductCard({ product }) {
  const { wishlist, setWishlist, showToast } = useContext(GlobalContext);
  const [isFavorite, setIsFavorite] = useState(false);

  const addToWishlist = (product) => {
    console.log("AddToWishlist called");
    setWishlist((prevWishlist) => [...prevWishlist, product]);
  };

  const deleteFromWishlist = (product) => {
    console.log("deleteFromWishlist called");
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== product.id),
    );
  };

  const handleAddToWishlist = () => {
    console.log("handleAddToWishlist called");
    addToWishlist(product);
    setIsFavorite(true);
    showToast("Ajouté !");
  };

  const handleDeleteFromWishList = () => {
    console.log("handleDeleteFromWishList called");
    deleteFromWishlist(product);
    setIsFavorite(false);
    showToast("Supprimé !");
  };

  useEffect(() => {
    const productInWishList = wishlist.some((item) => item.id === product.id);
    setIsFavorite(productInWishList);
  }, [wishlist, product]);

  return (
    <div className="relative flex flex-col gap-1 rounded-lg border-2 bg-slate-100 p-1 shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:translate-x-1 hover:shadow-xl">
      {!isFavorite && (
        <AiOutlineHeart
          className="absolute right-2 top-1 cursor-pointer text-3xl transition duration-200 ease-in-out hover:scale-110 hover:transform"
          onClick={handleAddToWishlist}
        />
      )}
      {isFavorite && (
        <AiFillHeart
          className="absolute right-2 top-1 cursor-pointer text-3xl text-red-600"
          onClick={handleDeleteFromWishList}
        />
      )}

      <h2 className="h3 pb-1 pl-2">{product.title}</h2>
      <Link to={`/buy/product/${product.id}`}>
        <img
          src="https://picsum.photos/400/500"
          alt={product.title}
          className=""
        />
        <p className="pl-2 text-lg font-bold text-orange-500">
          {product.price} €
        </p>
        <p className="pl-2 font-medium">{product.brand}</p>
        <p className="pl-2 font-semibold text-gray-500">{product.size}</p>
      </Link>
    </div>
  );
}
