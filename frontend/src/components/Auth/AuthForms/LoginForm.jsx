// LoginForm.jsx
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GlobalContext } from "./../../../contexts/GlobalContextProvider";
import ModalResetPassword from "./../../../components/Auth/Modals/ModalResetPassword";
import ModalError from "./../../../components/Auth/Modals/ModalError";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../utils/const";
import Cookies from "js-cookie";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

// eslint-disable-next-line react/prop-types
export default function LoginForm({ className }) {
  const { setIsLogged, setShowAuthModal } = useContext(GlobalContext);
  const [showPassword, setShowPassword] = useState(false);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
  });

  async function onSubmit(data) {
    try {
      const response = await axios.post(`${backendURL}/auth/login`, data);
      if (response.status === 200 && response.data.access_token) {
        console.log("response.data login :>> ", response.data);

        Cookies.set("token", response.data.access_token);

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
        setShowAuthModal(false);
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
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="input-auth"
            placeholder="Mot de passe"
            {...register("password")}
          />
          {showPassword ? (
            <AiFillEye
              className="absolute right-5 top-[0.9rem] cursor-pointer text-xl text-[#5e5e5e]"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <AiFillEyeInvisible
              className="absolute right-5 top-[0.9rem] cursor-pointer text-xl text-[#5e5e5e]"
              onClick={() => setShowPassword(true)}
            />
          )}

          {errors.password && (
            <span className="error-span">{errors.password.message}</span>
          )}
        </div>
        <Link
          to="#"
          className="md:text:lg mt-2 text-center underline underline-offset-2 lg:mt-4"
          onClick={() => setShowResetPasswordModal(true)}
        >
          Oups ! Mot de passe oublié ?
        </Link>

        <button type="submit" className="button-auth">
          Se connecter
        </button>
        <Link
          to="/register"
          className="mt-5 underline underline-offset-2 md:text-lg lg:hidden"
        >
          Pas encore de compte ?
        </Link>
      </form>
    </>
  );
}
