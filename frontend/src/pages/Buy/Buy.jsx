import { Link } from "react-router-dom";
import { AiOutlineFilter } from "react-icons/ai";

/* eslint-disable react/no-unescaped-entities */
export default function Buy() {
  return (
    <main className="main flex flex-col justify-center">
      <div className="buy-page-home">
        <h2 className="buy-page-home-h2">Filtrer par catégorie</h2>
        <div className="buy-imgs">
          <img
            className="buy-img"
            src="./../../../public/images/man-image.png"
            alt="man-img"
          />
          <img
            className="buy-img"
            src="./../../../public/images/woman-image.png"
            alt="woman-img"
          />
          <img
            className="buy-img"
            src="./../../../public/images/kids-image.png"
            alt="kids-img"
          />
        </div>
        <div className="tendence">
          <h2 className="buy-page-home-h2">Tendences du moment</h2>
          <Link to="/buy" className="button-filter relative pl-3 pr-9">
            Filtres
            <AiOutlineFilter className="absolute bottom-1 right-1 text-xl text-[#ec5a13] " />
          </Link>
        </div>
      </div>
    </main>
  );
}
