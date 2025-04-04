import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import google from "../assets/google.webp";

export default function GoogleMail() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        my_company: "",
        my_designation: "",
        my_name: "",
        my_mail: "",
        my_work: "",
        my_cta_link: "",
    });

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Check if all required fields are filled
    const handleCheckInfo = () => {
        const { my_company, my_designation, my_name, my_mail, my_work, my_cta_link } = formData;

        if (!my_company || !my_designation || !my_name || !my_mail || !my_work || !my_cta_link) {
            toast.error("Please fill all fields to proceed!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        setStep(2);
    };


    

    // Google OAuth Login
    const googleLogin = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                toast.error("⚠️ User is not logged in! Please log in first.");
                return;
            }

            const response = await axios.get(`${import.meta.env.VITE_BackendURL}/api/oauth/google`, {
                headers: { Authorization: token },
            });

            window.location.href = response.data.authUrl;
        } catch (error) {
            console.error("❌ Google OAuth Error:", error.response?.data || error.message);
            toast.error("❌ Failed to initiate Google login. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-white">
            <form className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-xl font-semibold text-gray-700 text-center">IMAP Configuration</h2>

                {step === 1 && (
                    <div className="space-y-2">
                        <input
                            type="text"
                            name="my_company"
                            placeholder="Company Name"
                            value={formData.my_company}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="my_designation"
                            placeholder="Designation"
                            value={formData.my_designation}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="my_name"
                            placeholder="Your Name"
                            value={formData.my_name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="email"
                            name="my_mail"
                            placeholder="Email"
                            value={formData.my_mail}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="my_work"
                            placeholder="Your Work"
                            value={formData.my_work}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="url"
                            name="my_cta_link"
                            placeholder="CTA Link"
                            value={formData.my_cta_link}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                type="button"
                                onClick={handleCheckInfo}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </form>

            {step === 2 && (
                <>
                    <label onClick={googleLogin} className="flex flex-col-reverse items-center gap-3 cursor-pointer">
                        <div className="w-28 h-12 bg-neutral-100 flex items-center justify-center rounded-2xl shadow-md">
                            <img src={google} alt="Google" className="w-28 rounded-2xl" />
                        </div>
                    </label>
                </>
            )}

            {message && <p className="mt-4 text-lg text-red-600">{message}</p>}
        </div>
    );
}
