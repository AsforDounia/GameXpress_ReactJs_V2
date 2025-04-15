import React, { use, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Products() {
  const navigate = useNavigate();
  const { products, loading, fetchProducts } = useProducts();
  const { user, isAuthenticated } = useAuth();
  const roles = user?.roles?.map(role => role.name);

  const handleProduct = (id) => {
    navigate(`/products/${id}`);
  }
  useEffect(() => {
    fetchProducts();
  }, []);
  // console.log(products);

  return (
    <div className="px-6 py-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Product List</h2>

      <div className="grid lg:grid-cols-4  md:grid-cols-2 sm:grid-cols-1 gap-8 ">
        {products.map(product => (
          <div key={product.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-5 text-center cursor-pointer" 
            onClick={ () => handleProduct(product.id)}>

            <img
              // src={`http://127.0.0.1:8000/storage/product_images/${product.product_images[0]}`}
              src={`http://127.0.0.1:8000/storage/${product.product_images[0]?.image_url}`}
              alt={product.name}
              className="w-full h-48 object-cover rounded-xl mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {product.name}</h3>
            <p className="text-gray-600 mb-4">${product.price}</p>

            {isAuthenticated && (roles?.includes('super_admin') || roles?.includes('product_manager')) && (
              <div className="flex justify-center gap-3">
                <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1.5 px-4 rounded-lg transition"
                  onClick={() => handleUpdate(product.id)}>Modifier
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1.5 px-4 rounded-lg transition"
                  onClick={() => handleDelete(product.id)}>Supprimer
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
