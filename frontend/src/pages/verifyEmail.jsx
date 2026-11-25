import { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { FiMail, FiShield, FiArrowRight, FiLock } from 'react-icons/fi';
import { Context } from '../context/context';
import axiosInstance from '../utils/axiosInstance.js';
import Loader from '../components/loader.jsx';

const VerifyEmail = () => {

    const { auth, navigate, fetchUserProfile } = useContext(Context);
    const [otp, setOtp] = useState('');

    const [loader, setLoader] = useState(false);

    const onSubmitHandler = async () => {
        try {
            if (auth.status !== 'authenticated') {
                return navigate('/login');
            }

            setLoader(true);
            const response = await axiosInstance.post('/api/v1/user/verify-email-otp', { otp });
            if (response.data.success) {
                toast.success(response.data.message);
                fetchUserProfile();
                navigate('/');
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
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#fff8f7] px-4 py-10">

            {/* Background Decorations */}
            <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#b52330]/5 blur-3xl"></div>
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#b52330]/5 blur-3xl"></div>

            <div className="relative w-full max-w-md">

                {/* Verification Card */}
                <div className="rounded-2xl border border-[#ccc]/60 bg-white p-6 shadow-xl shadow-[#b52330]/5 sm:p-9">

                    {/* Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff8f7] text-[#b52330] ring-1 ring-[#b52330]/10">
                            <FiMail size={30} />
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="mb-8 text-center">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl">
                            Verify Your Email
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-gray-500">
                            Please check your inbox. We've sent you a verification OTP to confirm your email address.
                        </p>
                    </div>

                    {/* OTP Input */}
                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Verification OTP
                        </label>

                        <div className="relative">
                            <FiShield
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b52330]"
                                size={19}
                            />

                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.trim())}
                                className="w-full rounded-xl border border-[#ccc] bg-[#fff8f7] py-3.5 pl-12 pr-4 text-sm font-medium tracking-widest text-gray-800 outline-none transition-all duration-200 placeholder:font-normal placeholder:tracking-normal placeholder:text-gray-400 hover:border-gray-400 focus:border-[#b52330] focus:ring-4 focus:ring-[#b52330]/10"
                                placeholder="Enter verification OTP"
                            />
                        </div>
                    </div>

                    {/* Verify Button */}
                    <button
                        onClick={() => onSubmitHandler()}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#b52330] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#b52330]/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#9a1c26] hover:shadow-xl active:translate-y-0"
                    >
                        Verify Email
                        <FiArrowRight size={18} />
                    </button>

                    {/* Security Note */}
                    <div className="mt-7 flex items-center justify-center gap-2 border-t border-gray-100 pt-5 text-xs text-gray-400">
                        <FiLock size={14} />
                        <span>Your email verification is secure and protected.</span>
                    </div>

                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-xs text-gray-400">
                    Email Verification · Account Security
                </p>

            </div>
        </div>
    )
}

export default VerifyEmail
