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
      const response = await api.post('v1/admin/products', productData);

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


  const updateProduct = async (id) => {
    try {
      const response = await api.post(`v1/admin/products/${id}`)

    } catch (error) {

    }
  }
  return (
    <ProductContext.Provider value={{ products, loading, fetchProducts, showProduct, productDetails, createProduct}}>
      {children}
    </ProductContext.Provider>
  );
}
export const useProducts = () => useContext(ProductContext);

