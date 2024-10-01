const Product = require('../Models/product');
const Order = require('../Models/order');

// Add a new product (Vendor only)
const addProduct = async (req, res) => {
  const { name, description, price, category } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/api/uploads/${req.file.filename}`;
  console.log(req.file.path) // Get the file path from multer

  try {
    const product = new Product({
      name,
      description,
      price, 
      category,
      vendor: req.user.id,  // vendor is the logged-in user
      imageUrl, // Add the imageUrl to the product
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error while adding product', error: error.message });
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

    // Prepare updated fields
    const updatedFields = {
      name: req.body.name || product.name,
      description: req.body.description || product.description,
      price: req.body.price || product.price,
      category: req.body.category || product.category,
      // Only update the imageUrl if a new file is uploaded
      ...(req.file && { imageUrl: req.file.path }),
    };

    // Update product details
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating product', error: error.message });
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
