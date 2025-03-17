import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import google from "../assets/google.webp";
import outlook from "../assets/outlook.webp";
import { toast } from "react-toastify";
import { FaPen } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const GoogleAuth = () => {
    const [message, setMessage] = useState("");
    const [data, setData] = useState([]);
    const [step, setStep] = useState(1);
    const [googledata, setGoogleData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imapdata, setImapData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        my_company: "",
        my_designation: "",
        my_name: "",
        my_mail: "",
        my_work: "",
        my_cta_link: "",
    });


    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
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

        try {
            const token = localStorage.getItem("accessToken");

            axios.post(
                `${import.meta.env.VITE_BackendURL}/api/oauth/mailMyInfo`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${token}`,
                    },
                }
            );

            toast.info("Processing started successfully!", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setStep(2);
        } catch (error) {
            console.error("Error terminating processing:", error);
            toast.error("Error terminating processing: " + error.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const handleUpdateInfo = () => {
        if (!formData.my_mail || !formData.my_work || !formData.my_cta_link || !formData.my_name || !formData.my_designation || !formData.my_company) {
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
        setLoading(true);
        try {
            const token = localStorage.getItem("accessToken");

            axios.post(
                `${import.meta.env.VITE_BackendURL}/api/oauth/updateMailInfo`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${token}`,
                    },
                }
            );

            toast.info("Mail info updated successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
             setIsModalOpen(false);
        } catch (error) {
            console.error("Update Error:", error);
            toast.error("Update Error: " + error.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        finally {
            setLoading(false);
        }  
    }




    const loginWithMicrosoft = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            const response = await axios.get(`${import.meta.env.VITE_BackendURL}/api/oauth/microsoft/redirect`, {
                headers: { Authorization: `${token}` }
            });

            window.location.href = response.data.authUrl;
        } catch (error) {
            console.error("Microsoft OAuth Error:", error);
        }
    };

    const googleLogin = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                alert("⚠️ User is not logged in! Please log in first.");
                return;
            }

            const response = await axios.get(`${import.meta.env.VITE_BackendURL}/api/oauth/google`, {
                headers: { Authorization: token },
            });

            window.location.href = response.data.authUrl;
        } catch (error) {
            console.error("❌ Google OAuth Error:", error.response?.data || error.message);
            alert("❌ Failed to initiate Google login. Please try again.");
        }
    };



    useEffect(() => {
        const fetchAllMailInfo = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token) {
                    alert("⚠️ User is not logged in! Please log in first.");
                    return;
                }

                const [mailRes, googleRes, imapRes, myInfoRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_BackendURL}/api/email/mailInfo`, { headers: { Authorization: token } }),
                    axios.get(`${import.meta.env.VITE_BackendURL}/api/email/googleMailInfo`, { headers: { Authorization: token } }),
                    axios.get(`${import.meta.env.VITE_BackendURL}/api/email/getEmailInfoIMAP`, { headers: { Authorization: token } }),
                    axios.get(`${import.meta.env.VITE_BackendURL}/api/oauth/getMyMailInfo`, { headers: { Authorization: token } })
                ]);

                setData(mailRes.data);
                setGoogleData(googleRes.data);
                setImapData(imapRes.data);

                setFormData({
                    my_company: myInfoRes.data.data.my_company,
                    my_designation: myInfoRes.data.data.my_designation,
                    my_name: myInfoRes.data.data.my_name,
                    my_mail: myInfoRes.data.data.my_mail,
                    my_work: myInfoRes.data.data.my_work,
                    my_cta_link: myInfoRes.data.data.my_cta_link,
                });
            } catch (error) {
                console.error("❌ Error fetching mail info:", error.response?.data || error.message);
            }
        };

        fetchAllMailInfo();
    }, []);



    console.log("formData", formData);




    return (
        <div className="flex items-center justify-center  pt-10">
            {data.email != null || googledata.email != null || imapdata.email != null ? (
                <div className="relative max-w-md flex h-80 items-center justify-center flex-col  bg-blue-100 rounded-2xl">
                    <div className="cursor-pointer absolute top-2 right-2 bg-green-500 rounded-full p-3" title="Edit" onClick={() => setIsModalOpen(true)}>
                        <FaPen className="text-white" />
                    </div>
                    <div className="p-4 flex flex-col text-center items-center justify-center">
                        <h1 className="text-3xl font-bold text-blue-900">Mail Info</h1>
                        <div className="flex flex-col gap-4 text-center">
                            <p><b>We are using your Email for sending emails:</b> {data.email || googledata.email || imapdata.email}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="max-w-md ">
                    {step === 1 && (
                        <>
                        <h1 className="text-md font-bold text-blue-900">Mail Information</h1>
                        <div className="space-y-2 mt-2">
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
                                <button type="button" onClick={handleCheckInfo} className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md">Next</button>
                            </div>
                        </div>
                        </>

                    )}
                    {step == 2 && (
                        <div className="flex flex-col mt-2 items-center justify-center w-80 bg-blue-100 gap-10 py-16 shadow rounded-2xl px-10">

                            <>
                                {/* OAuth Login Options */}
                                <div className="flex flex-col gap-10">
                                    <label onClick={loginWithMicrosoft} className="flex flex-col-reverse items-center gap-3 cursor-pointer">
                                        <div className="w-28 h-12 bg-neutral-400 flex items-center justify-center rounded-2xl">
                                            <img src={outlook} alt="Outlook" className="w-28 rounded-2xl" />
                                        </div>
                                    </label>

                                    <label onClick={googleLogin} className="flex flex-col-reverse items-center gap-3 cursor-pointer">
                                        <div className="w-28 h-12 bg-neutral-100 flex items-center justify-center rounded-2xl">
                                            <img src={google} alt="Google" className="w-28 rounded-2xl" />
                                        </div>
                                    </label>

                                    <Link to="/imap-config">
                                        <label className="flex flex-col-reverse items-center gap-3 cursor-pointer">
                                            <div className="w-28 h-12 bg-neutral-100 flex items-center justify-center rounded-2xl">
                                                <h1 className="text-blue-900 font-bold">Any Provider</h1>
                                            </div>
                                        </label>
                                    </Link>
                                </div>
                            </>

                            {message && <p className="mt-4 text-lg">{message}</p>}
                        </div>
                    )}

                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-[#00000080] bg-opacity-100" onClick={() => setIsModalOpen(false)}></div>

                    {/* Modal Content */}
                    <div className="relative bg-white rounded-lg shadow-lg p-6 z-50 max-w-md w-full">
                        <div>

                        </div>
                        <div className="flex items-center justify-between pb-4">
                            <h2 className="text-lg py-1 font-bold mb-4 text-blue-900">Edit</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 transition duration-200"
                            >
                                <IoClose className="text-3xl text-red-500" />
                            </button>
                        </div>

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
                            <div className="flex justify-center mt-4">
                                <button type="button" onClick={handleUpdateInfo} disabled={loading} className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md">{loading ? 'Updating...' : 'Update'}</button>
                            </div>
                        </div>

                    </div>
                </div>
            )}


        </div>
    );
};

export default GoogleAuth;
