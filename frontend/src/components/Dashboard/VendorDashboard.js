import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct, getVendorProducts, updateProduct, deleteProduct } from '../../services/api';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import styles
import '../../Styles/VendorDashboard.css'; // Create CSS file for styling

const VendorDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products when the component mounts
useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getVendorProducts(products); // Use the updated API call
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
        toast.error('Failed to fetch products.');
      }
    };
  
    fetchProducts();
  }, []);

  // Handle input change for new and editing product
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

//   // Add a new product
//   const handleAddProduct = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await addProduct(newProduct);
//       setProducts([...products, response]);
//       toast.success('Product added successfully!');
//       setNewProduct({ name: '', description: '', price: '', category: '' }); // Reset form
//     } catch (error) {
//       console.error('Error adding product', error);
//       toast.error('Failed to add product.');
//     }
//   };

const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/api/products/', newProduct, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Include token in headers
            }
        });
        setProducts([...products, response.data]);
        toast.success('Product added successfully!');
        setNewProduct({ name: '', description: '', price: '', category: '' }); // Reset form
    } catch (error) {
        console.error('Error adding product', error);
        toast.error('Failed to add product.');
    }
};


  // Start editing a product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  // Update a product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProduct(editingProduct._id, editingProduct);
      const updatedProducts = products.map((prod) => (prod._id === response._id ? response : prod));
      setProducts(updatedProducts);
      toast.success('Product updated successfully!');
      setEditingProduct(null); // Clear editing state
    } catch (error) {
      console.error('Error updating product', error);
      toast.error('Failed to update product.');
    }
  };

  // Delete a product
  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product._id !== id));
      toast.success('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product', error);
      toast.error('Failed to delete product.');
    }
  };

  return (
    <div className="vendor-dashboard">
      <h1>Vendor Dashboard</h1>

      {/* Product Form */}
      <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
        <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
        <input
          type="text"
          name="name"
          value={editingProduct ? editingProduct.name : newProduct.name}
          onChange={handleInputChange}
          placeholder="Product Name"
          required
        />
        <textarea
          name="description"
          value={editingProduct ? editingProduct.description : newProduct.description}
          onChange={handleInputChange}
          placeholder="Product Description"
          required
        />
        <input
          type="number"
          name="price"
          value={editingProduct ? editingProduct.price : newProduct.price}
          onChange={handleInputChange}
          placeholder="Product Price"
          required
        />
        <input
          type="text"
          name="category"
          value={editingProduct ? editingProduct.category : newProduct.category}
          onChange={handleInputChange}
          placeholder="Product Category"
          required
        />
        <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
      </form>

      {/* Products List */}
      <section className="products-section">
        <h2>Your Products</h2>
        <ul>
          {products.length > 0 ? (
            products.map(product => (
              <li key={product._id}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>
                {/* Buttons for editing or deleting products */}
                <button onClick={() => handleEditProduct(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
              </li>
            ))
          ) : (
            <p>No products found. Add some products!</p>
          )}
        </ul>
      </section>

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default VendorDashboard;
