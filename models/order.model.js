// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  cashfreeOrderId: { type: String, required: true, unique: true }, // Store Cashfree order_id
  items: [
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
