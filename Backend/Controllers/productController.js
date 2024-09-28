const Product = require('../Models/product');
const Order = require('../Models/order');

// Add a new product (Vendor only)
const addProduct = async (req, res) => {
  const { name, description, price, category } = req.body;

  try {
    const product = new Product({
      name,
      description,
      price,
      category,
      vendor: req.user.id,  // vendor is the logged-in user
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error while adding product' });
  }
};

// Get all products (for customers only)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching products' });
  }
};

// Get all products added by the logged-in vendor
const getVendorProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user.id }); // Filter products by vendor
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching products' });
  }
};


// Update a product (Vendor only)
const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the logged-in user is the owner/vendor of the product
    if (product.vendor.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this product' });
    }

    // Update product details
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating product',error: error.message });
  }
};

// Delete a product (Vendor only)
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the logged-in user is the owner/vendor of the product
    if (product.vendor.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this product' });
    }

    await product.deleteOne({ _id: id });
    await Order.updateMany(
      { 'products.product': id },
      { status: 'Canceled' } // Change status as needed
    );

    res.json({ message: 'Product deleted and related orders canceled' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting product',error:error.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getVendorProducts,
};
