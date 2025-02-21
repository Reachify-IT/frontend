import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userData = {
            username: e.target.name.value,
            email: e.target.email.value,
            phoneNumber: e.target.phone.value,
            password: e.target.password.value,
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BackendURL}/api/auth/signup`,
                userData
            );

            toast.success("Sign-up successful! 🎉", {
                position: "bottom-right",
                autoClose: 3000,
            });

            setTimeout(() => {
                navigate("/login"); // Redirect after successful signup
            }, 2000);
        } catch (error) {
            console.error("Signup error:", error);
            toast.error(error.response?.data?.message || "Sign-up failed! ❌", {
                position: "bottom-right",
                autoClose: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative overflow-hidden flex justify-center items-center h-screen w-screen bg-white rounded-4xl">
            <div className="center-blob-1"></div>
            <div className="center-blob-2"></div>
            <div className="flex items-center justify-center flex-col">
                <h1 className="text-5xl lg:text-6xl font-bold">Get Started with Loomify!🫱🏻‍🫲🏻</h1>
                <div className="form flex flex-col pt-5 w-full max-w-sm">
                    <form onSubmit={handleSignUp} className="flex flex-col gap-1 w-full">
                        <div className="flex flex-col items-start gap-1 text-md">
                            <label htmlFor="name" className="font-semibold w-40">
                                User name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="border-2 border-blue-700 rounded-3xl py-2 px-4 placeholder:text-blue-700 focus:outline-none text-lg placeholder:font-semibold w-full"
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        <div className="flex flex-col items-start gap-1 text-md">
                            <label htmlFor="email" className="font-semibold w-40">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="border-2 border-blue-700 rounded-3xl py-2 px-4 placeholder:text-blue-700 focus:outline-none text-lg placeholder:font-semibold w-full"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="flex flex-col items-start gap-1 text-md">
                            <label htmlFor="phone" className="font-semibold w-40">
                                Phone
                            </label>
                            <input
                                type="tel"
                                max={10}
                                name="phone"
                                id="phone"
                                className="border-2 border-blue-700 rounded-3xl py-2 px-4 placeholder:text-blue-700 focus:outline-none text-lg placeholder:font-semibold w-full"
                                placeholder="Enter your phone No"
                                required
                            />
                        </div>

                        <div className="flex flex-col items-start gap-1 text-md relative">
                            <label htmlFor="password" className="font-semibold w-40">
                                Password
                            </label>
                            <div className="relative w-full">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    className="border-2 border-blue-700 rounded-3xl py-2 px-4 placeholder:text-blue-700 focus:outline-none text-lg placeholder:font-semibold w-full"
                                    placeholder="Enter your password"
                                    required
                                />
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
                        </div>

                        <div className="flex flex-col items-center justify-center mt-7">
                            <button
                                type="submit"
                                className="w-full px-8 py-3 bg-blue-500 text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 cursor-pointer font-semibold"
                                disabled={loading}
                            >
                                {loading ? "Signing Up..." : "Sign Up"}
                            </button>
                        </div>
                    </form>

                    <p className="text-center mt-1 text-lg">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-500 font-semibold">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
