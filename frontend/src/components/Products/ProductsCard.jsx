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
    Etat,
  } = product;

  return (
    <div className="product-card">
      <h2 className="h2">{title}</h2>
      <img src={image} alt={title} className="product-imgs" />
      <p className="product-price">{price}</p>
      <div className="product-details">
        <Link to="/favorites">
          <p className="btn-fav">Ajouter aux favorits</p>
        </Link>
        <p className="titles mt-7">Desciption</p>

        <p className="product-description">{description}</p>
        <p className="titles">Critères</p>
        <div className="product-Criteria">
          <p> Catégorie {category}</p>
          <p> Type de vêtements {clothing_type}</p>
          <p> Taille {size}</p>
          <p> Marque {brand}</p>
          <p> Coleur {color}</p>
          <p> Etat {Etat}</p>
        </div>
        <Link to="/card">
          <p className="buy-btn">Acheter</p>
        </Link>
        <div className="user-section">
          <p className="titles">User</p>
          <Link to="/profile">
            <p className="btn-user">Voir son profile</p>
          </Link>
          <Link to="/messages">
            <p className="btn-user">Envoyer un message</p>
          </Link>
        </div>
      </div>
    </div>
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
    Etat: PropTypes.string.isRequired,
  }).isRequired,
};
export default ProductCard;
