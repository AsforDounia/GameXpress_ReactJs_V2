import React, { useEffect } from 'react';
import { useCart } from "../context/CartContext";
// import { X } from "lucide-react";
import { useAuth } from '../context/AuthContext';
import { RiDeleteBinLine } from 'react-icons/ri';

const PanierSidebar= () => {
    const {getCart, cartDetails} = useCart();
    const {user} = useAuth();
    useEffect(()=>{
        const fetchData = async () => {
            await getCart();
        }
        fetchData();
    },[user]);
  console.log("ertyuiop : ",cartDetails);

    return (
        <div
          className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Mon panier</h2>
            <button >
              x
            </button>
          </div>
    
          <div className="p-4 overflow-y-auto h-[calc(100%-160px)]">
        {(cartDetails && (cartDetails.length === 0 || cartDetails.message)) ? (
          <p className="text-gray-500 text-center mt-10">
            Votre cartDetails est vide.
          </p>
        ) : (
          (cartDetails.items.map((item) =>
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">{item.price} € x {item.quantity}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQty(item.id, item.quantity - 1)}
                  className="w-6 h-6 border rounded text-lg">
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQty(item.id, item.quantity + 1)}
                  className="w-6 h-6 border rounded text-lg">
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 ml-2 text-2xl"
                >
                  <RiDeleteBinLine/>
                </button>
              </div>
            </div>
          )
          )
        )
        }
      </div>
    
          <div className="p-4 border-t">
            <div className="flex justify-between font-semibold mb-3">
              <span>Total TTC :</span>
              <span>total;prix€</span>
            </div>
            <a
            //   href="/panier"
              className="block bg-black text-white py-2 rounded text-center hover:bg-gray-800 transition"
            >
              Voir mon panier
            </a>
          </div>
        </div>
        // <div>tset</div>
      );
    };

export default PanierSidebar;