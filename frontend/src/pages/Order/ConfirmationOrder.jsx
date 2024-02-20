//ConfirmationOrder.jsx
import { useLocation, useNavigate } from 'react-router-dom';



const ConfirmationOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const shippingData = location.state?.shippingData;
  const productData = location.state?.productData;
  const backendURL = location.state?.backendURL;
    // Extrait shippingId de orderData, qui est dans location.state
  const shippingId = location.state?.orderData?.shippingId;

  // Gestion des données manquantes sans rediriger
  if (!productData || !backendURL || !shippingId) {
    // Affichage d'un message d'erreur ou gestion alternative
    return (
      <div>
        <p>Informations manquantes pour afficher la confirmation de la commande.</p>
      </div>
    );
  }

   return (
    <main className="main flex flex-col gap-6 bg-[#FCE3D7] text-center md:gap-10 lg:flex-row lg:gap-0">
      {/* Colonne de gauche pour le résumé de la commande */}
      <section className="sell-section flex flex-col gap-6 pt-12 text-center lg:w-1/3 lg:pb-4 lg:pt-0">
        <div className="flex w-full flex-col gap-4 sm:gap-8 lg:h-full lg:items-center lg:justify-center">
          <h1 className="h2">Résumé de votre commande</h1>
        </div>
      </section>
        
      {/* Colonne de droite pour les détails du produit et les instructions de livraison */}
      <form className="params-product-form items-center gap-4 pb-8 sm:gap-6 lg:ml-[33%] lg:flex lg:w-3/4 lg:flex-col lg:bg-white lg:pb-8 lg:pt-16">
        
        {/* Bloc détails du produit */}
      <div className="mb-8 flex flex-col items-center gap-2 lg:w-[80%] lg:flex-row lg:gap-4">
          <div className=" flex w-[90%] flex-col items-center gap-4 bg-[#e6c9ba] p-4 sm:w-[80%] md:w-[75%] md:gap-8 lg:w-full lg:flex-row lg:items-stretch lg:gap-0 lg:bg-[#fce3d7]">
            {productData.pictures &&
            productData.pictures.length > 0 &&
            productData.pictures[0].url ? (
              <img
                src={`${backendURL}${productData.pictures[0].url}`}
                alt={productData.title}
                className="rounded object-cover md:w-[90%] lg:w-1/2"
              />
            ) : (
              <img
                src="https://picsum.photos/450/255"
                alt={productData.title}
                className="rounded md:w-[100%]"
              />
            )}
          <div className="flex h-full w-full flex-col items-center gap-4 font-medium md:gap-8 lg:h-full lg:justify-stretch lg:gap-32">
            <h1 className="h2">
                Votre commande :
            </h1>

              <div className="flex w-[90%] flex-col gap-4 md:w-[75%] md:gap-8 lg:flex-row lg:justify-between lg:justify-self-end">
                <div className="flex flex-col justify-center text-start md:text-lg">
                  <p>{productData.title}</p>
                  <p>Taille : {productData.size}</p>
                  <p>Etat : {productData.state}</p>
                  <p>Marque : {productData.brand}</p>
                </div>
                  <p className="self-end text-lg md:text-xl">
                  {productData.price}€
                  </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bloc pour les instructions de livraison */}
        <div className="mb-8 flex flex-col items-center gap-2 lg:w-[80%] lg:flex-row lg:gap-4">
          <div className=" flex w-[90%] flex-col items-center gap-4 bg-[#e6c9ba] p-4 sm:w-[80%] md:w-[75%] md:gap-8 lg:w-full lg:flex-row lg:items-stretch lg:gap-0 lg:bg-[#fce3d7]">

      <div className="flex h-full w-full flex-col items-center gap-4 font-medium md:gap-8 lg:h-full lg:justify-stretch lg:gap-32">
            <h1 className="h2">
        Vos instructions de livraison :
       </h1>

       <div className="flex w-[90%] flex-col gap-4 md:w-[75%] md:gap-8 lg:flex-row lg:justify-between lg:justify-self-end">
                <div className="flex flex-col justify-center text-start md:text-lg">
          <p>{shippingData.firstname} {shippingData.lastname}</p>
          <p>Adresse : {shippingData.address}</p>
          <p>Code postal : {shippingData.postalCode}</p>
          <p>Ville : {shippingData.city}</p>
         </div>
        </div>
      </div>
      </div>
      </div>

      {/* Bouton pour régler la commande */}
        <button
          type="button"
          className="h2 button mt-8 w-[90%] sm:w-[80%] md:w-[70%] lg:mx-auto lg:w-1/2"
          onClick={() => navigate('/payment')}>
          Régler la commande
        </button>

    
    </form>
  </main>
    );
};

export default ConfirmationOrder;
    