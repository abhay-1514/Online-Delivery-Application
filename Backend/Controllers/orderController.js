const Order = require('../Models/order'); // Ensure this path is correct
const Product = require('../Models/product');
const DeliveryPersonnel = require('../Models/deliveryPersonnel'); // Ensure this path is correct


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
  const { products } = req.body; // Removed deliveryPersonnelId

  try {
    const fetchedProducts = await Product.find({ '_id': { $in: products.map(p => p.product) } });
    let totalAmount = 0;
    const orderProducts = fetchedProducts.map(product => {
      const orderedProduct = products.find(p => p.product.toString() === product._id.toString());
      const quantity = orderedProduct.quantity;
      const price = product.price;
      totalAmount += price * quantity;
      return { product: product._id, quantity, price };
    });

    const newOrder = new Order({
      user: req.user.id,
      products: orderProducts,
      totalAmount,
      
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error(error);
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
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating order status', error: error.message });
  }
};

module.exports = { placeOrder, getUserOrders, updateOrderStatus, assignOrderToDeliveryPersonnel, getAssignedOrdersForDeliveryPersonnel };
