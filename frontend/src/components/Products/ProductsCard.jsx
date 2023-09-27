/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { HiUserGroup } from "react-icons/hi";
import { BsTagsFill } from "react-icons/bs";
import { PiHandHeartFill } from "react-icons/pi";
import { GiClothes, GiBodyHeight } from "react-icons/gi";
import { IoIosColorPalette } from "react-icons/io";

export default function ProductCard({ product }) {
  const {
    title,
    description,
    price,
    size,
    image,
    clothing_type,
    brand,
    color,
    category,
    state,
  } = product;

  return (
    <section className="relative">
      <div className="hidden xl:fixed xl:bottom-[45%] xl:left-[5%] xl:block xl:w-[32%] xl:translate-y-1/2">
        <img src={image} alt={title} className="w-full" />
      </div>
      <div className="product-card">
        <h1 className="h1 md:mb-6">{title}</h1>
        <img
          src={image}
          alt={title}
          className="sm:w- m-auto w-[60%] xl:left-0 xl:hidden"
        />
        <p className="product-price">{price} €</p>
        <div className="product-details">
          <Link to="/favorites">
            <p className="btn-fav">Ajouter aux favoris</p>
          </Link>
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
          <Link to="/card">
            <p className="buy-btn">Acheter</p>
          </Link>
          <div>
            <div className="titles flex items-center gap-4">
              <img
                className="w-16 rounded-[50%] md:w-24 lg:w-32"
                src="../../../public/images/Ellipse 1.png"
                alt="seller picture"
              />
              <h2 className="">User</h2>
            </div>
            <div className="flex justify-between gap-2">
              <Link to="/profile">
                <p className="btn-user">Voir le profil</p>
              </Link>
              <Link to="/messages">
                <p className="btn-user">Envoyer un message</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
