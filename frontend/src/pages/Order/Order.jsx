import { useContext, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function Order() {
  const { userInfo } = useContext(GlobalContext);

  return (
    <>
      <main className="main my-8">
        <h1 className="h1 my-8 text-center">Page de commande</h1>;
      </main>
    </>
  );
}
