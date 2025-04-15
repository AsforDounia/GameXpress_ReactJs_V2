// ProductCreateForm.jsx
import { useState } from 'react';
import { useProducts } from '../contexts/ProductContext';

const ProductCreateForm = () => {
  const { createProduct } = useProducts();

  const [form, setForm] = useState({
    name: '',
    price: '',
    stock: '',
    status: '',
    images: ''
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createProduct(form);

    if (result.success) {
      setMessage('Produit créé avec succès !');
    } else {
      setMessage(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Nom" onChange={handleChange} />
      <input name="price" placeholder="Prix" onChange={handleChange} />
      <input name="stock" placeholder="stock" onChange={handleChange} />
      <input name="status" placeholder="Nom" onChange={handleChange} />
      <button type="submit">Créer</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ProductCreateForm;
