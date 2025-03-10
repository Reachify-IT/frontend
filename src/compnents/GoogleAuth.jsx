import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import google from "../assets/google.webp";
import outlook from "../assets/outlook.webp";

const GoogleAuth = () => {
    const [message, setMessage] = useState("");
    const [data, setData] = useState([]);
    const [googledata, setGoogleData] = useState([]);
    const [imapdata, setImapData] = useState([]);

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

    const handleInfoMail = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                alert("⚠️ User is not logged in! Please log in first.");
                return;
            }

            const response = await axios.get(`${import.meta.env.VITE_BackendURL}/api/email/mailInfo`, {
                headers: { Authorization: token },
            });

            console.log("📧 Mail Info:", response.data);
            setData(response.data);

        } catch (error) {
            console.error("❌ Error Fetching Mail Info:", error.response?.data || error.message);
            alert("❌ Failed to fetch email info. Please try again.");
        }
    };

    const handleInfoGoogleMail = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                alert("⚠️ User is not logged in! Please log in first.");
                return;
            }

            const response = await axios.get(`${import.meta.env.VITE_BackendURL}/api/email/googleMailInfo`, {
                headers: { Authorization: token },
            });

            console.log("📧 Google Mail Info:", response.data);
            setGoogleData(response.data);

        } catch (error) {
            console.error("❌ Error Fetching Google Mail Info:", error.response?.data || error.message);
            alert("❌ Failed to fetch Google mail info. Please try again.");
        }
    };

    const getEmailInfoIMAP = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                alert("⚠️ User is not logged in! Please log in first.");
                return;
            }

            const response = await axios.get(`${import.meta.env.VITE_BackendURL}/api/email/getEmailInfoIMAP`, {
                headers: { Authorization: token },
            });

            console.log("📧 IMAP Mail Info:", response.data);
            setImapData(response.data);

        } catch (error) {
            console.error("❌ Error Fetching IMAP Mail Info:", error.response?.data || error.message);
            alert("❌ Failed to fetch IMAP mail info. Please try again.");
        }
    };

    useEffect(() => {
        handleInfoMail();
        handleInfoGoogleMail();
        getEmailInfoIMAP();
    }, []);


    console.log("data.length", data.email);
    console.log("googledata.length", googledata.email);    
    console.log("imapdata.length", imapdata.email);


    return (
        <div className="flex flex-col mt-2 items-center justify-center w-80 bg-blue-100 gap-10 py-16 shadow rounded-2xl px-10">
            {/* Show Mail Info if any data exists */}
            {data.email != null || googledata.email != null || imapdata.email != null ? (
                <>
                    <h1 className="text-3xl font-bold text-blue-900">Mail Info</h1>
                    <div className="flex flex-col gap-4 text-center">
                        <p><b>We are using your Email for sending emails:</b> {data.email || googledata.email || imapdata.email}</p>
                    </div>
                </>
            ) : (
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
            )}

            {message && <p className="mt-4 text-lg">{message}</p>}
        </div>
    );
};

export default GoogleAuth;
