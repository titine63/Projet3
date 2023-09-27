import { useParams } from "react-router-dom";
import ProductCard from "./ProductsCard";

// import man-image from "./../../../public/images/home-images.png";
const Products = () => {
  const { id } = useParams();
  const products = [
    {
      id: 1,
      title: "magnifique veste",
      description: "veste de taille M",
      price: 15,
      size: "M",
      image: "./../../../public/images/man-image.png",
      clothing_type: "Veste",
      brand: "Autre",
      color: "noir",
      category: "homme",
      state: "très bon état",
    },
    {
      id: 2,
      title: "magnifique veste",
      description: "veste de taille M",
      price: "15€",
      size: "M",
      image: "./../../../public/images/woman-image.png",
      clothing_type: "Veste",
      brand: "Autre",
      color: "noir",
      category: "homme",
      state: "très bon état",
    },
    {
      id: 3,
      title: "magnifique veste",
      description: "veste de taille M",
      price: 15,
      size: "M",
      image: "./../../../public/images/kids-image.png",
      clothing_type: "Veste",
      brand: "Autre",
      color: "noir",
      category: "homme",
      state: "très bon état",
    },
  ];
  const filteredProducts = products.filter(
    (product) => product.id === parseInt(id),
  );

  return (
    <main className="main">
      <div className="Products-container">
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Products;
