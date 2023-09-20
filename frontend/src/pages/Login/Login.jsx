/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { useForm } from "react-hook-form";
import { Navigate, Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";

// Contenu de la page de connexion en mobile
export default function Login() {
  // Importer les états et fonctions depuis le contexte global`
  const { isLogged, setIsLogged } = useContext(GlobalContext);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const { register } = useForm();

  // Gestionnaire pour mettre à jour l'état isLogged
  function handleLogin() {
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
        <form className="form relative">
          <HiOutlineMail className=" absolute bottom-[9.3rem] left-10 text-xl text-[#5e5e5e]" />
          <input
            type="email"
            id="email"
            name="email"
            className="input-auth"
            placeholder="Email"
            ref={register("email")}
          />
          <RiLockPasswordFill className=" absolute bottom-[5.1rem] left-10 text-xl text-[#5e5e5e]" />
          <input
            type="password"
            id="password"
            name="password"
            className="input-auth"
            placeholder="Mot de passe"
            ref={register("password")}
          />
          <Link to="#" className="text-center text-xs underline">
            Oups ! Mot de passe oublié ?
          </Link>
        </form>
        <button onClick={handleLogin} type="submit" className="button-auth">
          Se connecter
        </button>

        <Link to="/register" className="text-l mt-5 underline">
          Pas encore du compte ?
        </Link>
      </section>
    </main>
  );
}
