import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import Loader from '../components/loader';
import axiosInstance from '../utils/axiosInstance.js';
import { Context } from "./../context/context";

const Login = () => {

  const { setAuthState, navigate } = useContext(Context);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState('login');

  const [loading, setLoading] = useState(false);

  const onSubmithandler = async (e) => {
    e.preventDefault();
    try {
      if (state === 'login') {
        setLoading(true);
        const response = await axiosInstance.post('/api/v1/admin/login', { email, password });
        if (response.data.success) {
          setAuthState('authenticated');
          toast.success(response.data.message || "Admin login successfully");
          navigate('/');
        }
      } else {
        setLoading(true);
        const response = await axiosInstance.post('/api/v1/admin/register', { name, email, password });
        if (response.data.success) {
          toast.success(response.data.message || "Admin register successfully");
          setState('login');
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred during login")
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loader />

  return (
    <div>

      <div className="min-h-screen bg-radial from-[#fff8f7] to-[#ffdbce] flex flex-col justify-center items-center px-4 py-8">
        {/* Card */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#b52330] mb-5">
            GourmetDash Admin Panel
          </h1>
        </div>
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">

          <div className="w-full flex gap-2 p-2 bg-[#ffdbce] mb-3">
            <button onClick={() => setState('login')} className={`w-full px-2 py-2 cursor-pointer rounded-md text-black ${state === 'login' ? 'bg-[#fff8f7] text-[#b52330]' : ''} transition-all duration-200`}>
              Login
            </button>
            <button onClick={() => setState('register')} className={`w-full px-2 py-2 cursor-pointer rounded-md text-black ${state === 'register' ? 'bg-[#fff8f7] text-[#b52330]' : ''} transition-all duration-200`}>
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={onSubmithandler} className="space-y-5">
            {state === "register" ?
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="M Ali"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div> : ""
            }

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="name@company.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                {state === "login" ? <p onClick={() => navigate('/admin-forget-password')} className="text-xs text-blue-600 hover:underline cursor-pointer">
                  Forgot password?
                </p> : ""}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 text-gray-500 text-sm cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

            </div>

            <button type="submit" className="w-full bg-linear-to-r from-[#61000e] to-[#b52330] cursor-pointer text-white font-medium py-2.5 rounded-lg shadow-md transition">
              {state === "login" ? "Admin Login" : "Create Admin Account"}
            </button>

          </form>

          {state === "login" ?
            <p className="text-center text-sm text-gray-500 mt-6">Don't have an account?<span onClick={() => setState("register")} className="text-blue-600 hover:underline cursor-pointer">Create an account</span></p>
            : <p className="text-center text-sm text-gray-500 mt-6">I have an account?<span onClick={() => setState("login")} className="text-blue-600 hover:underline cursor-pointer">Login</span></p>
          }
        </div>
      </div>

    </div>
  )
}

export default Login
