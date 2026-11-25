import { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "./../utils/axiosInstance.js";
import Loader from "./../components/loader";

export const Context = createContext();

const ContextProvider = (props) => {

    const navigate = useNavigate();
    const currency = "$";
    const [authState, setAuthState] = useState('checking');
    const [orders, setOrders] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    const verifyAdmin = async () => {
        try {
            setLoadingMessage('Verifying admin...');
            const response = await axiosInstance.get(`/api/v1/admin/verify`);
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
        verifyAdmin();
    }, []);

     const fetchOrders = async () => {
        try {
            const response = await axiosInstance.get('/api/v1/admin/orders');
            if (response.data.success) {
                setOrders(response.data.orders);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    useEffect(() => {
        if (authState === 'authenticated') {
            fetchOrders();
        }
    }, [authState]);

    const statusHandler = async (id, status) => {
        try {
            const response = await axiosInstance.patch(`/api/v1/admin/updatestatus/${id}`, { status });
            if (response.data.success) {
                toast.success(response.data.message || "Order status updated successfully");
                // setOrders((prev) => prev.map((order) => order._id === id ? { ...order, status } : order));
                await fetchOrders();
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    const autoStatusUpdate = async () => {
        try {
            const response = await axiosInstance.patch('/api/v1/admin/autostatusupdate');
            if (response.data.success) {
                toast.success(response.data.message || "Auto status update completed");
                await fetchOrders();
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    useEffect(() => {
        if (authState === 'authenticated') {
            const interval = setInterval(() => {
                autoStatusUpdate();
            }, 60 * 60 * 1000); // Run every hour
            return () => clearInterval(interval); // Cleanup on unmount
        }
    }, [authState]);

      const fetchProducts = async () => {
        try {
          const response = await axiosInstance.get(`/api/v1/admin/allproducts`);
          if (response.data.success) {
            setAllProducts(response.data.newProducts);
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

    const value = useMemo(() => ({
        navigate, currency,
        authState, setAuthState,
        orders, setOrders,
        statusHandler,
        allProducts, setAllProducts,
    }), [authState, orders, allProducts]);

    return (
        <>
            <Context.Provider value={value}>
                {props.children}
            </Context.Provider>
        </>
    )
}

export default ContextProvider