import mongoose from "mongoose";

const failedPaymentSchema = new mongoose.Schema({
    // Optional: store user info or request context
  customerName: { type: String },
  mobile: { type: String },
  errorCode: { type: String, required: true },       // e.g. BAD_REQUEST_ERROR
  description: { type: String },                     // failure message from Razorpay
  reason: { type: String },                          // e.g. insufficient_balance
  source: { type: String },                          // e.g. customer / bank / network
  step: { type: String },                            // e.g. payment_authorization
  orderId: { type: String },                         // Razorpay order_id
  paymentId: { type: String },                       // Razorpay payment_id
  createdAt: { type: Date, default: Date.now },
  // Full raw Razorpay error object for reference/debugging
  rawError: { type: Object },
});

export default mongoose.model("FailedPayment", failedPaymentSchema);
