//Payment.jsx
import { useLocation, Navigate } from 'react-router-dom';
import PayPalCheckoutButton from '../../components/Payment/PayPalButton';

const Payment = () => {
  const location = useLocation();
  const shippingData = location.state?.shippingData;
  // Vérifiez que toutes les données nécessaires sont présentes

  console.log("State at Payment:", location.state);

  if (!location.state || !location.state.productData || !location.state.backendURL || !shippingData) {
    // Si des données manquent, redirigez l'utilisateur

    return <Navigate to="/" />;
  }

  const { productData, backendURL } = location.state;
  // Déterminez les instructions de livraison basées sur les détails de livraison

  // Initialisez deliveryInstructions en dehors du bloc conditionnel
  let deliveryInstructions = "Instructions de livraison non spécifiées.";

  // Assurez-vous que shippingData est défini avant d'accéder à shippingMethod
  if (shippingData && shippingData.shippingMethod) {
    if (shippingData.shippingMethod === 'laposte') {
      deliveryInstructions = `Livraison à domicile: ${shippingData.address}, ${shippingData.city}`;
    } else if (shippingData.shippingMethod === 'point-relais') {
      deliveryInstructions = `Livraison en point relais: ${shippingData.relayPoint ?? "adresse non spécifiée"}`;
    }
  }
  console.log("shippingData:", shippingData);

  

  return (
    <main className="main flex flex-col gap-6 bg-[#FCE3D7] text-center md:gap-10 lg:flex-row lg:gap-0">
      <section className="sell-section flex flex-col gap-6 pt-12 text-center lg:w-1/3 lg:pb-4 lg:pt-0">
      <div className="flex w-full flex-col gap-4 sm:gap-8 lg:h-full lg:items-center lg:justify-center">
        <h1 className="h2">Réglez votre commande</h1>
        <h3 className="mx-auto w-[80%] text-start lg:text-center lg:text-lg">
      Choisissez votre mode de règlement.
        </h3>
        <div className="w-[80%] flex-col gap-2 self-center lg:flex lg:w-[70%]">
          <p className="text-start lg:block lg:font-medium">
        * <span className="underline underline-offset-4">Toutes ces informations sont obligatoires</span>
          </p>
        </div>
      </div>
      </section>
      <form
      
        className="params-product-form items-center gap-4 pb-8 sm:gap-6 lg:ml-[33%] lg:flex lg:w-3/4 lg:flex-col lg:bg-white lg:pb-8 lg:pt-16">
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
              
              <h2 className="text-center md:text-xl lg:mt-6">
                Le résumé de votre commande:
              </h2>
              
              <div className="flex w-[90%] flex-col gap-4 md:w-[75%] md:gap-8 lg:flex-row lg:justify-between lg:justify-self-end">
                <div className="flex flex-col justify-center text-start md:text-lg">
                <h2 className="text-center md:text-xl lg:mt-6">
                Le produit commandé est :
              </h2>
                  <p>{productData.title}</p>
                  <p>Taille : {productData.size}</p>
                  <p>Etat : {productData.state}</p>
                  <p>Marque : {productData.brand}</p>
                </div>
                <p className="self-end text-lg md:text-xl">
                  {productData.price}€
                </p>
                
              </div>
              {/* Ajout des instructions de livraison ici */}
              <p className="text-sm md:text-base lg:text-lg">{deliveryInstructions}</p>
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col items-center gap-6 lg:w-[80%] lg:flex-row lg:justify-between lg:gap-16">
          <div className="flex w-[90%] flex-col gap-4  sm:w-[80%] sm:gap-6 md:w-[70%] lg:w-1/2">      
        </div>
        
        {/* Bouton de paiement PayPal */}
        <div className="p-4">
            <h2 className="text-xl mb-4">Le paiement de votre commande:</h2>
            <PayPalCheckoutButton />
          </div>
        </div>
      </form>
    </main>
  );
}

export default Payment;






