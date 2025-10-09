import { Outlet, useLocation } from "react-router-dom";
import PaymentSummaryBar from "./components/PaymentSummaryBar";
import { useEffect } from "react";

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    // 🔓 Force-enable scroll after Razorpay closes
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
    document.body.style.height = "auto";
    document.documentElement.style.height = "auto";

    // Also reset scroll position
    window.scrollTo(0, 0);
  }, [location.pathname]); // runs every time you navigate

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-y-auto">
      {/* Main content */}
      <div className="pb-32"> {/* extra padding for summary bar */}
        <Outlet />
      </div>

      {/* Common Payment Summary Bar */}
      <PaymentSummaryBar total={150} qty={2} />
    </div>
  );
};

export default MainLayout;
