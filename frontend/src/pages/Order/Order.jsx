/* eslint-disable react/no-unescaped-entities */

import { useState, useContext, useEffect } from "react";

import { useParams } from "react-router-dom";
import { GlobalContext } from "./../../contexts/GlobalContextProvider";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function Order() {
  const { userInfo } = useContext(GlobalContext);
  const { id } = useParams();
  const [productData, setProductData] = useState([]);

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

  return (
    <main className="main flex flex-col gap-10 bg-[#FCE3D7] text-center lg:flex-row lg:gap-0">
      <section className="sell-section flex flex-col gap-6 pt-12 text-center lg:w-1/3 lg:pb-4 lg:pt-0">
        <div className="flex w-full flex-col gap-8 lg:h-full lg:items-center lg:justify-center">
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
      <form className="params-product-form items-center lg:flex lg:w-3/4 lg:flex-col lg:bg-white lg:pb-8 lg:pt-16">
        <div className="mb-8 flex flex-col items-center gap-2 lg:w-[80%] lg:flex-row lg:gap-4">
          <label className=" w-[90%] gap-4  bg-[#e6c9ba] p-4 sm:w-[80%] md:flex md:w-[80%] md:flex-col md:items-center lg:flex lg:flex-[1] lg:flex-row lg:bg-[#fce3d7]">
            <img src="https://picsum.photos/450/255" alt={productData.title} />
            <div className="lg:flex lg:w-[100%] lg:flex-col">
              <h2 className="mb-4">Le résumé de votre commande :</h2>
              <div className="lg:mt-10 lg:flex lg:flex-row lg:justify-between">
                <div className="flex flex-col justify-center p-14 text-center md:p-0">
                  {productData.title} <br /> {productData.size} -{" "}
                  {productData.state} - {productData.brand}
                </div>
                <div className="flex justify-center text-center md:flex-col md:justify-end">
                  {productData.price}€
                </div>
              </div>
            </div>
          </label>
        </div>

        <div className="flex h-full flex-col items-center gap-6 lg:w-[80%] lg:flex-row lg:justify-between lg:gap-16">
          <div className="flex w-[90%] flex-col gap-4 sm:w-[80%] md:w-[70%] lg:w-1/2">
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

          <div className="flex w-[90%] flex-col gap-4 sm:w-[80%] md:w-[70%] lg:w-1/2 lg:items-start">
            <div className="flex w-full flex-col gap-2 lg:items-start">
              <div className="flex w-full flex-col gap-2 lg:items-start">
                <label>* Nom :</label>
                <input type="text" name="lastname" />
              </div>
              <div className="flex w-full flex-col gap-2 lg:items-start">
                <label>* Prénom :</label>
                <input type="text" name="firstname" />
              </div>
            </div>

            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>Options de payement :</label>
              <select name="payment">
                <option value="">Sélectionnez une option</option>
                <option value="cb">Carte bancaire</option>
                <option value="PayPal">PayPal</option>
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
