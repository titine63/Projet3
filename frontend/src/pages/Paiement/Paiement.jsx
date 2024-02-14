import { useState } from 'react';

const Paiement = () => {
  const [nom, setNom] = useState('');
  const [numeroCarte, setNumeroCarte] = useState('');
  const [dateExpiration, setDateExpiration] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pourriez intégrer un système de paiement ou valider les données
    console.log('Paiement soumis', { nom, numeroCarte, dateExpiration, cvv });
  };

  return (
    <div>
      <h2>Page de Paiement</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom sur la carte:</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div>
          <label>Numéro de la carte:</label>
          <input
            type="text"
            value={numeroCarte}
            onChange={(e) => setNumeroCarte(e.target.value)}
          />
        </div>
        <div>
            <label>Date d&apos;expiration:</label>
            <input
                type="text"
                value={dateExpiration}
                onChange={(e) => setDateExpiration(e.target.value)}
            />
        </div>
        <div>
          <label>CVV:</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </div>
        <button type="submit">Soumettre le paiement</button>
      </form>
    </div>
  );
};

export default Paiement;
