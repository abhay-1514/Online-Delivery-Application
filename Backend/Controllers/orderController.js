const Order = require('../Models/order'); // Ensure this path is correct
const Product = require('../Models/product');
const DeliveryPersonnel = require('../Models/deliveryPersonnel'); // Ensure this path is correct

// Get all orders for a vendor
const getVendorOrders = async (req, res) => {
  try {
    const vendorProducts = await Product.find({ vendor: req.user.id });
    const productIds = vendorProducts.map(product => product._id);
    const orders = await Order.find({ product: { $in: productIds } }).populate('product').populate('deliveryPersonnel');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching orders' });
  }
};

const assignOrderToDeliveryPersonnel = async (req, res) => {
  const { orderId, deliveryPersonnelId } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.deliveryPersonnel = deliveryPersonnelId; // Assign the delivery personnel
    await order.save();

    res.status(200).json({ message: 'Order assigned successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAssignedOrdersForDeliveryPersonnel = async (req, res) => {
  try {
    // Find the delivery personnel associated with the logged-in user
    const deliveryPersonnel = await DeliveryPersonnel.findOne({ user: req.user.id });
    
    if (!deliveryPersonnel) {
      return res.status(404).json({ message: 'Delivery personnel not found' });
    }

    const deliveryPersonnelId = deliveryPersonnel.id; 
    
    const orders = await Order.find({ deliveryPersonnel: deliveryPersonnelId }).populate('products.product');

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders assigned to this delivery personnel' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

 
const placeOrder = async (req, res) => {
  console.log("Request Body:", req.body); // Log request body to debug

  const { products } = req.body;

  if (!products || !Array.isArray(products)) {
    return res.status(400).json({ message: 'Invalid products structure' });
  }

  try {
    // Log the product IDs being requested
    const productIds = products.map(p => p.product); 
    console.log("Product IDs from request:", productIds);

    const fetchedProducts = await Product.find({ '_id': { $in: productIds } });

    if (fetchedProducts.length === 0) {
      return res.status(404).json({ message: 'No products found for the given IDs' });
    }

    let totalAmount = 0;
    const orderProducts = fetchedProducts.map(product => {
      const orderedProduct = products.find(p => p.product.toString() === product._id.toString());
      const quantity = orderedProduct.quantity;
      totalAmount += product.price * quantity;
      return { product: product._id, quantity, price: product.price };
    });

    const newOrder = new Order({
      user: req.user.id,
      products: orderProducts,
      totalAmount,
    });

    console.log("New Order to be saved:", newOrder);  // Log the new order

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error("Error during placing order:", error);
    res.status(500).json({ message: 'Server error while placing order' });
  }
};





const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('products.product');
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching orders', error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params; // Order ID from the request parameters
  const { status } = req.body; // New status from the request body
  const deliveryPersonnel = await DeliveryPersonnel.findOne({ user: req.user.id });
    
  if (!deliveryPersonnel) {
    return res.status(404).json({ message: 'Delivery personnel not found' });
  }
  const deliveryPersonnelId = deliveryPersonnel.id; // Logged-in delivery personnel's ID from JWT

  try {
    // Find the order by its ID
    const order = await Order.findById(id);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if the logged-in delivery personnel is assigned to the order
    if (order.deliveryPersonnel.toString() !== deliveryPersonnelId.toString()) {
      return res.status(403).json({ message: 'You are not authorized to update this order' });
    }

    // Update the status of the order
    order.status = status;
    await order.save();

    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating order status', error: error.message });
  }
};


module.exports = { placeOrder, getUserOrders, updateOrderStatus, assignOrderToDeliveryPersonnel, getAssignedOrdersForDeliveryPersonnel, getVendorOrders };
