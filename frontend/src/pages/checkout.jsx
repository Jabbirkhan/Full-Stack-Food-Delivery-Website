import React, { useContext, useState } from 'react'
import { Context } from '../context/context';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/loader';
import axiosInstance from '../utils/axiosInstance.js';

const Checkout = () => {

    const { products, currency, getCartAmount, deliveryFee, serviceCharge, cartData, cartItems, authState, navigate, setOrders } = useContext(Context);

    const [loader, setLoader] = useState(false);

    const [method, setMethod] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((data) => ({ ...data, [name]: value }));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            let orderItems = [];
            for (const itemId in cartItems) {
                for (const size in cartItems[itemId]) {
                    if (cartItems[itemId][size] > 0) {
                        const itemInfo = structuredClone(products.find((p) => p._id === itemId))
                        itemInfo.quantity = cartItems[itemId][size]; // here we are pushing quantity of each item into each order item info because in backend we are expecting quantity for each item to calculate total amount of order
                        itemInfo.size = size; // here we are pushing size of each item into each order item info because in backend we are expecting size for each item to calculate total amount of order
                        orderItems.push(itemInfo);
                    }
                }
            }

            const orderData = {
                items: orderItems,
                amount: getCartAmount() + deliveryFee + serviceCharge,
                paymentMethod: method,
                address: formData,
            }

            if (authState === 'authenticated' && method === 'cod') {
                setLoader(true);                

                const response = await axiosInstance.post(`/api/v1/user/placeorder`, orderData);
                if (response.data.success) {
                    toast.success(response.data.message);
                    setTimeout(() => {
                        navigate('/order');
                    }, 1000);
                }
            }
            if (authState === 'authenticated' && method === "stripe") {
                setLoader(true);

                const idempotencyKey = sessionStorage.getItem("stripeCheckoutKey") || crypto.randomUUID();

                sessionStorage.setItem("stripeCheckoutKey", idempotencyKey);

                const response = await axiosInstance.post(`/api/v1/user/placestripeorder`, orderData, idempotencyKey);
                if (response.data.success) {
                    // window.location.href = response.data.session_url;
                    const { session_url } = response.data;
                    window.location.replace(session_url);
                    sessionStorage.removeItem("stripeCheckoutKey");
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoader(false);
        }
    }

    if (cartData.length === 0) {
        return <div className='flex flex-col justify-center items-center w-full h-screen bg-[#fff8f7]'>
            <h2 className='text-2xl font-semibold text-[#b52330] mb-2'>Cart is empty</h2>
            <div className='flex flex-col gap-2'>
                <p className='text-gray-600 mb-1'>Add food to cart</p>
                <Link to='/products' className='px-4 py-2 bg-[#b52330] text-white hover:bg-[#e40618] transition-all duration-200 rounded-sm cursor-pointer text-center'>Add Product</Link>
            </div>
        </div>
    }

    if (loader) {
        return <Loader />
    }

    return (
        <section aria-label='checkout-page' className='mx-[1%] lg:mx-[5%] bg-[#fff8f7] my-10'>
            <div className='grid grid-cols-1 lg:grid-cols-10 gap-5'>

                <div className='lg:col-span-7'>
                    <h2 className='text-2xl font-semibold text-[#b52330] mb-5'>Checkout</h2>
                    <form onSubmit={onSubmitHandler} id='checkout-form' className='bg-white rounded-md p-5 shadow-sm'>
                        <div className='flex flex-col gap-4 mb-5'>

                            <div className='flex items-center flex-wrap gap-2'>
                                <div className='flex flex-col gap-1 flex-1'>
                                    <label htmlFor='name' className='text-gray-600'>Name</label>
                                    <input type='text' id='name' onChange={handleInputChange} value={formData.name} name='name' className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b52330]' placeholder='Enter your name' required />
                                </div>
                                <div className='flex flex-col gap-1 flex-1'>
                                    <label htmlFor='email' className='text-gray-600'>Email</label>
                                    <input type='email' id='email' onChange={handleInputChange} value={formData.email} name='email' className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b52330]' placeholder='Enter your email' required />
                                </div>
                            </div>

                            <div className='flex items-center flex-wrap gap-2'>
                                <div className='flex flex-col gap-1 flex-1'>
                                    <label htmlFor='phone' className='text-gray-600'>Phone</label>
                                    <input type='number' id='phone' onChange={handleInputChange} value={formData.phone} name='phone' className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b52330]' placeholder='Enter your phone number' required />
                                </div>
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label htmlFor='address' className='text-gray-600'>Delivery Address</label>
                                <textarea type='text' id='address' onChange={handleInputChange} value={formData.address} name='address' rows={3} className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b52330] resize-none' placeholder='Enter your delivery address' required></textarea>
                            </div>


                        </div>
                    </form>
                </div>

                <div className='lg:col-span-3'>
                    <div className='sticky top-20 p-5 bg-white rounded-md shadow-sm'>

                        <h2 className='text-xl font-semibold mb-5'>
                            Order Summary
                        </h2>

                        <div className='space-y-4'>

                            <div className='flex justify-between items-center'>
                                <p className='text-gray-500'>Subtotal</p>
                                <h3 className='text-lg font-medium'>
                                    {currency}
                                    {getCartAmount()}.00
                                </h3>
                            </div>

                            <div className='flex justify-between items-center'>
                                <p className='text-gray-500'>Delivery Fee</p>
                                <h3 className='text-lg font-medium'>
                                    {currency}
                                    {deliveryFee}.00
                                </h3>
                            </div>

                            <div className='flex justify-between items-center'>
                                <p className='text-gray-500'>Service Charges</p>
                                <h3 className='text-lg font-medium'>
                                    {currency}
                                    {serviceCharge}.00
                                </h3>
                            </div>

                            <hr />

                            <div className='flex justify-between items-center'>
                                <p className='text-lg font-semibold'>Total</p>
                                <h3 className='text-xl font-bold text-[#b52330]'>
                                    {currency}
                                    {getCartAmount() === 0
                                        ? 0
                                        : getCartAmount() + deliveryFee + serviceCharge}.00
                                </h3>
                            </div>

                            <div className="max-w-sm w-full flex flex-col justify-start items-start mt-4 gap-3">
                                <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
                                <div className="flex justify-between items-center gap-2">
                                    <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                                        <input type="checkbox" />
                                        <p className='text-sm text-gray-500 font-medium mx-4'>CASH ON DELIVERY</p>
                                    </div>
                                    <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                                        <input type="checkbox" />
                                        <p className='text-sm text-gray-500 font-medium mx-4'>Stripe</p>
                                    </div>
                                </div>
                            </div>

                            <button type='submit' form='checkout-form' className='w-full px-4 py-3 bg-[#b52330] text-white text-lg hover:bg-[#e40618] transition-all duration-200 cursor-pointer rounded-md'>
                                Place Order
                            </button>

                        </div>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default Checkout
