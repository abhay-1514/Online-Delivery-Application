const DeliveryPersonnel = require('../Models/deliveryPersonnel');

const addDeliveryPersonnel = async (req, res) => {
  const { name, contact, address } = req.body;

  try {
    const newPersonnel = new DeliveryPersonnel({ name, contact, address });
    await newPersonnel.save();
    res.status(201).json({ message: 'Delivery personnel added successfully', personnel: newPersonnel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding delivery personnel', error: error.message });
  }
};

const getDeliveryPersonnel = async (req, res) => {
  try {
    const personnel = await DeliveryPersonnel.find();
    res.json(personnel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching delivery personnel', error: error.message });
  }
};

module.exports = { addDeliveryPersonnel, getDeliveryPersonnel };
