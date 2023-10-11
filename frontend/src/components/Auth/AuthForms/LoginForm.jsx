/* eslint-disable react/prop-types */
//LoginForm.jsx
import { useContext, useState } from "react"; // Import useState
import { GlobalContext } from "./../../../contexts/GlobalContextProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import Cookies from "js-cookie";
import ModalResetPassword from "./../../../components/Auth/Modals/ModalResetPassword"; // Import du composant
import ModalError from "./../../../components/Auth/Modals/ModalError"; // Import du composant

export default function LoginForm({ className }) {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const { setIsLogged, closeModal, setUserInfo } = useContext(GlobalContext);
  const [showErrorModal, setShowErrorModal] = useState(false); // Ajout de l'état pour la modale d'erreur
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  let navigate = useNavigate();

  const schema = yup
    .object({
      email: yup
        .string()
        .required("Ce champ est obligatoire.")
        .email("L'email est incorrect."),
      password: yup
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
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
      const response = await axios.post(`${backendURL}/auth/login`, data);
      if (response.status === 200 && response.data.access_token) {
        console.log("response.data login :>> ", response.data);
        Cookies.set("token", response.data.access_token);
        Cookies.set("user.id", response.data.user.id);
        Cookies.set("user.email", response.data.user.email);
        Cookies.set("user.pseudo", response.data.user.pseudo);
        Cookies.set("user.picture", response.data.user.picture);
        Cookies.set("user.createdAt", response.data.user.createdAt);
        Cookies.set("user", response.data.user);
        const userData = {
          id: response.data.user.id,
          email: response.data.user.email,
          pseudo: response.data.user.pseudo,
          picture: response.data.user.picture,
          createdAt: response.data.user.createdAt,
        };

        const serialisedUserData = JSON.stringify(userData);
        Cookies.set("userData", serialisedUserData);

        setIsLogged(true);

        // const profileResponse = await axios.get(`${backendURL}/auth/profile`, {
        //   headers: {
        //     Authorization: `Bearer ${response.data.access_token}`,
        //   },
        // });

        // setUserInfo(profileResponse.data);
        closeModal();
        navigate("/profile");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setShowErrorModal(true); // Afficher la modale d'erreur si une erreur se produit
    }
  }

  return (
    <>
      {/* Modale d'erreur */}
      <ModalError
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
      />

      {/* Modale de réinitialisation du mot de passe */}
      <ModalResetPassword
        isOpen={showResetPasswordModal}
        onClose={() => setShowResetPasswordModal(false)}
      />

      <form className={className} onSubmit={handleSubmit(onSubmit)}>
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
        <Link
          to="#"
          className="md:text:lg mt-2 text-center underline lg:mt-4"
          onClick={() => setShowResetPasswordModal(true)}
        >
          Oups ! Mot de passe oublié ?
        </Link>

        <button type="submit" className="button-auth">
          Se connecter
        </button>
        <Link to="/register" className="mt-5 underline md:text-lg lg:hidden">
          Pas encore de compte ?
        </Link>
      </form>
    </>
  );
}
