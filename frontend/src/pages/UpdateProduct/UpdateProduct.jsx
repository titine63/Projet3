/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../../components/ProductForm/ProductForm";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${backendURL}/product/${id}`)
      .then((res) => {
        setProductData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const handleSeeProduct = () => {
    navigate(`/buy/product/${id}`);
  };

  return (
    <main className="main flex flex-col gap-10 bg-[#FCE3D7] text-center lg:flex-row lg:gap-0">
      <section className="sell-section flex flex-col gap-6 pt-12 text-center lg:w-1/3 lg:pb-4 lg:pt-0">
        <div className="flex w-full flex-col gap-8 lg:h-full lg:items-center lg:justify-center">
          <h1 className="h2">Mettez à jour votre annonce</h1>
          <h3 className="mx-auto w-[80%] text-start lg:text-center lg:text-lg">
            Pour augmenter vos chances de trouver le bon contact, ajoutez des
            informations au max !
          </h3>
        </div>
        <div className="hidden w-[80%] flex-col gap-2 self-center lg:flex lg:w-[70%]">
          <p className="text-start lg:block lg:font-medium">
            *{" "}
            <span className="underline underline-offset-4">
              Informations obligatoires
            </span>
          </p>
          <p className="text-start lg:block lg:font-medium">
            **{" "}
            <span className="underline underline-offset-4">
              Vous pouvez ajouter jusqu'à 6 photos{" "}
            </span>
          </p>
        </div>
      </section>
      <ProductForm
        setModalVisible={setModalVisible}
        setSuccessMessage={setSuccessMessage}
        productData={productData}
        mode="update"
      />
      {modalVisible && (
        <div className="fixed left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 flex-col justify-center bg-[#fce3d7] p-12 text-center text-lg lg:text-2xl ">
          <div className="modal-content">
            <p className="mb-14">{successMessage}</p>
            <div className="flex flex-col justify-center gap-5 lg:flex-row">
              <button
                className="button flex justify-center"
                onClick={() => handleSeeProduct()}
              >
                Voir l'annonce
              </button>
            </div>
            <img
              src="./../../../public/images/ink.png"
              alt="lnk"
              className="fixed bottom-16 right-0 w-28 lg:bottom-0 lg:w-64"
            />
          </div>
        </div>
      )}
    </main>
  );
}
