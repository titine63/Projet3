import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContextProvider";

export default function Login() {
  const { isLogged, setIsLogged } = useContext(GlobalContext);

  function handleLogin() {
    setIsLogged(isLogged ? false : true);
  }

  return (
    <>
      <section className="section">
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
          <button onClick={handleLogin} type="button" className="button">
            Se connecter
          </button>
        </form>
      </section>
    </>
  );
}
