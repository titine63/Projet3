import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalCheckoutButton = () => {
  return (
    <PayPalScriptProvider options={{ "client-id": "AWEV672LKCYfPsLHzpdUYRU_cVLdsRuegZODOl08M3ckQAoOVKSYAiibiUx0DqYg_oSNSibSYoJ8UOTc" }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: "0.01", // Le montant de la transaction
              },
            }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Transaction complétée par ${details.payer.name.given_name}!`);
            // Vous pouvez ajouter ici une logique supplémentaire pour gérer le succès de la transaction.
          });
        }}
        onError={(err) => {
          // Vous pouvez ajouter ici une logique supplémentaire pour gérer l'échec de la transaction.
          console.error("Une erreur est survenue lors de la transaction:", err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalCheckoutButton;