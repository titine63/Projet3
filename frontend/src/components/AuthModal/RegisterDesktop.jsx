/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContextProvider";

export default function RegisterDeskop() {
  const { isLogged, setIsLogged, closeModal, handleModalContent } =
    useContext(GlobalContext);

  function handleLogin() {
    setIsLogged(isLogged ? false : true);
  }
  return (
    <>
      <div className="modal-login">
        <div className="login-left-part">
          <form className="w-30 form top- absolute left-[20%]">
            <h2 className="h2">Connectez</h2>
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
        </div>
        <div className="login-right-part">
          <span className="close-button" onClick={closeModal}>
            &times;
          </span>
          <div className="absolute top-12 text-white">
            <p className="text-white">Connectez-vous et rejoignez l'éco-mode</p>
            <button
              onClick={handleModalContent}
              type="button"
              className="button-switch"
            >
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
