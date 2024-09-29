import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct, getVendorProducts, updateProduct, deleteProduct } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Styles/VendorDashboard.css';

const VendorDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });
  const [editingProduct, setEditingProduct] = useState(null); // Track the product being edited

  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getVendorProducts(); // Now using the API function
        console.log(response)
        setProducts(response);
      } catch (error) {
        console.error('Error fetching products', error);
        toast.error('Failed to fetch products.');
      }
    };
    fetchProducts();
  }, []);

  // Handle input change for both new and editing product
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  // Handle Add New Product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const addedProduct = await addProduct(newProduct); // Now using the API function
      setProducts([...products, addedProduct]); // Add the new product to the state
      toast.success('Product added successfully!');
      setNewProduct({ name: '', description: '', price: '', category: '' }); // Reset form
    } catch (error) {
      console.error('Error adding product', error);
      toast.error('Failed to add product.');
    }
  };

  // Start editing a product (populate the form with existing product details)
  const handleEditProduct = (product) => {
    setEditingProduct(product); // Populate the form with the product's details
  };

  // Update a product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = await updateProduct(editingProduct._id, editingProduct); // Now using the API function
      const updatedProducts = products.map((prod) =>
        prod._id === editingProduct._id ? updatedProduct : prod
      );
      setProducts(updatedProducts);

      toast.success('Product updated successfully!');
      setEditingProduct(null); // Clear the editing state
      setNewProduct({ name: '', description: '', price: '', category: '' }); // Reset the form
    } catch (error) {
      console.error('Error updating product', error);
      toast.error('Failed to update product.');
    }
  };

  // Delete a product
  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id); // Using the API function
      setProducts(products.filter((product) => product._id !== id));
      toast.success('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product', error);
      toast.error('Failed to delete product.');
    }
  };

    // Handle Logout
    const handleLogout = () => {
      localStorage.removeItem('token'); // Clear the token from localStorage
      toast.success('Logged out successfully!');
      setTimeout(()=>{
        navigate('/');// Redirect to the login page
      },1000);      
    };
  

  return (
    <div className="vendor-dashboard">
      <h1>Vendor Dashboard</h1>

      {/* Navigation Button to Vendor Orders */}
      <button className="navigate-orders-button" onClick={() => navigate('/vendordashboard/orders')}>
        View and Manage Orders
      </button>

       {/* Logout Button */}
       <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

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
        <button className="add-button" type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
      </form>

      {/* Products List */}
      <section className="products-section">
        <h2>Your Products</h2>
        <ul>
          {products.length > 0 ? (
            products.map((product) => (
              <li key={product._id}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: Rs.{product.price}</p>
                <p>Category: {product.category}</p>
                <button className="update-button" onClick={() => handleEditProduct(product)}>Update</button> {/* Edit button */}
                <button className="delete-button" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
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
