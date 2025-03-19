import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import Loader from '../compnents/Loader';

export default function ResetPass() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Convert to seconds

            if (decoded.exp < currentTime) {
                setIsValid(false);
            }
        } catch (error) {
            setIsValid(false);
        }
    }, [token]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_BackendURL}/api/auth/reset-password/${token}`, { newPassword });

            if (res.data.success) {
                setMessage(res.data.message);
                navigate("/login");
            };
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    
    if (!isValid) {
        return (
            <div className="relative overflow-hidden flex justify-center items-center h-screen w-screen bg-white rounded-4xl">
            <div className='center-blob-1'></div>
            <div className='center-blob-2'></div>
            <div className="flex justify-center items-center h-screen flex-col gap-4">
                <p className="text-red-500 font-semibold">Token expired or invalid! Please request a new password reset.</p>
                <Link to="/forgot-password"><p className='text-blue-500 font-bold hover:underline'>Request a new password reset</p></Link>
            </div>
            </div>
        );
    }


    return (
        <>
            {loading && <Loader />}
            <div className="relative overflow-hidden flex justify-center items-center h-screen w-screen bg-white rounded-4xl">
                <div className='center-blob-1'></div>
                <div className='center-blob-2'></div>
                <div className='flex items-center justify-center flex-col w-full  px-6'>
                    <h1 className="text-4xl font-bold text-center">Welcome Change Password! 👋🏻</h1>
                    <div className="form flex flex-col items-center pt-5 w-full max-w-md">


                        <form onSubmit={handleResetPassword} className="w-80 p-4 flex flex-col gap-4 rounded justify-center">
                            <input
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="border-2 border-blue-700 rounded-3xl py-1 px-4 placeholder:text-blue-700 focus:outline-none text-lg placeholder:font-normal w-full"
                            />
                            <input
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="border-2 border-blue-700 rounded-3xl py-1 px-4 placeholder:text-blue-700 focus:outline-none text-lg placeholder:font-normal w-full"
                            />
                            <button type="submit" disabled={loading} className="w-full py-3 bg-blue-500 text-white rounded-3xl hover:bg-blue-600 cursor-pointer font-semibold text-lg">
                                {loading ? "Resetting..." : "Reset Password"}
                            </button>
                        </form>
                    </div>
                    {error && <p className="mt-4 text-red-500">{error}</p>}
                    {message && <p className="mt-4 text-green-500">{message}</p>}
                </div>
            </div>
        </>
    )
}
