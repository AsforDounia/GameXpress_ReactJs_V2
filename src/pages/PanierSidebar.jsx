import React from 'react';
import {useCart} from ""

const PanierSidebar= () => {

    return (
        <div
          className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Mon panier</h2>
            <button onClick={onClose}>
              <X className="w-6 h-6" />
            </button>
          </div>
    
          <div className="p-4 overflow-y-auto h-[calc(100%-160px)]">
            {panier.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">
                Votre panier est vide.
              </p>
            ) : (
              panier.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-medium">{item.nom}</p>
                    <p className="text-sm text-gray-600">
                      {item.prix} € x {item.quantite}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.id, item.quantite - 1)}
                      className="w-7 h-7 border rounded text-lg"
                    >
                      -
                    </button>
                    <span>{item.quantite}</span>
                    <button
                      onClick={() => updateQty(item.id, item.quantite + 1)}
                      className="w-7 h-7 border rounded text-lg"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 ml-2 text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
    
          <div className="p-4 border-t">
            <div className="flex justify-between font-semibold mb-3">
              <span>Total TTC :</span>
              <span>{total.toFixed(2)} €</span>
            </div>
            <a
              href="/panier"
              className="block bg-black text-white py-2 rounded text-center hover:bg-gray-800 transition"
            >
              Voir mon panier
            </a>
          </div>
        </div>
      );
    };

export default PanierSidebar;