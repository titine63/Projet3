// PayPalButton.jsx
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';

const PayPalCheckoutButton = ({ orderId }) => {
  const [amount, setAmount] = useState('0.00');

  useEffect(() => {

    const fetchOrderAmount = async () => {
      try {
        const response = await axios(`http://localhost:3000/order/${orderId}`);
        
        const orderDetails = response.data;
        setAmount(orderDetails.product[0].price.toString());
      } catch (error) {
        console.error("Could not fetch order amount:", error);
      }
    };

    if (orderId) {
      fetchOrderAmount();
    }
  }, [orderId]);

  return (
    <PayPalScriptProvider options={{
      "client-id": "AVTfrFC0Zb4LIxBqZzYm1LFYZmrNxPqARqw4OvaRkuZ9ATto866WFAGIlzdHrz8g9liLz54QqjR5pNa_",
      currency: "EUR" // Ajouter cette ligne pour spécifier la devise
    }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              description: "Description de votre commande",
              custom_id: `IDCommande${orderId}`,
              soft_descriptor: "DescCourteCommande",
              amount: {
                value: amount, // Utilisez le montant récupéré de la commande
                currency_code: "EUR",
                breakdown: {
                  item_total: { value: amount, currency_code: "EUR" },
                  // Ajoutez d'autres frais comme shipping, taxes, etc., si nécessaire
                }
              },
              items: [ // Détails des articles de la commande
                {
                  name: "Article de la commande",
                  description: "Description de l'article",
                  sku: "sku01",
                  unit_amount: { value: amount, currency_code: "EUR" },
                  quantity: '1',
                  // Ajoutez d'autres attributs ici si nécessaire
                },
                // Ajoutez d'autres articles si la commande en contient plusieurs
              ],
              // Ajoutez des informations sur l'expédition ici si nécessaire
            }],
          });
        }}
        onApprove={(data, actions) => {
          // Logique à exécuter en cas d'approbation de la commande
          return actions.order.capture().then((details) => {
            alert(`Transaction complétée par ${details.payer.name.given_name}!`);
          });
        }}
        onError={(err) => {
          // Logique à exécuter en cas d'erreur lors de la transaction
          console.error("Erreur lors de la transaction :", err);
        }}
      />
    </PayPalScriptProvider>
  );
};

// Définition des PropTypes pour PayPalCheckoutButton
PayPalCheckoutButton.propTypes = {
  orderId: PropTypes.number.isRequired, // ou PropTypes.string si votre ID est une chaîne
};

export default PayPalCheckoutButton;
