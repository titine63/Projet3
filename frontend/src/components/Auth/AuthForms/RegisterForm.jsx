/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "./../../../contexts/GlobalContextProvider";
import { AiOutlineUser, AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../../utils/const";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function RegisterForm({ className }) {
  const { setModalContent, showToast } = useContext(GlobalContext);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(registerSchema),
  });

  async function onSubmit(data) {
    try {
      const response = await axios.post(`${backendURL}/auth/register`, data);

      if (response.status === 201) {
        setModalContent(true);
        showToast(
          "Inscription réussie ! Vous pouvez maintenant vous connecter.",
        );
      }
    } catch (error) {
      console.error("Erreur d'inscription:", error);
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
      <div className="div-input">
        <RiLockPasswordFill className=" absolute left-5 top-[0.9rem] text-xl text-[#5e5e5e]" />
        <input
          type={showPassword ? "text" : "password"}
          id="confirmpassword"
          name="confirmpassword"
          className="input-auth"
          placeholder="Confirmez le mot de passe"
          {...register("confirmpassword")}
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
        {errors.confirmpassword && (
          <span className="error-span">{errors.confirmpassword.message}</span>
        )}
      </div>

      <button type="submit" className="button-auth">
        Créer un compte
      </button>
      <Link
        to="/login"
        className="text-l mt-5 underline underline-offset-2 md:text-lg lg:hidden"
      >
        Vous avez déjà un compte ?
      </Link>
    </form>
  );
}
