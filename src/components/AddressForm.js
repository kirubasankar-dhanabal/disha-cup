import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { usePayment } from "./context/PaymentContext";

const AddressForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm({ mode: "onChange" });
  const { cartDetails, updateAddress, updateFormValidity, updateShipping } = usePayment();
  const { pathname } = useLocation();
  // Watch all fields
  const watchedFields = watch();

  // Whenever watchedFields changes, update context
  useEffect(() => {
    // Only update when there’s some input
    Object.entries(watchedFields).forEach(([key, value]) => {
      if (value !== undefined) updateAddress(key, value);
    });
  }, [watchedFields, updateAddress]);

  useEffect(() => {
    updateFormValidity(isValid);
  }, [isValid, updateFormValidity]);

  // const onSubmit = (data) => {
  //   console.log("✅ Address Data:", data);
  //   saveAddress(data);
  //   alert("Form submitted successfully!");
  // };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  }, [pathname]);

  useMemo(() => {
    const selectedState = watchedFields.state;
    const qty = cartDetails.qty || 1;

    let shipping = 0;

    // 📦 Shipping rules
    if (selectedState && selectedState !== "TN" && qty > 10) {
      shipping = 80;
    } else if (selectedState && selectedState !== "TN" && qty <= 10) {
      shipping = 50;
    } else if (selectedState === "TN" && qty > 10) {
      shipping = 50;
    } else {
      shipping = 0;
    }

    updateShipping({
      ...cartDetails,
      shipping,
      // ✅ use subtotal, not total
    });

  }, [watchedFields.state, cartDetails.qty]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6">
        {/* Header */}
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          📮 2026 நித்திரா தமிழ் காலண்டர் பெறுவதற்கு உங்கள் முகவரியை உள்ளிடவும்
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          முகவரி சேமிக்கப்பட்டவுடன் உடனே கட்டணம் செலுத்தவும் பக்கத்திற்கு மாற்றுவோம்.
        </p>

        {/* Form */}
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              முழு பெயர்
            </label>
            <input
              type="text"
              {...register("fullName", { required: "முழு பெயர் தேவையாகும்" })}
              placeholder="EX: ராமன் சுப்பிரமணியம்"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              மொபைல் எண்
            </label>
            <input
              type="text"
              {...register("mobile", {
                required: "மொபைல் எண் தேவையாகும்",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "10 இலக்க மொபைல் எண் மட்டும் உள்ளிடவும்",
                },
              })}
              placeholder="10 இலக்க எண்"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobile.message}
              </p>
            )}
          </div>

          {/* Door / Flat / Building */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Door / Flat / Building
            </label>
            <input
              type="text"
              {...register("building", { required: "இந்த பகுதி தேவையாகும்" })}
              placeholder="EX: 12A, ஸ்ரீ அபார்ட்மென்ட்"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            {errors.building && (
              <p className="text-red-500 text-sm mt-1">
                {errors.building.message}
              </p>
            )}
          </div>

          {/* Street / Area / Road */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Street / Area / Road
            </label>
            <input
              type="text"
              {...register("street", { required: "தெரு / பகுதி தேவையாகும்" })}
              placeholder="EX: ராஜாஜி சாலை"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            {errors.street && (
              <p className="text-red-500 text-sm mt-1">
                {errors.street.message}
              </p>
            )}
          </div>

          {/* Town / City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Town / City
            </label>
            <input
              type="text"
              {...register("city", { required: "நகரம் தேவையாகும்" })}
              placeholder="EX: திருச்சி"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">
                {errors.city.message}
              </p>
            )}
          </div>

          {/* District */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              District
            </label>
            <input
              type="text"
              {...register("district", { required: "மாவட்டம் தேவையாகும்" })}
              placeholder="EX: திருச்சி மாவட்டம்"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            {errors.district && (
              <p className="text-red-500 text-sm mt-1">
                {errors.district.message}
              </p>
            )}
          </div>

          {/* Landmark */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Landmark (விருப்பம்)
            </label>
            <input
              type="text"
              {...register("landmark")}
              placeholder="EX: பஸ் ஸ்டாண்ட் பக்கத்தில்"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              அஞ்சல் எண் (Pincode)
            </label>
            <input
              type="text"
              {...register("pincode", {
                required: "அஞ்சல் எண் தேவையாகும்",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "6 இலக்க அஞ்சல் எண் மட்டும் உள்ளிடவும்",
                },
              })}
              placeholder="6 இலக்க PIN"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            {errors.pincode && (
              <p className="text-red-500 text-sm mt-1">
                {errors.pincode.message}
              </p>
            )}
          </div>

          {/* State */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              மாநிலம் (State)
            </label>
            <select
              {...register("state", { required: "மாநிலம் தேவையாகும்" })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">-- மாநிலத்தை தேர்வு செய்யவும் --</option>
              <option value="TN">Tamil Nadu</option>
              <option value="KA">Karnataka</option>
              <option value="KL">Kerala</option>
              <option value="AP">Andhra Pradesh</option>
              <option value="TE">Telangana</option>
            </select>
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">
                {errors.state.message}
              </p>
            )}
          </div>

          {/* Submit Button
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-violet-600 text-white font-semibold py-2 rounded-lg hover:bg-violet-700 transition"
            >
              முகவரி சமர்ப்பிக்கவும்
            </button>
          </div> */}
        </form>

        {/* Order Summary */}
        <div className="bg-slate-50 rounded-2xl shadow-md p-3 border border-gray-200 mt-4">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
            <h3 className="font-bold text-gray-800 text-lg mb-4">
              📑 Order Summary
            </h3>

            <div className="flex justify-between items-center text-gray-700 mb-2">
              <span>💰 Calendar Amount</span>
              <span className="font-semibold">₹{cartDetails.total}</span>
            </div>

            <div className="flex justify-between items-center text-gray-700 mb-2">
              <span>🚚 Shipping Amount</span>
              <span className="font-semibold">₹{cartDetails.shipping}</span>
            </div>

            <div className="flex justify-between items-center font-bold text-gray-900 text-lg mt-4 mb-4">
              <span>📅 மொத்தம் (Total)</span>
              <span>₹{cartDetails.total + cartDetails.shipping}</span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              தமிழ்நாடு முழுவதும் 10 காலண்டர் வரை Order செய்தால் Shipping Charges
              இல்லை. அதற்கு மேல் Order செய்தால் Rs.50 (Shipping Charges)
              வசூலிக்கப்படும். பிற மாநிலங்களுக்கு 10 காலண்டர் வரை Order செய்தால்
              Rs.50 (Shipping Charges), அதற்கு மேல் Order செய்தால் Rs.80 (Shipping
              Charges) வசூலிக்கப்படும்.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
