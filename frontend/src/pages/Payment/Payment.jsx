//Payment.jsx
import { useLocation, Navigate } from 'react-router-dom';
import PayPalCheckoutButton from '../../components/Payment/PayPalButton';
import { useState, useEffect } from 'react';

  const Payment = () => {

  return (
    <main className="main flex flex-col gap-6 bg-[#FCE3D7] text-center md:gap-10 lg:flex-row lg:gap-0">

      <section className="sell-section flex flex-col gap-6 pt-12 text-center lg:w-1/3 lg:pb-4 lg:pt-0">
      <div className="flex w-full flex-col gap-4 sm:gap-8 lg:h-full lg:items-center lg:justify-center">
        <h1 className="h2">Réglez votre commande</h1>
        
        
      </div>
      </section>
      

        
        {/* Bouton de paiement PayPal */}
        <section className="params-product-form items-center gap-4 pb-8 sm:gap-6 lg:ml-[33%] lg:flex lg:w-3/4 lg:flex-col lg:bg-white lg:pb-8 lg:pt-16">
        <h1 className="h2">
      Choisissez votre mode de règlement.
        </h1>
        <div className="h2 button mt-8 w-[90%] sm:w-[80%] md:w-[70%] lg:mx-auto lg:w-1/2">
            <PayPalCheckoutButton />
          </div>
          </section>

    </main>
  );
}

export default Payment;






