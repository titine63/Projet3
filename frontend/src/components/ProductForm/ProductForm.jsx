/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LiaTimesCircleSolid } from "react-icons/lia";
import { MdOutlineAddBox } from "react-icons/md";
import { productFormSchema } from "./../../utils/const";
import Cookies from "js-cookie";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function ProductForm({
  productData,
  setModalVisible,
  setSuccessMessage,
  setProductId,
  mode,
}) {
  const userInfo = Cookies.get("userData")
    ? JSON.parse(Cookies.get("userData"))
    : null;

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(productFormSchema),
  });

  useEffect(() => {
    if (productData) {
      setValue("title", productData.title);
      setValue("price", productData.price);
      setValue("description", productData.description);
      setValue("clothing_type", productData.clothing_type);
      setValue("category", productData.category);
      setValue("brand", productData.brand);
      setValue("state", productData.state);
      setValue("size", productData.size);
      setValue("color", productData.color);
      if (productData.pictures) {
        setPreviewURLs(
          productData.pictures.map((picture) => `${backendURL}${picture.url}`),
        );
      }
    }
  }, [productData, setValue]);

  function handlePictureChange(event) {
    if (event.target.files.length > 6) {
      alert("Vous ne pouvez sélectionner que 6 photos au maximum.");
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

    if (mode === "update") {
      const pictureToDelete = productData.pictures[index];
      setImagesToDelete((prevImages) => [...prevImages, pictureToDelete]);
    }
    // Si vous avez des identifiants pour chaque image, ajoutez cette image à la liste imagesToDelete.
    if (mode === "update" && productData.pictures[index].id) {
      setImagesToDelete([...imagesToDelete, productData.pictures[index].id]);
    }
  }

  const uploadImage = async (productId, file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post(`${backendURL}/picture/upload/${productId}`, formData);
      console.log("Picture uploaded");
    } catch (error) {
      console.error("Error uploading the image:", error);
    }
  };

  async function deleteImageFromServer(imageId) {
    try {
      await axios.delete(`${backendURL}/picture/${imageId}`);
      console.log("Image supprimée avec succès :", imageId);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'image :", error);
    }
  }

  async function onSubmit(data) {
    try {
      const payload = {
        ...data,
        userId: userInfo.id,
      };
      if (mode === "create") {
        const response = await axios.post(`${backendURL}/product`, payload);
        const createdProductId = response.data.id;

        // Upload each image with the product ID
        for (const file of selectedFiles) {
          await uploadImage(createdProductId, file);
        }
        setSuccessMessage(
          `Votre annonce "${response.data.title}" est maintenant en ligne !`,
        );
        setModalVisible(true);
        setProductId(response.data.id);
        console.log("Annonce créée avec succès :", response.data);
      } else if (mode === "update") {
        const productId = productData.id;
        const response = await axios.put(
          `${backendURL}/product/${productId}`,
          payload,
        );
        for (const imageId of imagesToDelete) {
          await deleteImageFromServer(imageId);
        }
        // Upload each image with the product ID
        for (const file of selectedFiles) {
          await uploadImage(productId, file);
        }
        setSuccessMessage(
          `Votre annonce "${payload.title}" est maintenant en ligne !`,
        );
        setModalVisible(true);
        setProductId(response.data.id);
        console.log("Annonce modifié avec succès :", response.data);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'annonce :", error);
    }
  }

  return (
    <>
      <form
        className="params-product-form items-center lg:ml-[33%] lg:flex lg:w-3/4 lg:flex-col lg:bg-white lg:pb-8 lg:pt-16"
        onSubmit={handleSubmit(onSubmit)}
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
            {previewURLs && previewURLs.length > 0
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
            {previewURLs && previewURLs.length < 6 ? (
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
              <input type="text" name="title" {...register("title")} />
              {errors.title && (
                <span className="error-span">{errors.title.message}</span>
              )}
            </div>

            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>* Prix :</label>
              <input
                type="number"
                name="price"
                step="0.01"
                min="0"
                {...register("price")}
              />
              {errors.price && (
                <span className="error-span">{errors.price.message}</span>
              )}
            </div>

            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>* Type de vêtements :</label>
              <select name="clothing_type" {...register("clothing_type")}>
                <option value="">Sélectionnez une option</option>
                <option value="T-shirt">T-shirt</option>
                <option value="Chemise">Chemise</option>
                <option value="Pantalon">Pantalon</option>
                <option value="Jean">Jean</option>
                <option value="Short">Short</option>
                <option value="Robe">Robe</option>
                <option value="Pull">Pull</option>
                <option value="Veste">Veste</option>
                <option value="Manteau">Manteau</option>
                <option value="Echarpe">Echarpe</option>
                <option value="Chapeau">Chapeau</option>
                <option value="Sous-vêtements">Sous-vêtements</option>
                <option value="Chaussures">Chaussures</option>
              </select>
              {errors.clothing_type && (
                <span className="error-span">
                  {errors.clothing_type.message}
                </span>
              )}
            </div>

            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>* Description :</label>
              <textarea
                id="description"
                name="description"
                rows={5}
                cols={30}
                {...register("description")}
              />
              {errors.description && (
                <span className="error-span">{errors.description.message}</span>
              )}
            </div>
          </div>

          <div className="flex w-[90%] flex-col gap-4 sm:w-[80%] md:w-[70%] lg:w-1/2 lg:items-start">
            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>* Catégorie :</label>
              <select name="category" {...register("category")}>
                <option value="">Sélectionnez une option</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
                <option value="Enfant">Enfant</option>
              </select>
              {errors.category && (
                <span className="error-span">{errors.category.message}</span>
              )}
            </div>

            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>Marque :</label>
              <select name="brand" {...register("brand")}>
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
              <select name="state" {...register("state")}>
                <option value="">Sélectionnez une option</option>
                <option value="Neuf">Neuf</option>
                <option value="Très bon">Très bon état</option>
                <option value="Bon">Bon état</option>
                <option value="Satisfaisant">Satisfaisnt</option>
              </select>
            </div>

            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>* Taille :</label>
              <select name="size" {...register("size")}>
                <option value="">Sélectionnez une option</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="XXXL">XXXL</option>
              </select>
              {errors.size && (
                <span className="error-span">{errors.size.message}</span>
              )}
            </div>

            <div className="flex w-full flex-col gap-2 lg:items-start">
              <label>Couleur :</label>
              <select name="color" {...register("color")}>
                <option value="">Sélectionnez une option</option>
                <option value="Blanc">Blanc</option>
                <option value="Noir">Noir</option>
                <option value="Gris">Gris</option>
                <option value="Jaune">Jaune</option>
                <option value="Rouge">Rouge</option>
                <option value="Bleu">Bleu</option>
                <option value="Vert">Vert</option>
                <option value="Rose">Rose</option>
                <option value="Violet">Violet</option>
                <option value="Orange">Orange</option>
                <option value="Marron">Marron</option>
                <option value="Doré">Doré</option>
                <option value="Argenté">Argenté</option>
                <option value="Beige">Beige</option>
                <option value="Kaki">Kaki</option>
                <option value="Bordeaux">Bordeaux</option>
                <option value="Moutarde">Moutarde</option>
              </select>
            </div>
          </div>
        </div>
        {mode === "create" ? (
          <button
            type="submit"
            className="h2 button mt-8 w-[90%] sm:w-[80%] md:w-[70%] lg:mx-auto lg:w-1/2"
          >
            Déposer l'annonce
          </button>
        ) : (
          <button
            type="submit"
            className="h2 button mt-8 w-[90%] sm:w-[80%] md:w-[70%] lg:mx-auto lg:w-1/2"
          >
            Modifier l'annonce
          </button>
        )}
      </form>
    </>
  );
}
