import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";
import { IoClose } from "react-icons/io5";


export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    const [emailOtp, setEmailOtp] = useState('');
    const [phoneOtp, setPhoneOtp] = useState('');
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);

    // Handles input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSignUp = async (e) => {
        if (!e.target.name.value || !e.target.email.value || !e.target.phone.value || !e.target.password.value) {
            toast.error("Please fill all the fields", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
            return;
        }
        if (!isPhoneVerified && !isEmailVerified) {
            toast.error("Please verify your email & phone!", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
            return;
        }
        e.preventDefault();
        setLoading(true);

        const userData = {
            username: e.target.name.value,
            email: e.target.email.value,
            phoneNumber: e.target.phone.value,
            password: e.target.password.value,
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BackendURL}/api/auth/signup`, userData);

            if (response.data.success) {
                toast.success("Sign-up successful! 🎉 Please verify your email & phone.", { position: "top-right" });
            }

            navigate("/login");



        } catch (error) {
            console.error("Signup error:", error);
            toast.error(error.response?.data?.message || "Sign-up failed! ❌", { position: "bottom-right" });
        } finally {
            setLoading(false);
        }
    };

    const openEmailOtpModal = async () => {

        const email = formData.email;

        if (!email) {

            toast.error("Please enter your email to proceed!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
            return;
        }
        setIsEmailModalOpen(true);
        try {
            await axios.post(`${import.meta.env.VITE_BackendURL}/api/otp/send-email-otp`, { email: email });
            toast.info("OTP sent to email!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        } catch (error) {
            toast.error("Failed to send email OTP ❌", { position: "top-right" });
        }
    };

    const openPhoneOtpModal = async () => {
        const phone = formData.phone;

        console.log(phone);

        if (!phone) {
            toast.error("Please enter your phone number!", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
            return;
        }
        setIsPhoneModalOpen(true);
        try {
            await axios.post(`${import.meta.env.VITE_BackendURL}/api/otp/send-phone-otp`, { phoneNumber: phone });
            toast.info("OTP sent to phone!", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        } catch (error) {
            toast.error("Failed to send phone OTP ❌", { position: "bottom-right" });
        }
    };

    const handleEmailOtpVerification = async () => {
        const email = formData.email;
        try {
            const response = await axios.post(`${import.meta.env.VITE_BackendURL}/api/otp/verify-email-otp`, {
                email: email,
                otp: emailOtp,
            });

            if (response.data.success) {
                toast.success("Email verified ✅", { position: "bottom-right" });
                setIsEmailVerified(true);
                setIsEmailModalOpen(false);
            } else {
                toast.error("Invalid Email OTP ❌", { position: "bottom-right" });
            }
        } catch (error) {
            toast.error("Email OTP verification failed ❌", { position: "bottom-right" });
        }
    };


    const handlePhoneOtpVerification = async () => {
        const phone = formData.phone;
        console.log("phoneOtp", phoneOtp);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BackendURL}/api/otp/verify-phone-otp`, {
                phoneNumber: phone,
                otp: phoneOtp,
            });

            if (response.data.success) {
                toast.success("Phone verified ✅", { position: "bottom-right" });
                setIsPhoneVerified(true);
                setIsPhoneModalOpen(false);
            } else {
                toast.error("Invalid Phone OTP ❌", { position: "bottom-right" });
            }
        } catch (error) {
            toast.error("Phone OTP verification failed ❌", { position: "bottom-right" });
        }
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen bg-white">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-bold">Get Started with Loomify! 🫱🏻‍🫲🏻</h1>

                    <form onSubmit={handleSignUp} className="flex flex-col gap-4 mt-5 w-96">

                        <input type="text" name="name"
                            placeholder="Enter your name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="border-2 border-blue-700 rounded-3xl py-3 px-4 placeholder:text-blue-700 placeholder:font-semibold focus:outline-none text-lg w-full pr-12" />

                        <div className="flex">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                disabled={isEmailVerified}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                className="border-2 border-blue-700 rounded-tl-3xl rounded-bl-3xl py-3 px-4 placeholder:text-blue-700 placeholder:font-semibold focus:outline-none text-lg w-full pr-12" />
                            <button onClick={openEmailOtpModal} className={`text-xs cursor-pointer px-4 py-2 text-white rounded-tr-3xl rounded-br-3xl ${isEmailVerified ? "bg-green-500" : "bg-blue-500"}`} disabled={isEmailVerified}>
                                {isEmailVerified ? "Email Verified ✅" : "Verify Email"}
                            </button>
                        </div>

                        <div className="flex">
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone || "+91"}  // Set default country code
                                disabled={isPhoneVerified}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                                required
                                className="border-2 border-blue-700 rounded-tl-3xl rounded-bl-3xl py-3 px-4 placeholder:text-blue-700 placeholder:font-semibold focus:outline-none text-lg w-full pr-12"
                                maxLength={13} // Adjust length based on country code
                                pattern="^\+\d{1,3}\d{9,10}$" // Ensures country code + valid number
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9+]/g, ""); // Allow only numbers & "+"
                                }}
                            />

                            <button onClick={openPhoneOtpModal} className={`text-xs cursor-pointer px-4 py-2 text-white rounded-tr-3xl rounded-br-3xl ${isPhoneVerified ? "bg-green-500" : "bg-blue-500"}`} disabled={isPhoneVerified}>
                                {isPhoneVerified ? "Phone Verified ✅" : "Verify Phone"}
                            </button>
                        </div>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="border-2 border-blue-700 rounded-3xl py-3 px-4 placeholder:text-blue-700 placeholder:font-semibold focus:outline-none text-lg w-full pr-12" />
                            <span
                                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-blue-700"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? (
                                    <AiOutlineEyeInvisible size={24} />
                                ) : (
                                    <AiOutlineEye size={24} />
                                )}
                            </span>
                        </div>

                        <button type="submit" className="w-full px-8 py-3 bg-blue-500 text-white rounded-3xl hover:bg-blue-600 cursor-pointer font-semibold text-lg" disabled={loading}>
                            {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </form>
                    <Link to="/login" className="mt-4">
                        <span>
                            Already have an account?
                            <span className="text-blue-500">Sign In</span>
                        </span>
                    </Link>
                </div>
            </div>

            {/* Email OTP Modal */}
            {isEmailModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-[#00000062] bg-opacity-50" >
                    <div className=" absolute bg-white p-6 rounded-lg shadow-lg w-96 flex items-center flex-col gap-5">
                        <div className="absolute top-2 right-2 ">
                            <button
                                onClick={() => setIsEmailModalOpen(false)}
                                className="px-4 py-2 transition duration-200"
                            >
                                <IoClose className="text-3xl text-red-500 cursor-pointer " />
                            </button>
                        </div>
                        <h2 className="text-xl font-semibold">Verify Email OTP</h2>
                        <OtpInput
                            value={emailOtp}
                            onChange={setEmailOtp}
                            numInputs={6}
                            containerStyle="flex gap-2 justify-center" // Custom container styling
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    className="!w-12 !h-12 !border !border-gray-300 !rounded-md !text-center !text-lg !font-medium !focus:border-blue-500 !focus:ring-2 !focus:ring-blue-300 !outline-none !transition-all !duration-200"
                                />
                            )}
                        />

                        <button onClick={handleEmailOtpVerification} className="cursor-pointer mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Verify Email OTP</button>
                    </div>
                </div>
            )}

            {/* Phone OTP Modal */}
            {isPhoneModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-[#00000062] bg-opacity-50" >

                    <div className=" absolute bg-white p-6 rounded-lg shadow-lg w-96 flex items-center flex-col gap-5">
                        <div className="absolute top-2 right-2 ">
                            <button
                                onClick={() => setIsPhoneModalOpen(false)}
                                className="px-4 py-2 transition duration-200"
                            >
                                <IoClose className="text-3xl text-red-500 cursor-pointer " />
                            </button>
                        </div>
                        <h2 className="text-xl font-semibold">Verify Phone OTP</h2>
                        <OtpInput
                            value={phoneOtp}
                            onChange={setPhoneOtp}
                            numInputs={6}
                            containerStyle="flex gap-2 justify-center "
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    className="!w-12 !h-12 !border !border-gray-300 !rounded-md !text-center !text-lg !font-medium !focus:border-blue-500 !focus:ring-2 !focus:ring-blue-300 !outline-none !transition-all !duration-200"
                                />
                            )}
                        />

                        <button onClick={handlePhoneOtpVerification} className="cursor-pointer mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Verify Phone OTP</button>
                    </div>
                </div>
            )}
        </>
    );
}
