import React, { useContext, useEffect } from 'react'
import { Context } from '../context/context'
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Cart = () => {

  const { products, cartData, setCartData, cartItems, currency, updateQuantity, getCartAmount, getCartCount, deliveryFee, serviceCharge, getUserCart } = useContext(Context);

  useEffect(() => {
    let tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: cartItems[itemId][size]
          })
        }
      }
    }
    setCartData(tempData);
  }, [cartItems, products]);

  useEffect(() => {
    getUserCart();
  }, []);

  if (cartData.length === 0) {
    return <div className='flex flex-col justify-center items-center w-full h-screen bg-[#fff8f7]'>
      <h2 className='text-2xl font-semibold text-[#b52330] mb-2'>Cart is empty</h2>
      <div className='flex flex-col gap-2'>
        <p className='text-gray-600 mb-1'>Add food to cart</p>
        <Link to='/products' className='px-4 py-2 bg-[#b52330] text-white hover:bg-[#e40618] transition-all duration-200 rounded-sm cursor-pointer text-center'>Add Product</Link>
      </div>
    </div>
  }

  return (
    <section aria-label='cart-page' className='mx-[1%] lg:mx-[5%] bg-[#fff8f7] my-10'>
      <div className='grid grid-cols-1 lg:grid-cols-10 gap-5'>

        {/* Cart Items - 70% */}
        <div className='lg:col-span-7'>

          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-semibold'>
              Your Food Selection
            </h2>

            <p className='text-base text-gray-500'>
              {getCartCount()} items
            </p>
          </div>

          <div className='flex flex-col gap-4'>
            {cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);

              return (
                <div
                  key={index}
                  className='grid grid-cols-1 sm:grid-cols-4 gap-4 p-3 bg-white rounded-md shadow-sm'
                >

                  {/* Image */}
                  <div className='sm:col-span-1'>
                    <img
                      src={productData.image}
                      alt={productData.name}
                      className='w-full h-55 sm:h-full object-cover rounded-md'
                    />
                  </div>

                  {/* Content */}
                  <div className='sm:col-span-3 flex flex-col justify-between'>

                    <div>
                      <div className='flex justify-between items-start mb-2'>
                        <h1 className='text-lg sm:text-xl font-semibold'>{productData.name}</h1>
                        <FaTrash onClick={() => updateQuantity(productData._id, item.size, 0)} className='cursor-pointer hover:text-[#b52339] transition-all duration-200' />
                      </div>

                      <p className='text-gray-600 mb-3 line-clamp-2'>
                        {productData.description}
                      </p>

                      <span className='inline-block px-4 py-2 bg-[#fff8f7] rounded-md text-sm font-medium'>
                        {item.size}
                      </span>
                    </div>

                    {/* Price + Quantity */}
                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4'>

                      <p className='text-2xl font-bold text-[#b52330]'>{currency}{item.size === 'Half' ? productData.price[0] : item.size === 'Full' ? productData.price[1] : productData.price[0]}.00</p>
                      <div className='flex items-center gap-2 p-2 rounded-lg bg-[#fff8f7] w-fit'>
                      <button onClick={() => updateQuantity( productData._id, item.size, item.quantity - 1 )} className='w-8 h-8 pb-1 rounded-full bg-white text-xl cursor-pointer'>-</button>
                      <input type='number' value={item.quantity} min={1} onChange={(e) => updateQuantity( productData._id, item.size, Number(e.target.value))} className='w-12 text-center outline-none bg-transparent no-spinner'/>
                      <button onClick={() => updateQuantity( productData._id, item.size, item.quantity + 1 )} className='w-8 h-8 pb-1 rounded-full bg-[#b52330] text-white text-xl cursor-pointer'>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Price Summary - 30% */}
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

              <Link to='/checkout' className='block'>
                <button className='w-full px-4 py-3 bg-[#b52330] text-white text-lg hover:bg-[#e40618] transition-all duration-200 cursor-pointer rounded-md'>
                  Checkout
                </button>
              </Link>

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Cart
