import { createContext, useContext, useState, useCallback, useMemo } from "react";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
    const [cartDetails, setCartDetails] = useState({
        total: 75,
        qty: 1,
        shipping:0
    });

    // Address details
    const [address, setAddress] = useState({
        fullName: "",
        mobile: "",
        door: "",
        street: "",
        city: "",
        district: "",
        pincode: "",
        state: "",
        landmark: "",
    });

    const [isFormValid, setIsFormValid] = useState(false);

    // This will be called on every change in the form
    const updateAddress = useCallback((field, value) => {
        setAddress((prev) => {
            // Only update if the value actually changed
            if (prev[field] === value) return prev;
            return { ...prev, [field]: value };
        });
    }, []);

    const addressValue = useMemo(() => ({ address, updateAddress }), [address, updateAddress]);

    const increaseQty = () => {
        setCartDetails((prev) => ({
            qty: prev.qty + 1,
            total: prev.total + 75,
        }));
    };

    const decreaseQty = () => {
        setCartDetails((prev) => ({
            qty: prev.qty > 0 ? prev.qty - 1 : 0,
            total: prev.total - 75,
        }));
    };

    // Address Handler
    const saveAddress = (data) => {
        setAddress(data);
    };

    const updateFormValidity = useCallback((valid) => {
        setIsFormValid(valid);
    }, []);

    const updateShipping = (value) => {
        setCartDetails(value);
    };

    return (
        <PaymentContext.Provider
            value={{ cartDetails, setCartDetails, increaseQty, decreaseQty, address, setAddress, saveAddress, addressValue, updateAddress, updateFormValidity, isFormValid, updateShipping }}
        >
            {children}
        </PaymentContext.Provider>
    );
};

export const usePayment = () => useContext(PaymentContext);
