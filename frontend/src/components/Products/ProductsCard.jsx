/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  const {
    title,
    description,
    price,
    size,
    image,
    clothing_type,
    brand,
    color,
    category,
    state,
  } = product;

  return (
    <main className="relative">
      <div className="hidden xl:fixed xl:left-[5%] xl:top-28 xl:block xl:w-[32%]">
        <img src={image} alt={title} className="w-full" />
      </div>
      <div className="product-card top-8 my-6 xl:absolute xl:right-[15%] xl:w-[37%] ">
        <h1 className="h1">{title}</h1>
        <img src={image} alt={title} className="product-imgs xl:hidden" />
        <p className="product-price">{price} €</p>
        <div className="product-details xl:gap-6">
          <Link to="/favorites">
            <p className="btn-fav">Ajouter aux favoris</p>
          </Link>
          <p className="titles mt-7">Description</p>

          <p className="product-description">{description}</p>
          <p className="titles">Critères</p>
          <div className="product-Criteria">
            <p>
              <span className="criterias">
                Catégorie <br />
              </span>
              {category}
            </p>
            <p>
              <span className="criterias">
                Type de vêtement <br />
              </span>
              {clothing_type}
            </p>
            <p>
              <span className="criterias">
                Taille <br />
              </span>
              {size}
            </p>
            <p>
              <span className="criterias">
                Marque <br />
              </span>
              {brand}
            </p>
            <p>
              <span className="criterias">
                Couleur <br />
              </span>
              {color}
            </p>
            <p>
              <span className="criterias">
                Etat <br />
              </span>
              {state}
            </p>
          </div>
          <Link to="/card">
            <p className="buy-btn">Acheter</p>
          </Link>

          <p className="titles">User</p>
          <div className="user-section">
            <Link to="/profile">
              <p className="btn-user">Voir son profil</p>
            </Link>
            <Link to="/messages">
              <p className="btn-user">Envoyer un message</p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    clothing_type: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
};
export default ProductCard;
