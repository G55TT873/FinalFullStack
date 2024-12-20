const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection URI
const uri = 'mongodb+srv://marwan:Here@cluster0.oyfec.mongodb.net/login?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// Login Schema for MongoDB
const loginSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Login = mongoose.model('Login', loginSchema, 'logincollection');

// Taco Menu Schema and Model
const tacoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const Taco = mongoose.model('Taco', tacoSchema, 'tacos');

// Order Schema
const orderSchema = new mongoose.Schema({
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Taco' }],
  quantities: [{ type: Number, required: true }], // Save quantities as well
  total: { type: Number, required: true },
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now }
});


// Add Taco to Menu
app.post('/add-taco', async (req, res) => {
  const { name, price } = req.body;

  try {
    const newTaco = new Taco({ name, price });
    await newTaco.save();
    res.status(201).json({ message: 'Taco added to menu successfully', newTaco });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add taco', details: error.message });
  }
});

// Get Taco Menu
app.get('/menu', async (req, res) => {
  try {
    const tacos = await Taco.find();
    res.status(200).json(tacos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tacos', details: error.message });
  }
});

// Place an Order (Checkout Route)
app.post('/checkout', async (req, res) => {
  const { tacoIds, quantities, userEmail, shippingAddress } = req.body;

  if (!tacoIds || !quantities || tacoIds.length !== quantities.length) {
    return res.status(400).json({ error: 'Invalid order details' });
  }

  if (!userEmail || !shippingAddress) {
    return res.status(400).json({ error: 'Email and shipping address are required' });
  }

  try {
    const tacos = await Taco.find({ '_id': { $in: tacoIds } });
    let total = 0;

    tacos.forEach((taco, index) => {
      total += taco.price * quantities[index];
    });

    const newOrder = new Order({
      items: tacoIds,
      total,
      userEmail,
      shippingAddress,
      paymentStatus: 'Pending', // Default to pending, can update later
    });

    await newOrder.save();

    res.status(201).json({ message: 'Checkout successful', newOrder });
  } catch (error) {
    res.status(500).json({ error: 'Failed to complete checkout', details: error.message });
  }
});

// Get Orders
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('items');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders', details: error.message });
  }
});

// Existing Login Routes
app.get('/add-login', async (req, res) => {
  try {
    const logins = await Login.find({});
    res.json(logins);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch logins', details: error.message });
  }
});

app.post('/add-login', async (req, res) => {
  const { email, password } = req.body;

  const existingLogin = await Login.findOne({ email });
  if (existingLogin) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  try {
    const newLogin = new Login({ email, password });
    await newLogin.save();
    res.status(201).json({ message: 'Login added successfully', newLogin });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add login', details: error.message });
  }
});

app.post('/validate-login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Login.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login', details: error.message });
  }
});

app.delete('/delete-login', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const deletedLogin = await Login.findOneAndDelete({ email });
    if (!deletedLogin) {
      return res.status(404).json({ error: 'Login not found' });
    }
    res.status(200).json({ message: 'Login deleted successfully' });
  } catch (error) {
    console.error("Error deleting login:", error);
    res.status(500).json({ error: 'Failed to delete login', details: error.message });
  }
});

// Serve the login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'add-login.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
