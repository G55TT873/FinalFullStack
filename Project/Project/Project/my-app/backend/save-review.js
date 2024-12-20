const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(express.json());

// Mongoose Schema for Reviews
const reviewSchema = new mongoose.Schema({
  orderId: String,
  rating: Number,
  review: String,
});

const Review = mongoose.model("Review", reviewSchema);

// Endpoint to save the review
app.post("/save-review", async (req, res) => {
  try {
    const { orderId, rating, review } = req.body;

    // Validate input
    if (!orderId || !rating || rating < 1 || rating > 5 || !review) {
      return res.status(400).json({ message: "Invalid data" });
    }

    // Save the review in the database
    const newReview = new Review({
      orderId,
      rating,
      review,
    });

    await newReview.save();
    res.status(201).json({ message: "Review saved successfully!" });
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Connect to MongoDB (replace with your MongoDB URI)
mongoose
  .connect("mongodb://localhost:27017/yourdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
