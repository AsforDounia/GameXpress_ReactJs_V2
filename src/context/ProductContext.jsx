import { createContext, useContext, useState, useEffect } from "react";
import api from '../api/axios'

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState();

  const fetchProducts = async () => {
    try {
      const response = await api.get('v1/admin/products');
      setProducts(response.data.products);

      return { success: true };
    } catch (error) {
      console.error('error fetch products', error);

      return {
        success: false,
        message: error.response?.data?.message || 'error fetch products'
      };
    } finally {
      setLoading(false);
    }
  }

  const showProduct = async (id) => {
    try {
      const response = await api.get(`v1/admin/products/${id}`);
      setProductDetails(response.data.product);
      // console.log('products show ', response.data.product);
      return {
        success: true,
        product: response.data.product
      };
    } catch (error) {
      console.error('error show product details', error);

      return {
        success: false,
        message: error.response?.data?.message || 'error show product'
      };
    } finally {
      setLoading(false);
    }
  }

  const createProduct = async (productData) => {
    try {
      console.log(productData);
      const response = await api.post('v1/admin/products', productData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      return {
        success: true,
        product: response.data.product,
        message: 'Produit créé avec succès !'
      };
    } catch (error) {
      console.error('Erreur lors de la création du produit', error);

      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la création du produit'
      };
    }
  };


  const updateProduct = async (id, productData) => {
    setLoading(true);
    try {
      console.log(productData);
      const response = await api.post(`v1/admin/products/${id}`, productData,
        { headers: { 
          'Content-Type': 'multipart/form-data',
          'X-HTTP-Method-Override': 'PUT'} 
        });

        setProducts(prev =>
          prev.map(p => (p.id === id ? response.data.product : p))
      );

      return {
        success: true,
        product: response.data.product,
        message: 'Produit créé avec succès !'
      };
    } catch (error) {
      console.error('Erreur lors de la création du produit', error);

      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la création du produit'
      };
    }
  }

  const deleteProduct = async (id) => {
    setLoading(true);
    try{
      const response = await api.delete(`v1/admin/products/${id}`);
      setProducts(oldProduct => oldProduct.filter(p => p.id != id));
    } catch (error) {
      console.error('Erreur lors de la création du produit', error);

      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la création du produit'
      };
    }
  }
  return (
    <ProductContext.Provider value={{ products, loading, fetchProducts, showProduct, productDetails, createProduct, updateProduct , deleteProduct}}>
      {children}
    </ProductContext.Provider>
  );
}
export const useProducts = () => useContext(ProductContext);

