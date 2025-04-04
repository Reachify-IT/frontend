import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import Loader from "../compnents/Loader";
import { useNavigate } from "react-router-dom";


function ForgotPassword() {
    const nevigate = useNavigate();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Please enter your email", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                icon: <FaExclamationTriangle className="text-red-500 h-6 w-6" />,
                theme: "light",
            });
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_BackendURL}/api/auth/forgot-password`, { email });

            toast.success("Reset link sent to your email!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                icon: <FaCheckCircle className="text-green-500 h-6 w-6" />,
                theme: "light",
            });

            setMessage(res.data.message); // Optional: for displaying in UI
            nevigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                icon: <FaExclamationTriangle className="text-red-500 h-6 w-6" />,
                theme: "light",
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {loading && <Loader />}
            <div className="relative  overflow-hidden flex justify-center items-center h-screen w-screen bg-white rounded-4xl">
                <div className='center-blob-1'></div>
                <div className='center-blob-2'></div>
                <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md p-8 bg-white/10 backdrop-blur-md  rounded-3xl border border-white/20">
                    <h2 className="text-3xl font-bold text-black text-center mb-4">Forgot Password</h2>
                    <p className="text-gray-800 text-center mb-6">Enter your email to receive a reset link.</p>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                        {/* Email Input */}
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-2xl border-2 border-blue-500 bg-white/20 text-black placeholder-blue-500 focus:outline-none focus:border-blue-500"
                            required
                        />
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="cursor-pointer w-full py-3 rounded-2xl bg-blue-500 text-white font-semibold text-lg hover:bg-blue-600 transition-all duration-200"
                        >
                            Send Reset Link
                        </button>
                    </form>

                    {/* Message Display */}
                    {message && <p className="mt-4 text-green-300 text-sm">{message}</p>}
                </div>
            </div>
        </>

    );
}

export default ForgotPassword;
