// Example of backend route to get order status
app.get('/get-order-status/:orderId', async (req, res) => {
    const { orderId } = req.params;
  
    try {
      // Replace with your actual database call
      const order = await OrderModel.findById(orderId);
      
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      
      res.json({ status: order.status });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch order status" });
    }
  });
  