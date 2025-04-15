import React from 'react';

const CardProduit = ({ produit, onAjouter, onSupprimer, dansPanier = false }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 w-full max-w-sm">
      <img
        src={produit.image}
        alt={produit.nom}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-gray-800">{produit.nom}</h2>

        <p className="text-lg font-bold text-green-600">
          {produit.prix.toFixed(2)} €
        </p>

        {produit.stock <= 0 ? (
          <span className="text-sm text-red-500">Rupture de stock</span>
        ) : (
          <span className="text-sm text-gray-500">
            En stock : {produit.stock}
          </span>
        )}

        {!dansPanier ? (
          <button
            onClick={() => onAjouter(produit)}
            disabled={produit.stock <= 0}
            className={`mt-2 w-full py-2 rounded-xl text-white font-medium ${
              produit.stock <= 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Ajouter au panier
          </button>
        ) : (
          <button
            onClick={() => onSupprimer(produit)}
            className="mt-2 w-full py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl"
          >
            Supprimer du panier
          </button>
        )}
      </div>
    </div>
  );
};

export default CardProduit;