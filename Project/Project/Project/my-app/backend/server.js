const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const uri = 'mongodb+srv://marwan:Here@cluster0.oyfec.mongodb.net/login?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

const loginSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountType: { type: String, enum: ['chef', 'admin', 'customer'], required: true, default: 'customer' },
});

const Login = mongoose.model('Login', loginSchema, 'logincollection');

const orderSchema = new mongoose.Schema({
  customerEmail: { type: String, required: true },
  recipeId: { type: String, required: true },
  status: { type: String, enum: ['processing', 'preparing', 'delivering', 'delivered'], default: 'processing' },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema, 'orders');

const reviewSchema = new mongoose.Schema({
  customerEmail: { type: String, required: true },
  recipeId: { type: String, required: true },
  reviewText: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model('Review', reviewSchema, 'reviews');


const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  ingredients: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Recipe = mongoose.model('Recipe', recipeSchema, 'recipes');

const updateAccountType = async () => {
  try {
    const result = await Login.updateMany(
      { accountType: { $exists: false } },
      { $set: { accountType: 'customer' } }
    );
    console.log(`Updated ${result.nModified} entries to have a default accountType.`);
  } catch (error) {
    console.error('Error updating account types:', error);
  }
};

updateAccountType();

app.get('/add-login', async (req, res) => {
  try {
    const logins = await Login.find({});
    res.json(logins);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch logins', details: error.message });
  }
});

app.post('/add-login', async (req, res) => {
  const { email, password, accountType } = req.body;

  const type = accountType || 'customer';

  if (!['chef', 'admin', 'customer'].includes(type)) {
    return res.status(400).json({ error: 'Invalid account type' });
  }

  try {
    const existingLogin = await Login.findOne({ email });
    if (existingLogin) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const newLogin = new Login({ email, password, accountType: type });
    await newLogin.save();
    res.status(201).json({ message: 'Account created successfully', newLogin });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create account', details: error.message });
  }
});

app.post('/validate-login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Login.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      accountType: user.accountType,
    });
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
    res.status(500).json({ error: 'Failed to delete login', details: error.message });
  }
});

app.post('/place-order', async (req, res) => {
  const { customerEmail, recipeId } = req.body;

  if (!customerEmail || !recipeId) {
    return res.status(400).json({ error: 'Customer email and recipe ID are required' });
  }

  try {
    const newOrder = new Order({
      customerEmail,
      recipeId,
      status: 'processing',
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order', details: error.message });
  }
});

app.post('/save-review', async (req, res) => {
  const { customerEmail, orderId, rating, reviewText } = req.body;

  // Validate inputs
  if (!customerEmail || !orderId || !rating || !reviewText) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  try {
    // Check if the order exists
    const order = await Order.findOne({ _id: orderId, customerEmail });
    if (!order) {
      return res.status(404).json({ error: 'Order not found or does not belong to this user' });
    }

    // Create and save the review
    const newReview = new Review({
      customerEmail,
      recipeId: order.recipeId, // Assuming `recipeId` is in the order schema
      rating,
      reviewText,
    });

    await newReview.save();
    res.status(201).json({ message: 'Review submitted successfully', review: newReview });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save review', details: error.message });
  }
});


app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'adminpage.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'add-login.html'));
});

app.get('/order-status', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'order-status.html'));
});

app.get('/chef', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chefpage.html'));
});

app.get('/orderprep', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'orderprep.html'));
});

app.get('/add-recipe', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'recipe.html'));
});

app.get('/get-orders', async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders', details: error.message });
  }
});

app.post('/update-order-status', async (req, res) => {
  const { orderId, status } = req.body;

  if (!['processing', 'preparing', 'delivering', 'delivered'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    await order.save();
    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status', details: error.message });
  }
});

app.post('/add-recipe', async (req, res) => {
  const { name, description, ingredients } = req.body;

  if (!name=== 0) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  for (let ingredient of ingredients) {
    if (!ingredient || typeof ingredient !== 'string' || ingredient.trim() === '') {
      return res.status(400).json({ error: 'Each ingredient must be a non-empty string' });
    }
  }

  try {
    const existingRecipe = await Recipe.findOne({ name });
    if (existingRecipe) {
      return res.status(400).json({ error: 'Recipe already exists' });
    }

    const newRecipe = new Recipe({
      name,
      description,
      ingredients,
    });

    await newRecipe.save();
    res.status(201).json({ message: 'Recipe added successfully', recipe: newRecipe });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add recipe', details: error.message });
  }
});

app.get('/get-recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipes', details: error.message });
  }
});
app.get('/get-customer-orders', async (req, res) => {
  const { customerEmail } = req.query;

  if (!customerEmail) {
    return res.status(400).json({ error: 'Customer email is required' });
  }

  try {
    const orders = await Order.find({ customerEmail });
    console.log(`Found ${orders.length} orders for ${customerEmail}`);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders', details: error.message });
  }
});


// Route to add a new review



app.get('/get-reviews', async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});