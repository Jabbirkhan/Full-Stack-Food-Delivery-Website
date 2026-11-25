import React, { useContext, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaCartPlus, FaBars, FaArrowLeft, FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Context } from '../context/context';
import axiosInstance from '../utils/axiosInstance.js';
import Loader from './loader.jsx';

const Navbar = () => {

  const { authState, setAuthState, navigate, getCartCount, userProfile } = useContext(Context);
  const profile = userProfile || {};

  const location = useLocation();
  const [visible, setVisible] = useState(false);

  const [loader, setLoader] = useState(false);

  if (location.pathname === '/login' || location.pathname === '/user-forget-password' || location.pathname === '/verify-email' || location.pathname === '/privacy-policy' || location.pathname === '/terms-of-service') {
    return null;
  }
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post(`/api/v1/user/logout`, {});
      if (response.data.success) {
        toast.success(response.data.message || "Logged out successfully");
        setAuthState('unauthenticated');
        navigate('/login');
      }
    } catch (error) {
      if (error.response?.status !== 401) {
        toast.error(error.response?.data?.message);
      }
    }
  }

  const sendOtpForEmailVerification = async () => {
    try {
      if (authState !== 'authenticated') {
        return navigate('/login');
      }

      setLoader(true);
      const response = await axiosInstance.get('/api/v1/user/send-verify-email-otp');
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/verify-email');
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoader(false);
    }
  }

  if (loader) {
    return <Loader />
  }

  return (
    <header className='bg-[#fff8f7] border-b border-gray-300 shadow-lg relative'>

      <nav className='flex justify-between items-center mx-[1%] sm:mx-[5%] py-2'>
        <div>
          <h1 className='text-xl sm:text-2xl font-bold text-[#b52330]'>
            GourmetDash
          </h1>
        </div>
        <div className='hidden sm:flex items-center gap-10'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/products'>Products</NavLink>
          <NavLink to='/about'>About</NavLink>
          <NavLink to='/contact'>Contact</NavLink>
        </div>
        <div className='flex items-center gap-2 sm:gap-4'>
          <div className='hidden sm:block group relative'>
            <FaUserCircle className='text-2xl sm:text-4xl text-[#b52330] cursor-pointer' />
            <div className='w-40 border border-[#f78a93] absolute top-9 right-0 p-3 space-y-2 z-20 hidden group-hover:flex flex-col bg-[#fff8f7] text-gray-500 rounded-sm transition-all duration-300'>
              <Link to='/order' className='cursor-pointer hover:text-black'>Order</Link>
              {profile.isAccountVerified ? (
                <p className="cursor-pointer hover:text-black">
                  Verified
                </p>
              ) : (
                <p
                  onClick={sendOtpForEmailVerification}
                  className="cursor-pointer hover:text-black"
                >
                  Verify email
                </p>
              )}
              <button className='cursor-pointer hover:text-black text-left' onClick={handleLogout}>{authState === 'authenticated' ? 'Logout' : 'Login'}</button>
            </div>
          </div>
          <div className='flex items-center relative text-white gap-2 bg-[#b52330] cursor-pointer p-1 sm:p-2 rounded-md'>
            <FaCartPlus />
            <div className='absolute -top-1 sm:top-0 right-10 z-30 flex justify-center items-center text-sm'>{getCartCount()}</div>
            <Link to='/cart'>Cart</Link>
          </div>
          <div className='sm:hidden text-2xl' onClick={() => setVisible(true)}>
            <FaBars />
          </div>
        </div>
      </nav>

      <nav className={`absolute top-0 left-0 bottom-0 overflow-hidden ${visible ? 'w-full h-screen' : 'w-0'} bg-[#fff8f7] z-10 transition-all duration-200`}>
        <div className='flex items-center gap-3 mb-5 p-2 border-b border-gray-300'>
          <FaArrowLeft className='text-xl' onClick={() => setVisible(false)} />
          <p className='cursor-pointer text-xl' onClick={() => setVisible(false)}>Back</p>
        </div>
        <div className='flex flex-col items-center gap-3'>
          <NavLink to='/' onClick={() => setVisible(false)}>Home</NavLink>
          <NavLink to='/products' onClick={() => setVisible(false)}>Products</NavLink>
          <NavLink to='/about' onClick={() => setVisible(false)}>About</NavLink>
          <NavLink to='/contact' onClick={() => setVisible(false)}>Contact</NavLink>
          <NavLink to='/order' onClick={() => setVisible(false)}>Order</NavLink>
          <button className='cursor-pointer hover:text-black' onClick={handleLogout}>{authState === 'authenticated' ? 'Logout' : 'Login'}</button>
        </div>
      </nav>

    </header>
  )
}

export default Navbar
