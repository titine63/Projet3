/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { GlobalContext } from "../../../contexts/GlobalContextProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Navigate, Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";

export default function LoginForm({ className }) {
  // Importer les états et fonctions depuis le contexte global`
  const { isLogged, setIsLogged } = useContext(GlobalContext);
  const [shouldRedirect, setShouldRedirect] = useState(false);

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

  function onSubmit(data) {
    console.log(data);
    setIsLogged(!isLogged);
    setShouldRedirect(true);
  }

  // Si l'utilisateur est connecté, on le redirige vers la page de profil
  if (shouldRedirect) {
    return <Navigate to="/profile" replace />;
  }
  return (
    <>
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
        <Link to="#" className="md:text:lg mt-2 text-center underline lg:mt-4">
          Oups ! Mot de passe oublié ?
        </Link>
        <button type="submit" className="button-auth">
          Se connecter
        </button>
        <Link to="/register" className="mt-5 underline md:text-lg lg:hidden">
          Pas encore du compte ?
        </Link>
      </form>
    </>
  );
}
