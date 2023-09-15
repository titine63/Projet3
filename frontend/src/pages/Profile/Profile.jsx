import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContextProvider";

export default function Profile() {
  const { isLogged, setIsLogged } = useContext(GlobalContext);

  function handleLogin() {
    setIsLogged(isLogged ? false : true);
  }

  return (
    <>
      <h1 className="h1">Votre profil</h1>
      <h2 className="h2">
        Retrouvez vos annonces et vos commandes ainsi que vos informations de
        profil ici
      </h2>
      <button onClick={handleLogin} type="button" className="button ml-8 mt-16">
        Se déconnecter
      </button>
    </>
  );
}
