import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },        // Razorpay order id
  paymentId: { type: String },                      // Razorpay payment id (after success)
  amount: { type: Number, required: true },
  shipping: { type: Number },
  qty: { type: Number, required: true },
  address: {
    name: String,
    phone: String,
    line1: String,
    line2: String,
    city: String,
    state: String,
    pincode: String,
  },
  status: { type: String, default: "created" },     // created, paid, failed
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
