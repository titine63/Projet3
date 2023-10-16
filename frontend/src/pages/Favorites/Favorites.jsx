/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { GlobalContext } from "./../../contexts/GlobalContextProvider";
import ProductCard from "./../../components/ProductCard/ProductCard";

export default function Favorites() {
  const { wishlist } = useContext(GlobalContext);

  return (
    <main className="main my-8 flex flex-col items-center">
      <h2 className="h1 my-8">Ma liste d'envies</h2>

      <div className="grid w-[90%] grid-cols-1 gap-4 rounded border p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
