/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { Navigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Login() {
  const { isLogged, setIsLogged } = useContext(GlobalContext);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  function handleLogin() {
    setIsLogged(isLogged ? false : true);
    setShouldRedirect(true);
  }

  if (shouldRedirect) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <>
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
          />
          <RiLockPasswordFill className=" absolute bottom-[5.1rem] left-10 text-xl text-[#5e5e5e]" />
          <input
            type="password"
            id="password"
            name="password"
            className="input-auth"
            placeholder="Mot de passe"
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
    </>
  );
}

//******************************************************************** */
{
  /* <section className="section">
        <h2 className="h2">Connectez-vous</h2>
        <form className="form">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input"
            placeholder="Email"
          />
          <label htmlFor="password" className="label">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="input"
            placeholder="Mot de passe"
          />
        </form>
        <button onClick={handleLogin} type="button" className="button">
          Se connecter
        </button>
      </section> */
}
/***************************************************** */
