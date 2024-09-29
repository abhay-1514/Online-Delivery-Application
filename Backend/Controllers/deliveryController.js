const DeliveryPersonnel = require('../Models/deliveryPersonnel');

const getDeliveryPersonnel = async (req, res) => {
  try {
    const personnel = await DeliveryPersonnel.find();
    res.json(personnel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching delivery personnel', error: error.message });
  }
};

module.exports = { getDeliveryPersonnel };
