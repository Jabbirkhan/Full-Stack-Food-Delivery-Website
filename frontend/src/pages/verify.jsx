import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Context } from '../context/context';
import axiosInstance from '../utils/axiosInstance.js';

const Verify = () => {

  const { navigate, authState, getUserCart } = useContext(Context);

  // 5. Here we get the query parameters that backend send
  const queryParams = new URLSearchParams(window.location.search);
  const success = queryParams.get('success');
  const canceled = queryParams.get('canceled');
  const orderId = queryParams.get('orderId');

  // 6. Here we verify the payment status by sending a request to backend with orderId and success query parameters, backend will verify the payment status and update the order status in database, and also clear the cart data in user profile if payment is successful
  const verifyPayment = async () => {
    try {
      if (authState === 'unauthenticated') {
        navigate('/login');
        return;
      }

      if (canceled === "true") {
        navigate("/cart");
        return;
      }
      if (!orderId) {
        navigate("/cart");
        return;
      }

      const response = await axiosInstance.post(`/api/v1/user/verifystripeorder?orderId=${orderId}`);
      if (response.data.payment) {
        toast.success(response.data.message);
        getUserCart();
        navigate('/order');
      } else {
        toast.error(response.data.message || "Unable to verify payment");
        navigate('/cart');
      }

    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div>
      Payment verify page
    </div>
  )
}

export default Verify
