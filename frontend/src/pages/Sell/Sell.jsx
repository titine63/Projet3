/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";

export default function Sell() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <main className="sell-page main">
      <div className="text-command flex flex-col gap-7 text-center  lg:w-1/4 lg:justify-between">
        <div className="flex flex-col gap-7 lg:h-full lg:items-center lg:justify-center">
          <h2 className="mt-7 text-2xl font-semibold ">
            Déposez votre annonce
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
        <div className="params-command">
          <div className="flex flex-col gap-3">
            <h3>* Titre :</h3>
            <input type="text" />

            <h3>* Description :</h3>
            <textarea id="description" name="description" rows={5} cols={40} />

            <h3>* Prix :</h3>
            <input type="number" />

            <h3>* Type de vêtements :</h3>
            <select name="clothing_type">
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
            <select name="Catégorie">
              <option value="">Sélectionnez une option...</option>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
              <option value="Enfant">Enfant</option>
            </select>

            <h3>Marque :</h3>
            <select name="brand">
              <option value="">Sélectionnez une option...</option>
              <option value="Nike">Nike</option>
              <option value="Adidas">Adidas</option>
              <option value="Lacoste">Lacoste</option>
              <option value="About-You">About you</option>
              <option value="Celio">Celio</option>
              <option value="Puma">Puma</option>
            </select>

            <h3>Etat :</h3>
            <select name="state">
              <option value="">Sélectionnez une option...</option>
              <option value="Neuf">Neuf</option>
              <option value="Très bon état">Très bon état</option>
              <option value="bon état">bon état</option>
              <option value="Satisfaisnt">Satisfaisnt</option>
            </select>

            <h3>Taille :</h3>
            <select name="size">
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
            <select name="color">
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
        <button className="btn-command mt-7 lg:mx-auto lg:mt-14 lg:w-[70%] ">
          Déposer l'annonce
        </button>
      </div>
    </main>
  );
}
