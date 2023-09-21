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
  } = product;

  return (
    <div className="product-card">
      <h2 className="h2">{title}</h2>
      <img src={image} alt={title} className="product-imgs" />
      <p className=" text-2xl text-[#ec5a13]">{price}</p>
      <div className="product-details">
        <Link to="/favorites">
          <p className=" w-72 bg-[#ec5a13] text-center text-white">
            Ajouter aux favorits
          </p>
        </Link>
        <p>Desciption</p>
        <span className="h-1 w-72"></span>
        <p className="product-description">{description}</p>
        <p>{size}</p>
        <p>{clothing_type}</p>
        <p>{brand}</p>
        <p>{color}</p>
        <p>{category}</p>
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
  }).isRequired,
};
export default ProductCard;
