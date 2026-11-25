import React from 'react'
import { assets } from '../assets/assets.js'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section aria-label='her-section'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 my-5'>
        
        <div className='flex flex-col justify-center items-start gap-2'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold'>Experience <span className='text-[#b52330]'>Culinary</span> <br />at your door step.</h1>
            <p className='text-gray-500 my-2'>
                GourmetDash brings the city's most prestigious restaurants to your <br />
                doorstep with the sephistication of private corcierge.
            </p>
            <div className='flex items-center gap-2'>
                <Link to='/order' className='bg-[#b52330] text-white px-4 py-2 rounded-md hover:bg-[#9a1d27] transition-all duration-200 cursor-pointer'>
                    Order Now
                </Link>
                <Link to='/products' className='border border-[#b52330] text-[#b52330] px-4 py-2 rounded-md hover:bg-[#9a1d27] hover:text-white transition-all duration-200 cursor-pointer'>
                    View Menu
                </Link>
            </div>
        </div>

        <div className='flex justify-end items-center relative md:h-125'>
            <img src={assets.header_img} className='w-full sm:w-10/12 h-96 sm:h-2/3 rounded-3xl object-cover bg-center' alt="Header" />
            <img src={assets.header_img} className='absolute hidden sm:block -bottom-10 sm:bottom-0 left-0 w-1/2 h-60 sm:h-1/2 border-8 border-gray-200 rounded-3xl object-cover bg-center' alt="Header" />
        </div>
      
      </div>
    </section>
  )
}

export default Hero
