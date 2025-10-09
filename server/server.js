import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
const app = express();
// Middleware
app.use(bodyParser.json());
import Razorpay from "razorpay";
dotenv.config();
const PORT = process.env.PORT || 3004;

// ✅ MongoDB connection
mongoose.connect(
    "mongodb+srv://kirubapavi1819:HZbrB1HgBgCL64lG@first-collection.ppuijia.mongodb.net/zebroz?retryWrites=true&w=majority&appName=first-collection"
)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => {
        console.error("❌ MongoDB connection failed:", err.message);
        process.exit(1);
    });

const instance = new Razorpay({
    key_id: "rzp_test_RRN0HxqFo7IhJ4",
    key_secret: "KVcG6N2y4z6GOPfAW0hJwizj",
});

app.post("/create-order", async (req, res) => {
    const options = {
        amount: req.body.amount * 100, // amount in paise
    };
    const order = await instance.orders.create(options);
    res.json(order);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;