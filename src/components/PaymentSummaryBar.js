import { useLocation, useNavigate } from "react-router-dom";
import { usePayment } from "./context/PaymentContext";

const PaymentSummaryBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartDetails, address, isFormValid } = usePayment();

  // const average = (total / qty).toFixed(0);

  // Determine button label and behavior
  const isAddressPage = location.pathname === "/address";
  const buttonLabel = isAddressPage ? `Pay ₹${cartDetails.total + cartDetails.shipping}` : `Pay Now ₹${cartDetails.total}`;

  const handleClick = async () => {
    console.log("New Address", address, cartDetails);
    if (isAddressPage) {
      if (isFormValid) {
        initPayment();
      } else {
        alert("Form not ready!");
      }
    } else {
      navigate("/address");
    }
  };

  const initPayment = (res) => {
    let options = {
      key: `rzp_test_IBSJsMDXvgI2bl`,
      name: `kkigo Apparels`,
      description: "Test Payment",
      order_id: "order_RPiJBrjsIZnleY",
      prefill: {
        name: "xxxx",
        email: "xxxx@gmail.com",
        contact: "91"+ 9876543210,
      },
      notes: {
        testing: "testing detail",
      },
      theme: {
        image_padding: false,
        color: "#00804a",
      },
    };
    options = {
      ...options,
      handler: (response) => alert(response),
    };
    const razerPay = new window.Razorpay(options);
    razerPay.open();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 z-50">
      {!isAddressPage && <div className="text-gray-800">
        <p className="text-lg font-semibold">
          Total: <span className="text-black font-bold">₹{cartDetails.total}</span>
        </p>
        <p className="text-sm text-gray-600">
          Qty: {cartDetails.qty} • Avg ₹{75}
        </p>
      </div>}

      <button
        onClick={handleClick}
        className={`bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-900 font-semibold px-6 py-2 rounded-xl shadow-md transition-all duration-200 w-full ${isAddressPage ? '' : 'md:w-auto'}`}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default PaymentSummaryBar;
