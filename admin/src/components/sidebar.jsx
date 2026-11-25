// version 2 
import React, { useState, useEffect, useContext } from 'react'
import { NavLink, Link } from 'react-router-dom';
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import axiosInstance from "./../utils/axiosInstance";
import { Context } from "./../context/context";
import { useLocation } from "react-router-dom";

const SideBar = () => {

    const { setAuthState, navigate } = useContext(Context);

    const location = useLocation();
    if(location.pathname === '/login' || location.pathname === '/admin-forget-password') {
        return null;
    }

    const [visible, setVisible] = useState(false);

    const handleLogout = async () => {
        try {
            const response = await axiosInstance.post('/api/v1/admin/logout', {}); // POST accept three parameters, but GET accept only two parameters, so we pass an empty object as the second parameter
            if (response.data.success) {
                setAuthState('unauthenticated');
                navigate('/login');
                toast.success(response.data.message || "Logged out successfully");
            }
        } catch (error) {
            if(error.response?.status !== 401) {
                toast.error(error.response?.data?.message);
            }
        }
    }

    return (
        <aside aria-label='aside-bar'>

            {/* Desktop Sidebar */}
            <div className={`hidden sm:block h-screen w-52 p-2 px-5 fixed top-0 left-0 bg-[#fff0ef]`}>

                {/* Sidebar menu */}
                <nav aria-label='navbar' className='flex flex-col justify-start items-start'>

                    <div className='flex justify-start items-center gap-1 mb-5'>
                        <div className='bg-[#ff5a5f] w-8 h-10 rounded-md'></div>
                        <div className='flex flex-col'>
                            <h2 className='text-lg font-bold uppercase'>GourmetDash</h2>
                            <p className='text-sm text-gray-500 font-medium uppercase'>Admin Panel</p>
                        </div>
                    </div>

                    <div>
                        <p className='text-gray-600 text-xs mb-2'>Management</p>
                    </div>

                    <ul className='flex flex-col gap-1 w-full'>
                        <NavLink to='/' className='hover:bg-[#ff5a5f] hover:text-white rounded-md px-2 py-1.25 transition-all duration-300'>Add Product</NavLink>
                        <NavLink to='/products' className='hover:bg-[#ff5a5f] hover:text-white rounded-md px-2 py-1.25 transition-all duration-300'>All Product</NavLink>
                        <NavLink to='/orders' className='hover:bg-[#ff5a5f] hover:text-white rounded-md px-2 py-1.25 transition-all duration-300'>All Orders</NavLink>
                    </ul>

                </nav>

                {/* logout button */}
                <div className='w-full absolute bottom-0 left-0 flex justify-between items-center p-2 bg-gray-300'>

                    <div className='flex items-center gap-2'>
                        <p className='text-sm text-gray-500'>Super Admin</p>
                    </div>

                    <div>
                        <FaSignOutAlt onClick={handleLogout} className='text-red-500 hover:text-red-600 transition-all duration-200 cursor-pointer' />
                    </div>

                </div>

            </div>


            {/* Mobile Hamburger */}
            <div className='sm:hidden fixed top-3 left-1 text-xl py-3 px-3 hover:text-[#ff5a5f] transition-all duration-200'>
                <FaBars onClick={() => setVisible(true)} />
            </div>

            {/* Overlay */}
            {visible && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 sm:hidden"
                    onClick={() => setVisible(false)}
                ></div>
            )}

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 left-0 h-screen w-64 bg-white p-2 px-5 z-50 transform transition-transform duration-300 sm:hidden
        ${visible ? "translate-x-0" : "-translate-x-full"}`}>

                {/* Sidebar menu */}
                <nav className='flex flex-col justify-start items-start'>

                    <div className='flex justify-start items-center gap-1 mb-10'>
                        <div className='bg-[#ff5a5f] w-8 h-10 rounded-md'></div>
                        <div className='flex flex-col'>
                            <h2 className='text-xl font-bold uppercase'>GourmetDash</h2>
                            <p className='text-sm text-gray-500 font-medium uppercase'>Admin Panel</p>
                        </div>
                    </div>

                    <div>
                        <p className='text-gray-600 text-xs mb-2'>Management</p>
                    </div>

                    <ul className='flex flex-col gap-1 w-full'>
                        <NavLink to='/' onClick={()=>setVisible(false)} className='hover:bg-[#ff5a5f] hover:text-white rounded-md px-2 py-1.25 transition-all duration-300'>Add Product</NavLink>
                        <NavLink to='/products' onClick={()=>setVisible(false)} className='hover:bg-[#ff5a5f] hover:text-white rounded-md px-2 py-1.25 transition-all duration-300'>All Product</NavLink>
                        <NavLink to='/orders' onClick={()=>setVisible(false)} className='hover:bg-[#ff5a5f] hover:text-white rounded-md px-2 py-1.25 transition-all duration-300'>All Orders</NavLink>
                    </ul>

                    {/* logout button */}
                    <div className='w-full absolute bottom-0 left-0 flex justify-between items-center px-2 py-2 sm:py-4 bg-gray-300'>

                        <div className='flex items-center gap-2'>
                            <div className='w-10 h-10 rounded-full bg-[#ff5a5f] flex justify-center items-center text-white'>A</div>
                            <div className='flex flex-col'>
                                <p className='text-sm text-gray-500'>Super Admin</p>
                            </div>
                        </div>

                        <div>
                            <FaSignOutAlt onClick={handleLogout} className='text-red-500 cursor-pointer' />
                        </div>

                    </div>

                </nav>

            </div>

        </aside>
    )
}

export default SideBar
