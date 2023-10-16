/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { Link, useParams } from "react-router-dom";
import { HiUserGroup } from "react-icons/hi";
import { BsTagsFill } from "react-icons/bs";
import { PiHandHeartFill } from "react-icons/pi";
import { GiClothes, GiBodyHeight } from "react-icons/gi";
import { IoIosColorPalette } from "react-icons/io";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function ProductDetail() {
  const { id } = useParams();
  const { wishlist, setWishlist, showToast, userInfo } =
    useContext(GlobalContext);
  console.log("wishlist :>> ", wishlist);

  const [isFavorite, setIsFavorite] = useState(false);
  const [product, setProduct] = useState({});

  const [modalVisible, setModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const titleProduct = product.title;

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

  useEffect(() => {
    axios
      .get(`${backendURL}/product/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  console.log("product :>> ", product);

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

  return (
    <main className="main my-8">
      <section className="relative">
        <div className=" hidden xl:fixed xl:bottom-[45%] xl:left-[5%] xl:block xl:w-[32%] xl:translate-y-1/2">
          <img
            src="https://picsum.photos/800/920"
            alt={product.title}
            className="w-full"
          />
        </div>
        <div className="mt-6 flex flex-col items-center gap-6 pb-16 xl:absolute xl:right-[5%] xl:w-[50%]">
          <h1 className="h1">{product.title}</h1>
          <img
            src="https://picsum.photos/400/600"
            alt={product.title}
            className="m-auto w-[60%] xl:left-0 xl:hidden"
          />
          <p className="text-2xl text-[#ec5a13] md:text-3xl">
            {product.price} €
          </p>
          <div className="flex w-[90%] flex-col justify-center gap-8 md:w-[80%] xl:w-full xl:gap-10">
            <button
              type="button"
              className="bg-[#ec5a13] px-4 py-1 text-center text-xl text-white md:text-2xl"
              onClick={
                isFavorite ? handleDeleteFromWishList : handleAddToWishlist
              }
            >
              Ajouter aux favoris
            </button>
            <div>
              <h2 className="titles">Description</h2>
              <p className="md:text-xl">{product.description}</p>
            </div>
            <div>
              <h2 className="titles">Critères</h2>
              <div className="grid grid-cols-2 gap-y-8 md:text-lg xl:grid-cols-3">
                <div className="relative">
                  <HiUserGroup className="absolute top-1 text-xl text-[#ec5a13]" />
                  <p className="pl-8 font-medium md:text-xl">Catégorie</p>
                  <p className="pl-8 font-medium text-gray-600">
                    {product.category}
                  </p>
                </div>
                <div className="relative">
                  <GiBodyHeight className="absolute top-1 text-xl text-[#ec5a13]" />
                  <p className="pl-8 font-medium md:text-xl">Taille</p>
                  <p className="pl-8 font-medium text-gray-600">
                    {product.size}
                  </p>
                </div>
                <div className="relative">
                  <GiClothes className="absolute top-1 text-xl text-[#ec5a13]" />
                  <p className="pl-8 font-medium md:text-xl">
                    Type{" "}
                    <span className="hidden sm:inline-block"> de vêtement</span>{" "}
                  </p>
                  <p className="pl-8 font-medium text-gray-600">
                    {product.clothing_type}
                  </p>
                </div>
                <div className="relative">
                  <BsTagsFill className="absolute top-1 text-xl text-[#ec5a13]" />
                  <p className="pl-8 font-medium md:text-xl">Marque</p>
                  <p className="pl-8 font-medium text-gray-600">
                    {product.brand}
                  </p>
                </div>
                <div className="relative">
                  <IoIosColorPalette className="absolute top-1 text-xl text-[#ec5a13]" />
                  <p className="pl-8 font-medium md:text-xl">Couleur</p>
                  <p className="pl-8 font-medium text-gray-600">
                    {product.color}
                  </p>
                </div>
                <div className="relative">
                  <PiHandHeartFill className="absolute top-1 text-xl text-[#ec5a13]" />
                  <p className="pl-8 font-medium md:text-xl">Etat</p>
                  <p className="pl-8 font-medium text-gray-600">
                    {product.state}
                  </p>
                </div>
              </div>
            </div>
            {userInfo && product.userId == userInfo.id ? (
              <div className="flex flex-col justify-center gap-5 md:flex-row lg:justify-between">
                <button
                  onClick={handleDelete}
                  className="mx-auto bg-[#ec5a13] p-9 px-4 py-1 text-center text-xl text-white md:w-[100%] md:text-2xl"
                >
                  Supprimer
                </button>

                <Link
                  to={`/product/update/${id}`}
                  className="mx-auto bg-[#ec5a13] p-9 px-4 py-1 text-center text-xl text-white md:w-[100%] md:text-2xl"
                >
                  Modifier
                </Link>
              </div>
            ) : (
              <Link
                to="/card"
                className="mx-auto bg-[#ec5a13] px-4 py-1 text-center text-xl text-white md:w-[100%] md:text-2xl"
              >
                Acheter
              </Link>
            )}

            <div>
              <div className="titles flex items-center gap-8">
                {userInfo && product.userId === userInfo.id ? (
                  <>
                    <img
                      className="h-16 w-16 rounded-[50%] border  border-black md:h-24 md:w-24 lg:h-32 lg:w-32"
                      src={userInfo.picture}
                      alt="seller picture"
                    />
                    <h2>{userInfo.pseudo}</h2>
                  </>
                ) : product.userPicture ? (
                  <>
                    <img
                      className="h-16 w-16 rounded-[50%] border border-black md:h-24 md:w-24 lg:h-32 lg:w-32"
                      src={`${backendURL}/${product.userPicture}`}
                      alt="seller picture"
                    />
                    <h2>{product.userPseudo}</h2>
                  </>
                ) : (
                  <>
                    <img
                      className="h-16 w-16 rounded-[50%] border border-black md:h-24 md:w-24 lg:h-32 lg:w-32"
                      src="../../../public/images/Ellipse 1.png"
                      alt="seller picture"
                    />
                    <h2>{product.userPseudo}</h2>
                  </>
                )}
              </div>
            </div>

            {userInfo && product.userId == userInfo.id ? (
              <Link
                to="/profile"
                className="bg-[#ec5a13] px-4 py-1 text-center text-xl text-white md:text-2xl"
              >
                Voir mes annonces
              </Link>
            ) : (
              <div className="flex flex-col justify-center gap-5 md:flex-row lg:justify-between">
                <Link
                  to="/profile"
                  className="bg-[#ec5a13] px-4 py-1 text-center text-white md:text-2xl"
                >
                  Voir le profil
                </Link>
                <Link
                  to="/messages"
                  className="bg-[#ec5a13] px-4 py-1 text-center text-white md:text-2xl"
                >
                  Envoyer un message
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
      {modalVisible && (
        <div className="fixed left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 flex-col justify-center bg-[#fce3d7] p-12 text-center text-lg lg:text-2xl">
          <p className="mb-14 font-semibold">{successMessage}</p>
          <img
            src="/images/sitting.png"
            alt="lnk"
            className="fixed bottom-16 right-0 w-28 lg:bottom-0 lg:w-64"
          />
          <div className="flex flex-col justify-center gap-6 md:flex-row lg:gap-12">
            <Link className="button lg:w-[15%]" to="/">
              Accueil
            </Link>
            <Link className="button lg:w-[15%]" to="/profile">
              Profile
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}