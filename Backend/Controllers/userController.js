const User = require('../Models/user');
const DeliveryPersonnel = require('../Models/deliveryPersonnel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

const blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.isBlocked = true; // Set isBlocked status to true
    await user.save();
    
    res.status(200).json({ message: 'User blocked successfully' });
  } catch (error) {
    console.error('Error blocking user:', error); // Log the error for debugging
    res.status(500).json({ message: 'Failed to block user' });
  }
};

const unblockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.isBlocked = false; // Set isBlocked status to false
    await user.save();
    
    res.status(200).json({ message: 'User unblocked successfully' });
  } catch (error) {
    console.error('Error unblocking user:', error); // Log the error for debugging
    res.status(500).json({ message: 'Failed to unblock user' });
  }
};


const getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you store user ID in the token
    const user = await User.findById(userId).select('name email'); // Select the fields you want to return

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

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

    const user = new User({ name, email, password: hashedPassword, role, address });
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
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }

    // Check if the user is blocked
    if (user.isBlocked) {
      return res.status(403).json({ message: 'Your account is blocked. Please contact support.' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log(process.env.JWT_SECRET); 
    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    // Respond with the token and user role
    res.json({ token, role: user.role });
  } catch (error) {
    console.error('Login error:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { registerUser, loginUser, getUserDetails, getUsers, blockUser, unblockUser };
