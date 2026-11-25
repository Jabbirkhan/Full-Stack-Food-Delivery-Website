import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Footer = () => {

    const location = useLocation();
    if(location.pathname === '/login' || location.pathname === '/user-forget-password' || location.pathname === '/verify-email' || location.pathname === '/privacy-policy' || location.pathname === '/terms-of-service'){
        return null;
    }

    const date = new Date();

  return (
    <footer aria-label='footer-section' className='bg-[#261817] py-10'>
      <section className='mx-[1%] sm:mx-[5%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-b border-[#b52330]'>
        <div className='mb-5'>
          <h1 className="text-4xl font-bold text-[#b52330] mb-2">GourmetDash</h1>
          <p className='text-gray-300'>Redefining the standard of food deliver throught execelence, speed and sophistication.</p>
        </div>
        <div className='mb-5'>
          <h2 className='text-xl font-medium mb-2 text-white'>Quick Links</h2>
          <ul className='flex flex-col gap-2'>
            <Link className='text-gray-300 hover:text-white transition-all duration-200'>Browse Products</Link>
            <Link className='text-gray-300 hover:text-white transition-all duration-200'>Become a partner</Link>
            <Link className='text-gray-300 hover:text-white transition-all duration-200'>Become a courier</Link>
            <Link className='text-gray-300 hover:text-white transition-all duration-200'>Corporate orders</Link>
          </ul>
        </div>
        <div className='mb-5'>
          <h2 className='text-xl font-medium mb-2 text-white'>Company</h2>
          <ul className='flex flex-col gap-2'>
            <Link to='/about' className='text-gray-300 hover:text-white transition-all duration-200'>About Us</Link>
            <Link to='/contact' className='text-gray-300 hover:text-white transition-all duration-200'>Contact</Link>
            <Link to='/privacy-policy' className='text-gray-300 hover:text-white transition-all duration-200'>Privacy Policy</Link>
            <Link to='/terms-of-service' className='text-gray-300 hover:text-white transition-all duration-200'>Terms of Service</Link>
          </ul>
        </div>
        <div className='flex flex-col justify-start mb-5'>
          <h2 className='text-xl font-medium mb-2 text-white'>News Letter</h2>
          <p className='text-gray-300 mb-2'>Get weekly recipies and exclusive offers delivered to your inbox.</p>
          <input type="text"  className='outline-none bg-[#382928] py-2 px-1 rounded-md placeholder:text-gray-500' placeholder='Email Address'/>
        </div>
      </section>

      <section>
        <div className='mx-[1%] sm:mx-[5%] mt-10 flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-400'>
          <div className='mb-3 sm:mb-0'>@ {date.getFullYear()} GourmetDash loc. All right reserved.</div>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-5'>
            <Link className='text-gray-400 hover:text-white transition-all duration-200'>Terms of service</Link>
            <Link className='text-gray-400 hover:text-white transition-all duration-200'>Privacy policy</Link>
            <Link className='text-gray-400 hover:text-white transition-all duration-200'>Accessibilty</Link>
          </div>
        </div>
      </section>

    </footer>
  )
}

export default Footer
