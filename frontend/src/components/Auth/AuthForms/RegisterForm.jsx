//RegisterForm.jsx
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { GlobalContext } from "./../../../contexts/GlobalContextProvider";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Cookies from "js-cookie"; // Ajout de l'importation de js-cookie

export default function RegisterForm({ className }) {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const { setIsLogged, closeModal, setUserInfo } = useContext(GlobalContext); // Ajout de closeModal
  //const [shouldRedirect, setShouldRedirect] = useState(false);
  let navigate = useNavigate();

  const schema = yup
    .object({
      pseudo: yup.string().required("Ce champ est obligatoire."),
      email: yup
        .string()
        .required("Ce champ est obligatoire.")
        .email("L'email est incorrect."),
      password: yup
        .string()
        .min(8, "Au minimum au moins 8 caractères.")
        .required("Ce champ est obligatoire."),
      confirmpassword: yup
        .string()
        .oneOf(
          [yup.ref("password"), null],
          "Les mots de passe ne correspondent pas.",
        )
        .required("Ce champ est obligatoire."),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    try {
      console.log("Données du formulaire:", data); // Debug 1
      console.log("Envoi de la requête d'inscription..."); // Debug 2

      const response = await axios.post(`${backendURL}/auth/register`, data);

      console.log("Réponse reçue:", response); // Debug 3
      console.log("Statut de la réponse:", response.status); // Debug 4

      if (response.status === 200 || response.status === 201) {
        Cookies.set("token", response.data.access_token);

        console.log("Cookie créé:", response.data.access_token); // Debug 5

        setIsLogged(true);
        console.log("Est connecté:", true); // Debug 6

        const profileResponse = await axios.get(`${backendURL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${response.data.access_token}`,
          },
        });

        setUserInfo(profileResponse.data);
        console.log(
          "Informations de l'utilisateur mises à jour:",
          profileResponse.data,
        ); // Debug 7

        closeModal();
        console.log("Fermeture de la modale"); // Debug 8

        console.log("Redirection vers le profil..."); // Debug 9
        navigate("/profile");
      }
    } catch (error) {
      console.error("Erreur d'inscription:", error); // Debug 10
    }
  }

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <div className="div-input">
        <AiOutlineUser className="absolute left-5 top-[0.9rem] text-xl text-[#5e5e5e]" />
        <input
          type="text"
          id="pseudo"
          name="pseudo"
          className="input-auth"
          placeholder="Pseudo"
          {...register("pseudo")}
        />
        {errors.pseudo && (
          <span className="error-span">{errors.pseudo.message}</span>
        )}
      </div>
      <div className="div-input">
        <HiOutlineMail className=" absolute left-5 top-[0.9rem] text-xl text-[#5e5e5e]" />
        <input
          type="email"
          id="email"
          name="email"
          className="input-auth"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <span className="error-span">{errors.email.message}</span>
        )}
      </div>
      <div className="div-input">
        <RiLockPasswordFill className=" absolute left-5 top-[0.9rem] text-xl text-[#5e5e5e]" />
        <input
          type="password"
          id="password"
          name="password"
          className="input-auth"
          placeholder="Mot de passe"
          {...register("password")}
        />
        {errors.password && (
          <span className="error-span">{errors.password.message}</span>
        )}
      </div>
      <div className="div-input">
        <RiLockPasswordFill className=" absolute left-5 top-[0.9rem] text-xl text-[#5e5e5e]" />
        <input
          type="password"
          id="confirmpassword"
          name="confirmpassword"
          className="input-auth"
          placeholder="Confirmez le mot de passe"
          {...register("confirmpassword")}
        />
        {errors.confirmpassword && (
          <span className="error-span">{errors.confirmpassword.message}</span>
        )}
      </div>
      <button type="submit" className="button-auth">
        Créer un compte
      </button>
      <Link to="/login" className="text-l mt-5 underline md:text-lg lg:hidden">
        Vous avez déjà un compte ?
      </Link>
    </form>
  );
}
