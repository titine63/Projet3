//Summary.jsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Summary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Récupération de l'orderId à partir de l'état de navigation
  const { orderId } = location.state || {};
  // Initialisation de l'état pour stocker les détails de la commande
  const [orderDetails, setOrderDetails] = useState(null);

  // Utilisation de useEffect pour récupérer les détails de la commande
  useEffect(() => {
    // Vérification de l'existence de l'orderId avant de faire la requête
    if (orderId) {
      axios.get(`http://localhost:3000/order/${orderId}`)
        .then(response => {
          // Mise à jour de l'état avec les données de la commande récupérées
          setOrderDetails(response.data);
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des détails de la commande:", error);
          // Gestion de l'erreur, par exemple redirection ou affichage d'un message
        });
    }
  }, [orderId]);

  if (!orderDetails) {
    return <div>Chargement des informations de la commande...</div>;
  }

  // Exemple de comment vous pourriez accéder à productData et shippingData si elles font partie de orderDetails
  // Assurez-vous que ces champs existent dans la réponse de votre API
  const { productData, shippingData } = orderDetails;
  console.log("Order Data in Summary:", orderDetails);

  console.log("Location state in Summary:", location.state);
  return (
    <main className="main flex flex-col gap-6 bg-[#FCE3D7] text-center md:gap-10 lg:flex-row lg:gap-0">
      {/* Colonne de gauche pour le résumé de la commande */}
      <section className="sell-section flex flex-col gap-6 pt-12 text-center lg:w-1/3 lg:pb-4 lg:pt-0">
        <div className="flex w-full flex-col gap-4 sm:gap-8 lg:h-full lg:items-center lg:justify-center">
          <h1 className="h2">Récapitulatif de votre commande : règlement et livraison</h1>
        </div>
      </section>
        
      {/* Colonne de droite pour les détails du produit et les instructions de livraison */}
      <div className="params-product-form flex flex-col items-center gap-4 pb-8 sm:gap-6 lg:ml-[33%] lg:w-3/4 lg:flex-col lg:bg-white lg:pb-8 lg:pt-16">
        
        {/* Affichage conditionnel des blocs détails du produit et instructions de livraison */}
        {productData && (
          <div className="mb-8 flex flex-col items-center gap-2 lg:w-[80%] lg:flex-row lg:gap-4">
            <div className="flex w-[90%] flex-col items-center gap-4 bg-[#e6c9ba] p-4 sm:w-[80%] md:w-[75%] md:gap-8 lg:w-full lg:flex-row lg:items-stretch lg:gap-0 lg:bg-[#fce3d7]">
              {/* Ici, assurez-vous que l'URL de l'image et les autres détails du produit sont correctement traités */}
              <img src={productData.pictures[0].url} alt={productData.title} className="rounded object-cover md:w-[90%] lg:w-1/2" />
              <div className="flex h-full w-full flex-col items-center gap-4 font-medium md:gap-8 lg:h-full lg:justify-stretch lg:gap-32">
                <h1 className="h2">Votre commande :</h1>
                <div className="flex w-[90%] flex-col gap-4 md:w-[75%] md:gap-8 lg:flex-row lg:justify-between lg:justify-self-end">
                  <div className="flex flex-col justify-center text-start md:text-lg">
                    <p>{productData.title}</p>
                    <p>Taille : {productData.size}</p>
                    <p>État : {productData.state}</p>
                    <p>Marque : {productData.brand}</p>
                  </div>
                  <p className="self-end text-lg md:text-xl">{productData.price}€</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {shippingData && (
          <div className="mb-8 flex flex-col items-center gap-2 lg:w-[80%] lg:flex-row lg:gap-4">
            {/* Assurez-vous que les détails d'expédition sont correctement affichés ici */}
            <div className="flex w-[90%] flex-col items-center gap-4 bg-[#e6c9ba] p-4 sm:w-[80%] md:w-[75%] md:gap-8 lg:w-full lg:flex-row lg:items-stretch lg:gap-0 lg:bg-[#fce3d7]">
              <div className="flex h-full w-full flex-col items-center gap-4 font-medium md:gap-8 lg:h-full lg:justify-stretch lg:gap-32">
                <h1 className="h2">Vos instructions de livraison :</h1>
                <div className="flex w-[90%] flex-col gap-4 md:w-[75%] md:gap-8 lg:flex-row lg:justify-between lg:justify-self-end">
                  <div className="flex flex-col justify-center text-start md:text-lg">
                    <p>{shippingData.firstname} {shippingData.lastname}</p>
                    <p>Adresse : {shippingData.address}</p>
                    <p>Code postal : {shippingData.postalCode}</p>
                    <p>Ville : {shippingData.city}</p>
                    {shippingData.shippingMethod !== 'laposte' && (
                      <p>Méthode d&apos;expédition : Envoi en point relais</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
{/* Bouton pour retourner à l'accueil */}
        <button type="button" className="h2 button mt-8 w-[90%] sm:w-[80%] md:w-[70%] lg:mx-auto lg:w-1/2" onClick={() => navigate('/home')}>
          Retour à l&apos;accueil
        </button>
      </div>
    </main>
  );
};

export default Summary;