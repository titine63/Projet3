//Order.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { orderFormSchema } from "./../../utils/const";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function Order() {
  const { id } = useParams();
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  const userInfo = Cookies.get("userData")
    ? JSON.parse(Cookies.get("userData"))
    : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(orderFormSchema),
  });

  useEffect(() => {
    axios
      .get(`${backendURL}/product/${id}`)
      .then((res) => {
        setProductData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      });
  }, [id]);
  useEffect(() => {
    if (productData.length > 0) {
      console.log("productData :>> ", productData);
    }
  }, [productData]);

  const onSubmit = async (data) => {
    data.userId = userInfo.id;
     
    // Vérification si l'utilisateur existe déjà (assurez-vous d'avoir une route pour ça dans votre backend)
  axios.get(`${backendURL}/users/${data.userId}`)
  .then(userRes => {
    if (userRes.status === 200) {
    // Création de l'entrée d'expédition
      axios.post(`${backendURL}/shipping`, data)
      .then(shippingRes => {
        console.log("Shipping created successfully", shippingRes);

    // Ajout de l'ID de l'expédition aux données de la commande
        const orderData = {
          ...data,
          shippingId: shippingRes.data.id
        };

    // Création de la commande
  axios.post(`${backendURL}/order`, orderData)
  .then(orderRes => {
    console.log("Order created successfully", orderRes);
    // Redirigez l'utilisateur vers la page de confirmation de commande
    navigate('/confirmation', { state: { orderData, productData, backendURL, shippingData: data } });
  })
  .catch(orderError => {
    console.error("Error creating the order:", orderError);
  });

  })
      .catch(shippingError => {
        console.error("Error creating shipping:", shippingError);
      });
  } else {
    console.error("User does not exist");
    // Gérez l'erreur ici, peut-être afficher un message à l'utilisateur
  }
  })
.catch(userError => {
  console.error("Error fetching user:", userError);
    // Gérez l'erreur ici, peut-être afficher un message à l'utilisateur
  }); 
}

  return (
    <main className="main flex flex-col gap-6 bg-[#FCE3D7] text-center md:gap-10 lg:flex-row lg:gap-0">
      <section className="sell-section flex flex-col gap-6 pt-12 text-center lg:w-1/3 lg:pb-4 lg:pt-0">
      <div className="flex w-full flex-col gap-4 sm:gap-8 lg:h-full lg:items-center lg:justify-center">
        <h1 className="h2">Passez votre commande</h1>
        <h3 className="mx-auto w-[80%] text-start lg:text-center lg:text-lg">
      Complétez vos informations pour que votre article puisse vous trouver.
        </h3>
        <div className="w-[80%] flex-col gap-2 self-center lg:flex lg:w-[70%]">
          <p className="text-start lg:block lg:font-medium">
        * <span className="underline underline-offset-4">Toutes ces informations sont obligatoires</span>
          </p>
        </div>
      </div>
      </section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="params-product-form items-center gap-4 pb-8 sm:gap-6 lg:ml-[33%] lg:flex lg:w-3/4 lg:flex-col lg:bg-white lg:pb-8 lg:pt-16">
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
              <input type="text" name="address" {...register("address")}/>
              {errors.address && (
                <span className="error-span">{errors.address.message}</span>
              )}
            </div>

            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>* Ville :</label>
              <input type="text" name="city" {...register("city")} />
              {errors.city && (
                <span className="error-span">{errors.city.message}</span>
              )}
            </div>
            
            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>* Code postal :</label>
              <input
                type="text"
                name="postalCode"
                {...register("postalCode")}
              />
              {errors.postalCode && (
                <span className="error-span">{errors.postalCode.message}</span>
              )}
            </div>
            
            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>* Pays :</label>
              <input type="text" name="country" {...register("country")} />
              {errors.country && (
                <span className="error-span">{errors.country.message}</span>
              )}
            </div>
          </div>

          <div className="flex w-[90%] flex-col gap-4 sm:w-[80%] sm:gap-6 md:w-[70%] lg:w-1/2 lg:items-start">
            
            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>* Nom :</label>
              <input type="text" name="lastname" {...register("lastname")} />
              {errors.lastname && (
                <span className="error-span">{errors.lastname.message}</span>
              )}
            </div>

            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>* Prénom :</label>
              <input type="text" name="firstname" {...register("firstname")} />
              {errors.firstname && (
                <span className="error-span">{errors.firstname.message}</span>
              )}
            </div>

            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>* Méthode de livraison :</label>
              <select name="shippingMethod" {...register("shippingMethod")}>
                <option value="">Sélectionnez une option</option>
                <option value="point-relais">Envoi en point relais (2J ouvrés)                </option>
                <option value="laposte">Envoi à domicile (3J ouvrés)
                </option>
              </select>
              {errors.shippingMethod && (
                <span className="error-span">
                  {errors.shippingMethod.message}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          className="h2 button mt-8 w-[90%] sm:w-[80%] md:w-[70%] lg:mx-auto lg:w-1/2">
          Passer la commande
        </button>
      </form>
    </main>
  );
}
