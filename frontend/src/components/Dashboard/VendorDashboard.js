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
    image: null, // For storing the selected image file
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getVendorProducts();
        const productsWithImages = response.map((product) => {
          if (product.imageUrl) {
            return { ...product, image: product.imageUrl };
          }
          return product;
        });
        setProducts(productsWithImages);
      } catch (error) {
        console.error('Error fetching products', error);
        toast.error('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, image: e.target.files[0] });
    } else {
      setNewProduct({ ...newProduct, image: e.target.files[0] });
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Create a FormData object for file upload
    for (const key in newProduct) {
        formData.append(key, newProduct[key]);
    }

    try {
        const addedProduct = await addProduct(formData); // Send the FormData
        setProducts([...products, addedProduct]);
        toast.success('Product added successfully!');

        // Clear the form inputs including the image
        setNewProduct({ name: '', description: '', price: '', category: '', image: null });

    } catch (error) {
        console.error('Error adding product', error);
        toast.error('Failed to add product.');
    }
};

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Create a FormData object for file upload
    for (const key in editingProduct) {
      formData.append(key, editingProduct[key]);
    }

    try {
      const updatedProduct = await updateProduct(editingProduct._id, formData); // Send the FormData
      const updatedProducts = products.map((prod) => (prod._id === editingProduct._id ? updatedProduct : prod));
      setProducts(updatedProducts);
      toast.success('Product updated successfully!');
      setEditingProduct(null);
      setNewProduct({ name: '', description: '', price: '', category: '', image: null });
    } catch (error) {
      console.error('Error updating product', error);
      toast.error('Failed to update product.');
    }
  };

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="vendor-dashboard">
      <h1>Vendor Dashboard</h1>
  
      <button className="navigate-orders-button" onClick={() => navigate('/vendordashboard/orders')}>
        View and Manage Orders
      </button>
  
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
  
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
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange} // Handle image file change
          required
        />
        <button className="add-button" type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
      </form>
  
      <section className="products-section">
        <h2>Your Products</h2>
        {loading ? (
          <p>Loading products...</p> // Loading state
        ) : (
          <ul>
            {products.length > 0 ? (
              products.map((product) => (
                <li key={product._id}>
                  <div className="product-image">
                    {product.image && <img src={product.image} alt={product.name} width="100" />}
                  </div>
                  <div className="product-details">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>Price: Rs.{product.price}</p>
                    <p>Category: {product.category}</p>
                  </div>
                  <div className="product-actions">
                    <button className="update-button" onClick={() => handleEditProduct(product)}>Update</button>
                    <button className="delete-button" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                  </div>
                </li>
              ))
            ) : (
              <p>No products found. Add some products!</p>
            )}
          </ul>
        )}
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