/* eslint-disable react/no-unescaped-entities */
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContextProvider";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function UpdateProduct() {
  const { id } = useParams();
  const { userInfo } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${backendURL}/product/${id}`)
      .then((res) => {
        setFormData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brand: "",
    price: "",
    category: "",
    color: "",
    clothing_type: "",
    size: "",
    state: "",
    userId: userInfo.id,
  });
  const titleProduct = formData.title;

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSeeProduct = () => {
    // Redirigez vers la page de l'annonce en utilisant l'ID de l'annonce
    navigate(`/buy/product/${id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoi de la requête Patch au backend
      const response = await axios.patch(
        `${backendURL}/product/${id}`,
        formData,
      );

      // Si la requête est réussie, vous pouvez gérer la réponse ici
      setSuccessMessage(
        `Votre annonce "${titleProduct}" est maintenant mise à jour !`,
      );
      setModalVisible(true);

      console.log("Annonce a été mise à jour avec succès :", response.data);
    } catch (error) {
      // En cas d'erreur, vous pouvez gérer l'erreur ici
      console.error("Erreur lors de la mise à jour de l'annonce :", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <main className="sell-page main">
      <div className="text-command flex flex-col gap-7 text-center  lg:w-1/4 lg:justify-between">
        <div className="flex flex-col gap-7 lg:h-full lg:items-center lg:justify-center">
          <h2 className="mt-7 text-2xl font-semibold ">
            Mettez à jour votre annonce
          </h2>
          <h3 className="px-5">
            Pour augmenter vos chances de trouver le bon contact, ajoutez des
            informations au max !
          </h3>
        </div>

        <h2 className="hidden items-end text-center lg:block">
          * Des informations obligatoires
        </h2>
      </div>
      <div className="command lg:flex lg:w-3/4 lg:flex-col lg:justify-center lg:bg-white">
        <div className="upload-photo mt-10">
          {!selectedFile && <h2>Sélectionnez une image pour votre commande</h2>}
          <input type="file" onChange={handleFileSelect} />
          {selectedFile && (
            <div className="mt-5 flex flex-col items-center justify-center">
              <h3>L'image sélectionnée pour votre commande :</h3>
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Image sélectionnée"
                className="h-[159.11px] w-[155px] rounded-full"
              />
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="params-command">
            <div className="flex flex-col gap-3">
              <h3>* Titre :</h3>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />

              <h3>* Description :</h3>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                cols={40}
              />

              <h3>* Prix :</h3>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />

              <h3>* Type de vêtements :</h3>
              <select
                name="clothing_type"
                value={formData.clothingType}
                onChange={handleChange}
              >
                <option value="">Sélectionnez une option...</option>
                <option value="T-shert">T-shert</option>
                <option value="Pantalon">Pantalon</option>
                <option value="Jean">Jean</option>
                <option value="Rob">Rob</option>
                <option value="Short">Short</option>
                <option value="Sous-vêtement">Sous-vêtement</option>
              </select>
            </div>

            <div className="flex flex-col gap-3">
              <h3>* Catégorie :</h3>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Sélectionnez une option...</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
                <option value="Enfant">Enfant</option>
              </select>

              <h3>Marque :</h3>
              <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              >
                <option value="">Sélectionnez une option...</option>
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
                <option value="Lacoste">Lacoste</option>
                <option value="About-You">About you</option>
                <option value="Celio">Celio</option>
                <option value="Puma">Puma</option>
              </select>

              <h3>Etat :</h3>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">Sélectionnez une option...</option>
                <option value="Neuf">Neuf</option>
                <option value="Très bon état">Très bon état</option>
                <option value="bon état">bon état</option>
                <option value="Satisfaisnt">Satisfaisnt</option>
              </select>

              <h3>Taille :</h3>
              <select name="size" value={formData.size} onChange={handleChange}>
                <option value="">Sélectionnez une option...</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="XXXL">XXXL</option>
              </select>

              <h3>couleur :</h3>
              <select
                name="color"
                value={formData.color}
                onChange={handleChange}
              >
                <option value="">Sélectionnez une option...</option>
                <option value="rouge">Rouge</option>
                <option value="orange">Orange</option>
                <option value="gris">gris</option>
                <option value="noir">noir</option>
                <option value="bleu">bleu</option>
                <option value="vert">vert</option>
                <option value="jaune">jaune</option>
                <option value="violet">violet</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="btn-command mt-7 lg:mx-auto lg:mt-14 lg:w-[70%] "
          >
            Mettre à jour l'annonce
          </button>
        </form>
      </div>
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
