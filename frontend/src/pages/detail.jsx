import React, { useContext, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaClock } from 'react-icons/fa';
import { Context } from '../context/context';

const Detail = () => {

    const { currency, addToCart, products } = useContext(Context);
    const { id } = useParams();

    const [size, setSize] = useState('');
    
    const product = useMemo(()=>{
      return products.find((item)=> item._id === id)
    }, [products, id]);
    
    if(!product){
      return <div className='w-full h-screen bg-[#fff8f7] flex flex-col justify-center items-center gap-2'>
        <p>Product not found!</p>
        <div className='flex flex-col gap-2'>
          <p className='text-gray-500'>Go to Home Page</p>
          <Link to='/' className='px-4 py-2 bg-[#b52330] text-white rounded-sm' >Home</Link>
        </div>
      </div>
    }

  return (
    <section aria-label='detail-page' className='bg-[#fff8f7] my-10'>

      <div className='mx-[1%] sm:mx-[5%]'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
          
          <div className='p-5 rounded-md'>
            <img src={product.image} className='w-full object-cover rounded-md' alt={product.name} />
          </div>
          
          <div className='p-5'>

            <h1 className='text-3xl font-bold mb-2'>{product.name}</h1>
            <div className='flex items-center gap-2 mb-5'>
              <FaClock/>
              <p className='text-base'>25-35 min</p>
            </div>

            <div className='bg-white rounded-md p-3'>

              <div className='flex justify-between items-center mb-1'>
                <h3 className='text-[#b52330] text-3xl font-semibold'>{currency}{size === 'Half' ? product.price[0] : size === 'Full' ? product.price[1] : product.price[0]}.00</h3>
              </div>
              
              <div className='mb-1'>
                <p>{product.description}</p>
              </div>

              <div className='my-2'>
                <h4 className='text-lg font-medium my-2'>Select plate size</h4>
                {product.sizes.map((s, i) => (
                    <button key={i} onClick={()=>setSize(s)} className={`px-4 py-2 mx-2 ${size === s ? 'bg-[#b52330] text-white' : 'bg-[#fff8f7]'} rounded-sm hover:bg-[#b52330] hover:text-white transition-all duration-200 cursor-pointer`}>{s}</button>
                ))}
                {/* <div className='flex flex-wrap gap-2 my-4'>
                  <button onClick={()=>setSize('Half')} className={`px-4 py-2 ${size === 'Half' ? 'bg-[#b52330] text-white' : 'bg-[#fff8f7]'} rounded-sm hover:bg-[#b52330] hover:text-white transition-all duration-200 cursor-pointer`}>Half</button>
                  <button onClick={()=>setSize('Full')} className={`px-4 py-2 ${size === 'Full' ? 'bg-[#b52330] text-white' : 'bg-[#fff8f7]'} rounded-sm hover:bg-[#b52330] hover:text-white transition-all duration-200 cursor-pointer`}>Full</button>
                  <button onClick={()=>setSize('Double')} className={`px-4 py-2 ${size === 'Double' ? 'bg-[#b52330] text-white' : 'bg-[#fff8f7]'} rounded-sm hover:bg-[#b52330] hover:text-white transition-all duration-200 cursor-pointer`}>Double</button>
                </div> */}
              </div>

              <button onClick={()=>addToCart(product._id, size)} className='w-full px-4 py-2 text-white text-lg font-medium text-center cursor-pointer bg-[#b52330] hover:bg-[#e40618] transition-all duration-200'>Add to Cart</button>

            </div>
          </div>
        
        </div>
      </div>

    </section>
  )
}

export default Detail
