import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { usePayment } from "./context/PaymentContext";

const PaymentSummaryBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartDetails, address, isFormValid, setCartDetails } = usePayment();
  let failureHandled = false;

  // const average = (total / qty).toFixed(0);

  // Determine button label and behavior
  const isAddressPage = location.pathname === "/address";
  const buttonLabel = isAddressPage ? `Pay ₹${cartDetails.total + cartDetails.shipping}` : `Pay Now ₹${cartDetails.total}`;

  const handleClick = async () => {
    console.log("New Address", address, cartDetails);
    if (isAddressPage) {
      if (isFormValid) {
        checkoutGetOrder({
          amount: cartDetails.total,
          shipping: cartDetails.shipping,
          qty: cartDetails.qty,
          address: address
        }).then((res) => {
          if (res?.id)
            initPayment(res);
        });
      } else {
        alert("Form not ready!");
      }
    } else {
      navigate("/address");
    }
  };

  const checkoutGetOrder = async (params) => {
    return axios
      .post(`/create-order`, params)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        return null;
      });
  };

  const initPayment = (res) => {
    let options = {
      key: process.env.REACT_APP_RAZORPAY_API,
      name: process.env.REACT_APP_RAZORPAY_NAME,
      description: "Test Payment",
      order_id: res.id,
      prefill: {
        name: "Kirubasankar D",
        email: "kirubasankard2@gmail.com",
        contact: "91" + 9688727025,
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
      handler: (response) => {
        alert("Your paymentment done and payment id is " + response.razorpay_payment_id)
        setCartDetails({
        total: 75,
        qty: 1,
        shipping:0
        });
        navigate("/");
      },
    };
    const razerPay = new window.Razorpay(options);
    razerPay.open();

    razerPay.off("payment.failed");
    // ⚠️ Handle Payment Failure
    razerPay.on("payment.failed", function (response) {
      if (failureHandled) return;
      failureHandled = true;
      // alert("❌ Payment Failed!\nReason: " + response.error.description);
      const failureData = {
        customerName: address.fullName,
        mobile: address.mobile,
        code: response.error.code,
        description: response.error.description,
        source: response.error.source,
        step: response.error.step,
        reason: response.error.reason,
        metadata: {
            order_id: response.error.metadata?.order_id,
            payment_id: response.error.metadata?.payment_id,
        },
        rawError: response.error, // optional
      };
      return axios.post("/payment-failed", failureData).then((res) => {
        return res?.data;
      }).catch((err) => {
        return console.log("Error", err);
      });
    });
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
