/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import { Link } from "react-router-dom";
import { HiUserGroup } from "react-icons/hi";
import { BsTagsFill } from "react-icons/bs";
import { PiHandHeartFill } from "react-icons/pi";
import { GiClothes, GiBodyHeight } from "react-icons/gi";
import { IoIosColorPalette } from "react-icons/io";
import { GlobalContext } from "./../../contexts/GlobalContextProvider";
import { useContext, useState } from "react";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function ProductsDetail({ product }) {
  const { setWishlist, showToast, userInfo } = useContext(GlobalContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    id,
    title,
    description,
    price,
    size,
    clothing_type,
    brand,
    color,
    category,
    state,
    userId,
  } = product;

  const titleProduct = title;

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(`${backendURL}/product/${id}`);

      setSuccessMessage(
        `Votre annonce "${titleProduct}" est maintenant supprimée !`,
      );
      setModalVisible(true);

      console.log("Annonce supprimée avec succès :", response.data);
    } catch (error) {
      console.error("Erreur lors de la supprition de l'annonce :", error);
    }
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    showToast("Ajouté !");
  };

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => [...prevWishlist, product]);
  };

  return (
    <section className="relative">
      <div className="hidden xl:fixed xl:bottom-[45%] xl:left-[5%] xl:block xl:w-[32%] xl:translate-y-1/2">
        <img
          src="https://picsum.photos/800/920"
          alt={title}
          className="w-full"
        />
      </div>
      <div className="product-card">
        <h1 className="h1 md:mb-6">{title}</h1>
        <img
          src="https://picsum.photos/400/600"
          alt={title}
          className="m-auto w-[60%] xl:left-0 xl:hidden"
        />
        <p className="product-price">{price} €</p>
        <div className="product-details">
          <button className="btn-fav" onClick={handleAddToWishlist}>
            Ajouter aux favoris
          </button>
          <div>
            <h2 className="titles">Description</h2>
            <p className="md:text-xl">{description}</p>
          </div>
          <div>
            <h2 className="titles">Critères</h2>
            <div className="product-criteria">
              <div className="relative">
                <HiUserGroup className="absolute top-1 text-xl" />
                <span className="criterias">
                  Catégorie <br />
                </span>
                <span className="pl-8">{category}</span>
              </div>
              <div className="relative">
                <GiBodyHeight className="absolute top-1 text-xl" />
                <span className="criterias">
                  Taille <br />
                </span>
                <span className="pl-8">{size}</span>
              </div>
              <div className="relative">
                <span className="criterias">
                  <GiClothes className="absolute top-1 text-xl" />
                  Type{" "}
                  <span className="hidden sm:inline-block">
                    {" "}
                    de vêtement
                  </span>{" "}
                  <br />
                </span>
                <span className="pl-8">{clothing_type}</span>
              </div>
              <div className="relative">
                <BsTagsFill className="absolute top-1 text-xl" />
                <span className="criterias">
                  Marque <br />
                </span>
                <span className="pl-8">{brand}</span>
              </div>
              <div className="relative">
                <IoIosColorPalette className="absolute top-1 text-xl" />
                <span className="criterias">
                  Couleur <br />
                </span>
                <span className="pl-8">{color}</span>
              </div>
              <div className="relative">
                <PiHandHeartFill className="absolute top-1 text-xl" />
                <span className="criterias">
                  Etat <br />
                </span>
                <span className="pl-8">{state}</span>
              </div>
            </div>
          </div>
          {userInfo && userId == userInfo.id ? (
            <div className="flex flex-col justify-center gap-5 lg:flex-row lg:justify-between">
              <button onClick={handleDelete}>
                <p className="buy-btn p-9">Supprimer</p>
              </button>
              {modalVisible && (
                <div className="fixed left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 flex-col justify-center bg-[#fce3d7] p-12 text-center text-lg lg:text-2xl">
                  <p className="mb-14">{successMessage}</p>
                  <img
                    src="./../../../public/images/sitting.png"
                    alt="lnk"
                    className="fixed bottom-16 right-0 w-28 lg:bottom-0 lg:w-64"
                  />
                  <div className="flex flex-col justify-center gap-5 lg:flex-row">
                    <Link className="button lg:w-[15%]" to="/">
                      Accueil
                    </Link>
                    <Link className="button lg:w-[15%]" to="/profile">
                      Profile
                    </Link>
                  </div>
                </div>
              )}

              <Link to={`/product/update/${id}`}>
                <p className="buy-btn p-9">Modifier</p>
              </Link>
            </div>
          ) : (
            <Link to="/card">
              <p className="buy-btn">Acheter</p>
            </Link>
          )}

          <div>
            {!modalVisible ? (
              userInfo && userId === userInfo.id ? (
                <div className="titles flex items-center gap-4">
                  <img
                    className="w-16 rounded-[50%] md:w-24 lg:w-32"
                    src={userInfo.picture}
                    alt="seller picture"
                  />
                  <h2 className="">{userInfo.pseudo}</h2>
                </div>
              ) : (
                <div className="titles flex items-center gap-4">
                  <img
                    className="w-16 rounded-[50%] md:w-24 lg:w-32"
                    src="../../../public/images/Ellipse 1.png"
                    alt="seller picture"
                  />
                  <h2 className="">User</h2>
                </div>
              )
            ) : null}

            {userInfo && userId == userInfo.id ? (
              <div className="w-full">
                <Link to="/profile">
                  <p className="btn-user">Voir mes annonces</p>
                </Link>
              </div>
            ) : (
              <div className="flex justify-between gap-2">
                <Link to="/profile">
                  <p className="btn-user">Voir le profil</p>
                </Link>
                <Link to="/messages">
                  <p className="btn-user">Envoyer un message</p>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
