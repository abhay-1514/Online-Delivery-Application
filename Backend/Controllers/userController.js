const User = require('../Models/User');
const DeliveryPersonnel = require('../Models/deliveryPersonnel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Register User
const registerUser = async (req, res) => {
  const { name, email, password, role, phone, address } = req.body; // Include phone and address

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    // If the user is a delivery personnel
    if (role === 'DeliveryPersonnel') {
      // Create a new DeliveryPersonnel entry
      const deliveryPersonnel = new DeliveryPersonnel({
        user: user._id,
        name, // Pass the name
        email, // Pass the email
        phone, // Pass the phone
        address, // Pass the address
      });
      await deliveryPersonnel.save();

      // Link the DeliveryPersonnel to the User
      user.deliveryPersonnelId = deliveryPersonnel._id;
      await user.save();
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(201).json({ token, role: user.role, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser };
