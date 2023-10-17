/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { GlobalContext } from "./../../contexts/GlobalContextProvider";
import { LiaTimesCircleSolid } from "react-icons/lia";
import { MdOutlineAddBox } from "react-icons/md";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function ProductForm({
  setModalVisible,
  setSuccessMessage,
  setCreatedProductId,
}) {
  const { userInfo } = useContext(GlobalContext);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function handlePictureChange(event) {
    if (event.target.files.length > 6) {
      alert("Vous ne pouvez sélectionner que 4 fichiers au maximum.");
      return;
    }
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewURLs((previewURLs) => [...previewURLs, ...urls]);
  }

  function handleRemoveFile(index) {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);

    const newURLs = [...previewURLs];
    newURLs.splice(index, 1);
    setPreviewURLs(newURLs);
  }

  console.log("selectedFiles :>> ", selectedFiles);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    selectedFiles.forEach((file, index) => {
      data.append(`pictures[${index}]`, file);
    });
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post(`${backendURL}/product`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage(
        `Votre annonce "${response.data.title}" est maintenant en ligne !`,
      );
      setModalVisible(true);
      setCreatedProductId(response.data.id);
      console.log("Annonce créée avec succès :", response.data);
    } catch (error) {
      console.error("Erreur lors de la création de l'annonce :", error);
    }
  };

  return (
    <>
      <form
        className="params-product-form items-center lg:flex lg:w-3/4 lg:flex-col lg:bg-white lg:pb-8 lg:pt-16"
        onSubmit={handleSubmit}
      >
        <div className="lg: mb-8 flex flex-col items-center gap-2 lg:w-[80%] lg:flex-row lg:gap-4">
          <label className="w-[90%] text-start sm:w-[80%] md:w-[70%] lg:flex-[1]">
            ** Ajouter des photos :
          </label>
          <input
            type="file"
            name="pictures"
            id="fileInput"
            multiple
            className="hidden"
            onChange={handlePictureChange}
          />

          <div className="grid w-[90%] grid-cols-2 items-center justify-center gap-4 sm:w-[80%] md:w-[70%] lg:flex-[3] xl:grid-cols-3">
            {previewURLs.length > 0
              ? previewURLs.map((url) => (
                  <div
                    key={url}
                    className="relative"
                    onMouseEnter={() =>
                      setHoveredIndex(previewURLs.indexOf(url))
                    }
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {hoveredIndex === previewURLs.indexOf(url) && (
                      <LiaTimesCircleSolid
                        className="absolute right-1/2 top-1/2 z-10 h-28 w-28 -translate-y-1/2 translate-x-1/2 cursor-pointer text-slate-600 opacity-60 hover:block "
                        onClick={() =>
                          handleRemoveFile(previewURLs.indexOf(url))
                        }
                      />
                    )}
                    <img
                      src={url}
                      alt="preview picture"
                      className="h-36 cursor-pointer rounded-md object-cover sm:h-44 sm:w-full"
                    />
                  </div>
                ))
              : null}
            {previewURLs.length < 6 ? (
              <MdOutlineAddBox
                src="/images/add-square.svg"
                className="h-32 w-32 cursor-pointer rounded-md object-cover text-slate-500 hover:opacity-70 sm:h-40 sm:w-40"
                onClick={() => document.getElementById("fileInput").click()}
              />
            ) : null}
          </div>
        </div>

        <div className="flex h-full flex-col items-center gap-6 lg:w-[80%] lg:flex-row lg:justify-between lg:gap-16">
          <div className="flex w-[90%] flex-col gap-4 sm:w-[80%] md:w-[70%] lg:w-1/2">
            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>* Titre :</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>* Prix :</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>* Type de vêtements :</label>
              <select
                name="clothing_type"
                value={formData.clothingType}
                onChange={handleChange}
              >
                <option value="">Sélectionnez une option</option>
                <option value="T-shirt">T-shirt</option>
                <option value="Pantalon">Pantalon</option>
                <option value="Jean">Jean</option>
                <option value="Robe">Robe</option>
                <option value="Short">Short</option>
                <option value="Sous-vêtement">Sous-vêtement</option>
              </select>
            </div>

            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>* Description :</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                cols={30}
              />
            </div>
          </div>

          <div className="flex w-[90%] flex-col gap-4 sm:w-[80%] md:w-[70%] lg:w-1/2 lg:items-start">
            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>* Catégorie :</label>
              <select
                className=""
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Sélectionnez une option</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
                <option value="Enfant">Enfant</option>
              </select>
            </div>

            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>Marque :</label>
              <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              >
                <option value="">Sélectionnez une option</option>
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
                <option value="Lacoste">Lacoste</option>
                <option value="About-You">About you</option>
                <option value="Celio">Celio</option>
                <option value="Puma">Puma</option>
              </select>
            </div>

            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>Etat :</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">Sélectionnez une option</option>
                <option value="Neuf">Neuf</option>
                <option value="Très bon état">Très bon état</option>
                <option value="Bon état">Bon état</option>
                <option value="Satisfaisnt">Satisfaisnt</option>
              </select>
            </div>

            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>Taille :</label>
              <select name="size" value={formData.size} onChange={handleChange}>
                <option value="">Sélectionnez une option</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="XXXL">XXXL</option>
              </select>
            </div>

            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>Couleur :</label>
              <select
                name="color"
                value={formData.color}
                onChange={handleChange}
              >
                <option value="">Sélectionnez une option</option>
                <option value="Rouge">Rouge</option>
                <option value="Orange">Orange</option>
                <option value="Gris">gris</option>
                <option value="Noir">noir</option>
                <option value="Bleu">bleu</option>
                <option value="Vert">vert</option>
                <option value="Jaune">jaune</option>
                <option value="Violet">violet</option>
              </select>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="h2 button mt-8 w-[90%] sm:w-[80%] md:w-[70%] lg:mx-auto lg:w-1/2"
        >
          Déposer l'annonce
        </button>
      </form>
    </>
  );
}