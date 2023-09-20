/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Navigate, Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";

// Contenu de la page de connexion en mobile
export default function Login() {
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
    setIsLogged(isLogged ? false : true);
    setShouldRedirect(true);
  }

  // Si l'utilisateur est connecté, on le redirige vers la page de profil
  if (shouldRedirect) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <main className="main flex flex-col justify-center">
      <section className="section">
        <div>
          <h2 className="h2">
            Connectez<span className="text-[#ec5a13]">.</span>
          </h2>
          <h2 className="h2">
            Explorez<span className="text-[#ec5a13]">.</span>
          </h2>
          <h2 className="h2">
            Economisez<span className="text-[#ec5a13]">.</span>
          </h2>
        </div>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <HiOutlineMail className=" absolute left-5 top-[0.9rem] text-xl text-[#5e5e5e]" />
            <input
              type="email"
              id="email"
              name="email"
              className="input-auth"
              placeholder="Email"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <span className=" font-semibold text-red-500">
              {errors.email.message}
            </span>
          )}
          <div className="relative">
            <RiLockPasswordFill className=" absolute bottom-[0.9rem] left-5 text-xl text-[#5e5e5e]" />
            <input
              type="password"
              id="password"
              name="password"
              className="input-auth"
              placeholder="Mot de passe"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <span className=" font-semibold text-red-500">
              {errors.password.message}
            </span>
          )}
          <Link to="#" className="text-center text-xs underline">
            Oups ! Mot de passe oublié ?
          </Link>
        </form>
        <button type="submit" className="button-auth">
          Se connecter
        </button>

        <Link to="/register" className="text-l mt-5 underline">
          Pas encore du compte ?
        </Link>
      </section>
    </main>
  );
}
