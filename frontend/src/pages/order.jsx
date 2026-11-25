import React, { useContext, useEffect } from 'react'
import { Context } from '../context/context'
import { Link } from 'react-router-dom';

const Order = () => {

  const { currency, orders, getUserOrders, authState, navigate } = useContext(Context);

  const handleOrderTrack = async () => {
    await getUserOrders();
  }

  useEffect(()=>{
    if(authState === 'authenticated'){
      getUserOrders();
    }
  },[]);

  if (orders.length === 0) {
    return <div className='flex flex-col justify-center items-center w-full h-screen bg-[#fff8f7]'>
      <h2 className='text-2xl font-semibold text-[#b52330] mb-2'>No orders found</h2>
      <div className='flex flex-col gap-2'>
        <p className='text-gray-600 mb-1'>You haven't placed any orders yet</p>
        <Link to='/products' className='px-4 py-2 bg-[#b52330] text-white hover:bg-[#e40618] transition-all duration-200 rounded-sm cursor-pointer text-center'>Add Product</Link>
      </div>
    </div>
  }

  return (
    <section aria-label='order-page' className='mx-[1%] sm:mx-[5%] bg-[#fff8f7] my-10'>
      <h1 className='text-2xl font-bold my-10 text-center'>Your <span className='text-[#b52330]'>Orders</span></h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start'>
        {orders.map((order, index) => (
          <div key={index} className='bg-white p-5 rounded-md shadow-sm'>

            <div className='flex flex-col mb-2'>
              <div className='flex justify-between items-center'>
                <h2 className='text-lg font-semibold text-[#b52330] mb-2'>Order #{index + 1}</h2>
                <p className='text-gray-600 px-4 py-2 border border-gray-300 rounded-md'>{order.status}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-gray-600'>Amount: <span className='font-bold'>{currency}{order.amount}</span></p>
                <p className='text-gray-600'>Payment Method: <span className='font-bold'>{order.paymentMethod}</span></p>
              </div>
            </div>

            <div className='grid grid-cols-3 mb-2'>
              {order.items.map((item, idx) => (
                <div key={idx} className='flex flex-col mb-2 mx-2 outline rounded-md p-1 bg-[#fff8f7] shadow-md'>
                  <img src={item.image} alt={item.name} className='w-full h-16 object-cover rounded-md' />
                  <p className='text-sm line-clamp-1'>{item.name}</p>
                  <p className='text-xs text-gray-600'>({item.size}) x {item.quantity}</p>
                </div>
              ))}
            </div>

            <div className='mb-2'>
              <h2 className='text-gray-600 font-bold mb-1'>Delivery Address</h2>
              <p className='text-gray-600'>{order.address.name}</p>
              <p className='text-gray-600'>{order.address.email}</p>
              <p className='text-gray-600'>{order.address.phone}</p>
              <p className='text-gray-600'>{order.address.address}</p>
            </div>

            <div className='my-1 flex justify-end'>
              <button onClick={handleOrderTrack} className='px-4 py-2 border border-[#b52330] hover:bg-[#fa0419] hover:text-white cursor-pointer transition-all duration-200'>Track Order</button>
            </div>

          </div>
        ))}
      </div>
    </section>
  )
}

export default Order
