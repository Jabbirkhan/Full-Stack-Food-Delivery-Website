import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { FiMail, FiShield, FiLock, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { Context } from '../context/context';
import Loader from '../components/loader';
import axiosInstance from '../utils/axiosInstance.js';

const UserForgetPassword = () => {

    const { navigate } = useContext(Context);

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [loader, setLoader] = useState(false);

    const sendResetOtp = async () => {
        try {
            setLoader(true);
            const response = await axiosInstance.post('/api/v1/user/send-reset-password-otp', { email });
            if (response.data.success) {
                toast.success(response.data.message);
                setStep(2);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            setLoader(false);
        }
    }

    const verifyResetOtp = async () => {
        try {
            setLoader(true);
            const response = await axiosInstance.post('/api/v1/user/verify-reset-password-otp', { email, otp });
            if (response.data.success) {
                toast.success(response.data.message);
                setStep(3);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            setLoader(false);
        }
    }

    const resetPassword = async () => {
        try {
            setLoader(true);
            const response = await axiosInstance.post('/api/v1/user/reset-password', { email, otp, newPassword });
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/login');
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

            <div className="relative w-full max-w-lg">

                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#b52330] shadow-lg shadow-[#b52330]/5 ring-1 ring-[#b52330]/10">
                        <FiLock size={30} />
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl">
                        Reset Your Password
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Follow the steps below to securely recover your account.
                    </p>
                </div>

                {/* Main Card */}
                <div className="rounded-2xl border border-[#ccc]/60 bg-white p-6 shadow-xl shadow-[#b52330]/5 sm:p-8">

                    {/* Progress Indicator */}
                    <div className="mb-10 flex items-center">

                        <div className="flex shrink-0 flex-col items-center gap-2">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition-all duration-300 ${
                                step >= 1
                                    ? 'border-green-500 bg-green-500 text-white shadow-md shadow-green-500/20'
                                    : 'border-gray-300 bg-gray-100 text-gray-500'
                            }`}>
                                {step > 1 ? <FiCheckCircle size={19} /> : '01'}
                            </div>
                            <span className={`text-xs font-medium ${step >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
                                Email
                            </span>
                        </div>

                        <div className={`mx-3 mb-6 h-1 flex-1 rounded-full transition-all duration-300 ${
                            step >= 2 ? 'bg-green-400' : 'bg-gray-200'
                        }`}></div>

                        <div className="flex shrink-0 flex-col items-center gap-2">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition-all duration-300 ${
                                step >= 2
                                    ? 'border-green-500 bg-green-500 text-white shadow-md shadow-green-500/20'
                                    : 'border-gray-300 bg-gray-100 text-gray-500'
                            }`}>
                                {step > 2 ? <FiCheckCircle size={19} /> : '02'}
                            </div>
                            <span className={`text-xs font-medium ${step >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
                                Verification
                            </span>
                        </div>

                        <div className={`mx-3 mb-6 h-1 flex-1 rounded-full transition-all duration-300 ${
                            step >= 3 ? 'bg-green-400' : 'bg-gray-200'
                        }`}></div>

                        <div className="flex shrink-0 flex-col items-center gap-2">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition-all duration-300 ${
                                step >= 3
                                    ? 'border-green-500 bg-green-500 text-white shadow-md shadow-green-500/20'
                                    : 'border-gray-300 bg-gray-100 text-gray-500'
                            }`}>
                                03
                            </div>
                            <span className={`text-xs font-medium ${step >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
                                New Password
                            </span>
                        </div>

                    </div>

                    {/* Step 1: Email */}
                    {step === 1 && (
                        <div className="flex flex-col gap-6">

                            <div>
                                <div className="mb-2 flex items-center gap-2">
                                    <FiMail className="text-[#b52330]" size={19} />
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        Enter Your Email
                                    </h2>
                                </div>

                                <p className="text-sm leading-6 text-gray-500">
                                    Enter the email address you used to register. We'll send you a password reset OTP.
                                </p>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value.trim())}
                                    value={email}
                                    className="w-full rounded-xl border border-[#ccc] bg-[#fff8f7] px-4 py-3 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-400 focus:border-[#b52330] focus:ring-4 focus:ring-[#b52330]/10"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <button
                                onClick={() => sendResetOtp()}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#b52330] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#b52330]/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#9a1c26] hover:shadow-xl active:translate-y-0"
                            >
                                Send Email
                                <FiArrowRight size={18} />
                            </button>

                        </div>
                    )}

                    {/* Step 2: OTP */}
                    {step === 2 && (
                        <div className="flex flex-col gap-6">

                            <div>
                                <div className="mb-2 flex items-center gap-2">
                                    <FiShield className="text-[#b52330]" size={19} />
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        Verify Your Email
                                    </h2>
                                </div>

                                <p className="text-sm leading-6 text-gray-500">
                                    Enter the verification OTP sent to your registered email address.
                                </p>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Verification OTP
                                </label>

                                <input
                                    type="text"
                                    onChange={(e) => setOtp(e.target.value.trim())}
                                    value={otp}
                                    className="w-full rounded-xl border border-[#ccc] bg-[#fff8f7] px-4 py-3 text-center text-lg font-semibold tracking-[0.4em] text-gray-800 outline-none transition-all duration-200 placeholder:text-sm placeholder:font-normal placeholder:tracking-normal placeholder:text-gray-400 hover:border-gray-400 focus:border-[#b52330] focus:ring-4 focus:ring-[#b52330]/10"
                                    placeholder="Enter OTP"
                                />
                            </div>

                            <button
                                onClick={() => verifyResetOtp()}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#b52330] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#b52330]/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#9a1c26] hover:shadow-xl active:translate-y-0"
                            >
                                Next
                                <FiArrowRight size={18} />
                            </button>

                        </div>
                    )}

                    {/* Step 3: New Password */}
                    {step === 3 && (
                        <div className="flex flex-col gap-6">

                            <div>
                                <div className="mb-2 flex items-center gap-2">
                                    <FiLock className="text-[#b52330]" size={19} />
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        Create New Password
                                    </h2>
                                </div>

                                <p className="text-sm leading-6 text-gray-500">
                                    Enter your new password below to regain access to your account.
                                </p>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    New Password
                                </label>

                                <input
                                    type="text"
                                    onChange={(e) => setNewPassword(e.target.value.trim())}
                                    value={newPassword}
                                    className="w-full rounded-xl border border-[#ccc] bg-[#fff8f7] px-4 py-3 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-400 focus:border-[#b52330] focus:ring-4 focus:ring-[#b52330]/10"
                                    placeholder="Enter new password"
                                />
                            </div>

                            <button
                                onClick={() => resetPassword()}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#b52330] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#b52330]/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#9a1c26] hover:shadow-xl active:translate-y-0"
                            >
                                Continue
                                <FiArrowRight size={18} />
                            </button>

                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                    <FiShield size={14} />
                    <span>Your account security is our priority.</span>
                </div>

            </div>
        </div>
    )
}

export default UserForgetPassword
