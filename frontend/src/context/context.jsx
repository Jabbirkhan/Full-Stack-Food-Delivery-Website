import { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "./../utils/axiosInstance.js";

export const Context = createContext();

const ContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const currency = '$';
    const deliveryFee = 10;
    const serviceCharge = 5;

    const [authState, setAuthState] = useState('checking');
    const [userProfile, setUserProfile] = useState({});
    const [cartItems, setCartItems] = useState({});
    const [cartData, setCartData] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    const verifyUser = async () => {
        try {
            const response = await axiosInstance.get(`/api/v1/user/verify`);
            if (response.data.success) {
                setAuthState('authenticated');
            }
        } catch (error) {
            setAuthState('unauthenticated');
            if (error.response?.status !== 401) {
                toast.error(error.response?.data?.message);
            }
        }
    }

    useEffect(() => {
        verifyUser();
    }, []);
    
    const fetchUserProfile = async () => {
        try {
            const response = await axiosInstance.get(`/api/v1/user/profile`);
            if (response.data.success) {
                setUserProfile(response.data.user);
            }
        } catch (error) {            
            toast.error(error.response?.data?.message);
        }
    }

    useEffect(() => {
        if (authState === 'authenticated') {
            fetchUserProfile();
        }
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get('/api/v1/user/allproducts');
            if (response.data.success) {
                setProducts(response.data.newProducts);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    useEffect(() => {
        if (authState === 'authenticated') {
            fetchProducts();
        }
    }, [authState]);

    const addToCart = async (itemId, size) => {
        try {
            if (!size) {
                toast.error("Please select a plate size.");
                return
            }
            const cartData = structuredClone(cartItems); // clone the cartItems object
            if (cartData[itemId]) {
                if (cartData[itemId][size]) {
                    cartData[itemId][size] += 1;
                    // toast.success('Food added into cart successfully');
                } else {
                    cartData[itemId][size] = 1;
                    // toast.success('Food added into cart successfully');
                }
            } else {
                cartData[itemId] = {}
                cartData[itemId][size] = 1;
                // toast.success('Food added into cart successfully');
            }
            setCartItems(cartData); // update the cartItems state so now the cartItems object have itemId and size

            if (authState === 'authenticated') {
                try {
                    const response = await axiosInstance.post(`/api/v1/user/addtocart`, { itemId, size });
                    if (response.data.success) {
                        toast.success(response.data.message);
                    }
                } catch (error) {
                    toast.error(error.response?.data?.message);
                }
            }

        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                if (cartItems[itemId][size] > 0) {
                    totalCount += cartItems[itemId][size]
                }
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                const product = products.find((product) => product._id === itemId);
                const price = size === 'Half' ? product.price[0] : size === 'Full' ? product.price[1] : product.price[0];
                totalAmount += price * cartItems[itemId][size]
            }
        }
        return totalAmount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        const cartData = structuredClone(cartItems);
        if (quantity <= 0) {
            delete cartData[itemId][size]
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId][size]
                toast.warn('Food is removed from cart');
            }
        } else {
            cartData[itemId][size] = quantity;
        }
        setCartItems(cartData);

        if (authState === 'authenticated') {
            try {
                const response = await axiosInstance.patch(`/api/v1/user/updatecart`, { itemId, size, quantity });
                if (response.data.success) {
                    toast.success(response.data.message);
                }
            } catch (error) {
                toast.error(error.response?.data?.message);
            }
        }
    }

    const getUserCart = async () => {
        try {
            const response = await axiosInstance.get(`/api/v1/user/cart`);
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    useEffect(() => {
        if (authState === 'authenticated') {
            getUserCart();
        }
    }, [authState]);

    const getUserOrders = async () => {
        try {
            const response = await axiosInstance.get(`/api/v1/user/orders`);
            if (response.data.success) {
                setOrders(response.data.userOrder);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    const value = useMemo(() => ({
        navigate, backendUrl, currency, deliveryFee, serviceCharge, products, setProducts,
        authState, setAuthState,
        cartItems, setCartItems,
        cartData, setCartData,
        orders, setOrders,
        userProfile, fetchUserProfile,
        getCartCount, getCartAmount, updateQuantity, addToCart, getUserOrders, getUserCart,
    }), [
        authState, userProfile, products, cartItems, cartData, orders, getCartCount, getCartAmount,
        updateQuantity, addToCart
    ]);

    return (
        <>
            <Context.Provider value={value}>
                {props.children}
            </Context.Provider>
        </>
    )
}

export default ContextProvider