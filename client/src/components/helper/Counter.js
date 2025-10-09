// Counter.jsx
import { useState } from "react";
import { usePayment } from "../context/PaymentContext";

const Counter = () => {
    const [count, setCount] = useState(0);
     const { cartDetails, increaseQty, decreaseQty } = usePayment();

    return (
        <div className="rounded-3xl">
        <div className="flex items-center space-x-4 rounded-3xl">
            {/* Minus Button */}
            <button
                disabled={cartDetails.qty <= 1}
                onClick={decreaseQty}
                className="w-[40px] h-[40px] md:w-12 md:h-12 bg-[black] text-white rounded-full flex items-center justify-center transition-colors duration-300"
            >
                −
            </button>

            {/* Count Display */}
            <span className="text-lg md:text-xl font-semibold w-8 text-center">
                {cartDetails.qty}
            </span>

            {/* Plus Button */}
            <button
                onClick={increaseQty}
                className="w-[40px] h-[40px] md:w-12 md:h-12 bg-[black] text-white rounded-full flex items-center justify-center transition-colors duration-300"
            >
                +
            </button>
        </div>
        </div>
    );
};

export default Counter;