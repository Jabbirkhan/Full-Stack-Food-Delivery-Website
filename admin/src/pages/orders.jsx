import React, { useContext } from 'react'
import { Context } from '../context/context'

const Orders = () => {

  const { currency, statusHandler, orders } = useContext(Context);

  return (
    <section className='w-full min-h-screen p-2 pt-6 sm:p-6 lg:p-10'>
      <div className='bg-white rounded-md p-4 sm:p-6 shadow-sm'>

        <div className='mb-5'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-medium mb-2'>
            All Orders
          </h1>
          <hr className='border border-gray-300' />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start'>
          {orders.map((order, index) => (
            <div key={index} className='bg-white p-5 rounded-md shadow-sm'>

              <div className='flex flex-col mb-2'>
                <div className='flex justify-between items-center'>
                  <h2 className='text-lg font-semibold text-[#b52330] mb-2'>Order #{index + 1}</h2>
                  {/* Status */}
                  <div>
                    {/* <h4 className="text-lg font-semibold text-gray-900 mb-3">Status</h4> */}
                    <select
                      className="w-full outline-none p-2 border-2 border-gray-300 rounded-lg font-semibold text-sm focus:ring focus:ring-blue-300"
                      value={order.status}
                      onChange={(e) => { statusHandler(order._id, e.target.value) }}
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
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

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Orders
