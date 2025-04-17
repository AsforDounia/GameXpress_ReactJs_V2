import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
// import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { RiArrowLeftCircleLine , RiShoppingBag2Fill } from "react-icons/ri";
import { useAuth } from '../context/AuthContext';


const OrderSummary = () => {
  const { cartDetails, getCart } = useCart();
  
  const {user} = useAuth();
  
  useEffect(() => {
    const fetchCart = async () => {
      await getCart();
    };
    fetchCart();
  }, [user]);


  if (!cartDetails || !cartDetails.items) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-opacity-50 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  const calculateTotal = (item) => {
    return (parseFloat(item.price) * item.quantity).toFixed(2);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2 text-gray-900">Order Summary</h1>
      <p className="text-gray-500 mb-10">Review your items before checkout</p>
      
      {/* Product list */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Product</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Quantity</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Unit Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cartDetails.items.map((item) => (
                <tr key={item.product_id} className="group transition-colors hover:bg-blue-50">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 h-20 w-20 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={item.image || '/api/placeholder/80/80'}
                          alt={item.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">ID: {item.product_id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center justify-center h-8 min-w-8 px-3 rounded-full bg-blue-100 text-blue-700 font-medium text-sm">
                      {item.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-gray-700">
                    ${parseFloat(item.price).toFixed(2)}
                  </td>
                  <td className="px-6 py-5 font-medium text-gray-900">
                    ${calculateTotal(item)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order details and actions */}
      <div className="lg:flex gap-8">
        <div className="lg:w-full">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Order Total</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between py-2 text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-800">${cartDetails.total_before_tax}</span>
              </div>
              
              <div className="flex justify-between py-2 text-gray-600">
                <span>Tax (20%)</span>
                <span className="font-medium text-gray-800">${cartDetails.total_tax}</span>
              </div>
              
              <div className="flex justify-between py-2 text-gray-600">
                <span>Discount</span>
                <span className="font-medium text-green-600">-${cartDetails.total_discount}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="font-bold text-2xl text-gray-900">${cartDetails.total_final}</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between gap-4 mt-8">
              <button className="w-1/2 cursor-pointer flex items-center justify-center text-blue-600 hover:text-blue-800 font-medium transition-colors border border-blue-200 hover:border-blue-300 bg-blue-50 hover:bg-blue-100 py-3 px-6 rounded-lg">
                <RiArrowLeftCircleLine size={16} className="mr-2" />
                Continue Shopping
              </button>

              <button className="w-1/2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center">
                <RiShoppingBag2Fill size={16} className="mr-2" />
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;