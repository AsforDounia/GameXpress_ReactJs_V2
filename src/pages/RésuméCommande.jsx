import React from 'react';

const RésuméCommande = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 shadow-lg rounded-xl bg-white mt-8">
      <h2 className="text-2xl font-bold mb-6">Résumé de la commande</h2>

      <ul className="divide-y divide-gray-200 mb-4">
        <li className="py-2 flex justify-between">
          <span>Produit 1 (x2)</span>
          <span>40.00 €</span>
        </li>
        <li className="py-2 flex justify-between">
          <span>Produit 2 (x1)</span>
          <span>25.00 €</span>
        </li>
        <li className="py-2 flex justify-between">
          <span>Produit 3 (x3)</span>
          <span>60.00 €</span>
        </li>
      </ul>

      <div className="text-sm space-y-1 mb-6">
        <p>Sous-total : <span className="float-right">125.00 €</span></p>
        <p>TVA (20%) : <span className="float-right">25.00 €</span></p>
        <p>Remises : <span className="float-right text-red-500">-10.00 €</span></p>
        <hr className="my-2" />
        <p className="font-semibold text-lg">Total TTC : <span className="float-right">140.00 €</span></p>
      </div>

      <button
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold transition"
      >
        Valider la commande
      </button>
    </div>
  );
};

export default RésuméCommande;
