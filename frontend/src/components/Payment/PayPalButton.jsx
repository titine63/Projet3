//PayPalButton.jsx
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
      "client-id": "AVTfrFC0Zb4LIxBqZzYm1LFYZmrNxPqARqw4OvaRkuZ9ATto866WFAGIlzdHrz8g9liLz54QqjR5pNa_", // Votre Client ID sandbox
      currency: "EUR"
    }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          console.log("Amount being used for the transaction:", amount);
          return actions.order.create({
            purchase_units: [{
              description: "Votre commande",
              custom_id: `OrderID${orderId}`,
              soft_descriptor: "Votre Boutique",
              amount: {
                value: amount,
                currency_code: "EUR",
                breakdown: {
                  item_total: { value: amount, currency_code: "EUR" },
                }
              },
              items: [
                {
                  name: "Produit Commandé",
                  description: "Description du produit",
                  sku: "sku01",
                  unit_amount: { value: amount, currency_code: "EUR" },
                  quantity: '1',
                },
              ],
            }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Transaction completed by ${details.payer.name.given_name}!`);
          });
        }}
        onError={(err) => {
          console.error("Payment Error:", err);
          alert("Une erreur est survenue lors du paiement. Veuillez réessayer.");
        }}
      />
    </PayPalScriptProvider>
  );
};

PayPalCheckoutButton.propTypes = {
  orderId: PropTypes.number.isRequired,
};

export default PayPalCheckoutButton;







