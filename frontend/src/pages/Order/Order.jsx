/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function Order() {
  const { id } = useParams();
  const [productData, setProductData] = useState([]);

  const userInfo = JSON.parse(Cookies.get("userData"));

  useEffect(() => {
    axios
      .get(`${backendURL}/product/${id}`)
      .then((res) => {
        setProductData(res.data);

        console.log("productData :>> ", productData);
      })
      .catch((err) => {
        console.error("err", err);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    axios
      .post(`${backendURL}/order/shipping`, {
        shipping: {
          firstname: data.firstname,
          lastname: data.lastname,
          address: data.address,
          city: data.city,
          postal_code: data.postal_code,
          shipping_method: data.shipping_method,
          country: data.country,
          userId: userInfo.id,
        },
        order: {
          status: "pending",
          payment_method: data.payment_method,
          userId: userInfo.id,
        },
      })
      .then((res) => {
        console.log("Order and shipping created successfully", res);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }

  return (
    <main className="main flex flex-col gap-6 bg-[#FCE3D7] text-center md:gap-10 lg:flex-row lg:gap-0">
      <section className="sell-section flex flex-col gap-6 pt-12 text-center lg:w-1/3 lg:pb-4 lg:pt-0">
        <div className="flex w-full flex-col gap-4 sm:gap-8 lg:h-full lg:items-center lg:justify-center">
          <h1 className="h2">Passez votre commande</h1>
          <h3 className="mx-auto w-[80%] text-start lg:text-center lg:text-lg">
            Remplissez vos informations pour que votre article puisse vous
            trouver rapidement.
          </h3>
        </div>
        <div className="hidden w-[80%] flex-col gap-2 self-center lg:flex lg:w-[70%]">
          <p className="text-start lg:block lg:font-medium">
            *{" "}
            <span className="underline underline-offset-4">
              Informations obligatoires
            </span>
          </p>
        </div>
      </section>
      <form
        onSubmit={handleSubmit}
        className="params-product-form items-center gap-4 pb-8 sm:gap-6 lg:ml-[33%] lg:flex lg:w-3/4 lg:flex-col lg:bg-white lg:pb-8 lg:pt-16"
      >
        <div className="mb-8 flex flex-col items-center gap-2 lg:w-[80%] lg:flex-row lg:gap-4">
          <div className=" flex w-[90%] flex-col items-center gap-4 bg-[#e6c9ba] p-4 sm:w-[80%] md:w-[75%] md:gap-8 lg:w-full lg:flex-row lg:items-stretch lg:gap-0 lg:bg-[#fce3d7]">
            {productData.pictures &&
            productData.pictures.length > 0 &&
            productData.pictures[0].url ? (
              <img
                src={`${backendURL}${productData.pictures[0].url}`}
                alt={productData.title}
                className="rounded object-cover md:w-[90%] lg:w-1/2"
              />
            ) : (
              <img
                src="https://picsum.photos/450/255"
                alt={productData.title}
                className="rounded md:w-[100%]"
              />
            )}
            <div className="flex h-full w-full flex-col items-center gap-4 font-medium md:gap-8 lg:h-full lg:justify-stretch lg:gap-32">
              <h2 className="text-center md:text-xl lg:mt-6">
                Le résumé de votre commande:
              </h2>
              <div className="flex w-[90%] flex-col gap-4 md:w-[75%] md:gap-8 lg:flex-row lg:justify-between lg:justify-self-end">
                <div className="flex flex-col justify-center text-start md:text-lg">
                  <p>{productData.title}</p>
                  <p>Taille : {productData.size}</p>
                  <p>Etat : {productData.state}</p>
                  <p>Marque : {productData.brand}</p>
                </div>
                <p className="self-end text-lg md:text-xl">
                  {productData.price}€
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col items-center gap-6 lg:w-[80%] lg:flex-row lg:justify-between lg:gap-16">
          <div className="flex w-[90%] flex-col gap-4  sm:w-[80%] sm:gap-6 md:w-[70%] lg:w-1/2">
            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>* Adresse :</label>
              <input type="text" name="Adress" />
            </div>
            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>* Ville :</label>
              <input type="text" name="City" />
            </div>
            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>* Code postal :</label>
              <input type="text" name="postal_code" />
            </div>
            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>* Pays :</label>
              <input type="text" name="country" />
            </div>
          </div>

          <div className="flex w-[90%] flex-col gap-4 sm:w-[80%] sm:gap-6 md:w-[70%] lg:w-1/2 lg:items-start">
            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>* Nom :</label>
              <input type="text" name="lastname" />
            </div>
            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>* Prénom :</label>
              <input type="text" name="firstname" />
            </div>

            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>Options de paiement :</label>
              <select name="payment_method">
                <option value="">Sélectionnez une option</option>
                <option value="stripe">Carte bancaire</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>

            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>Options de livraison :</label>
              <select name="Delivery">
                <option value="">Sélectionnez une option</option>
                <option value="Pick-up">
                  Envoi au point relais (2J ouvrés)
                </option>
                <option value="Home">Envoi à domicile (3J ouvrés)</option>
              </select>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="h2 button mt-8 w-[90%] sm:w-[80%] md:w-[70%] lg:mx-auto lg:w-1/2"
        >
          Passer la commande
        </button>
      </form>
    </main>
  );
}
