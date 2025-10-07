import { Outlet } from "react-router-dom";
import PaymentSummaryBar from "./components/PaymentSummaryBar";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen pb-24 bg-gray-50">
      {/* Main content */}
      <Outlet />

      {/* Common Payment Summary Bar */}
      <PaymentSummaryBar total={150} qty={2}/>
    </div>
  );
};

export default MainLayout;
