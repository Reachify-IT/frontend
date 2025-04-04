import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ImapConfig = () => {
    const nevigate = useNavigate();
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        imapHost: "",
        imapPort: 0,
        smtpHost: "",
        smtpPort: 0,
        replyTo: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleVerify = async () => {
        if (!formData.email || !formData.password || !formData.imapHost || !formData.imapPort) {
            setMessage("All fields are required aa.");
            return;
        }
        setLoading(true);

        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                throw new Error("No access token found");
            }

            const response = await fetch(`${import.meta.env.VITE_BackendURL}/api/imap/imap-verification`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message || "IMAP Configuration Saved Successfully.");
                setStep(2); // Move to the next step only on success
            } else {
                setMessage(data.message || "Failed to configure IMAP. Please check your inputs.");
            }

        } catch (error) {
            console.error("IMAP Configuration Error:", error);
            setMessage("An unexpected error occurred. Please try again.");
        }
        finally {
            setLoading(false);
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
    
        if (
            formData.smtpPort === 0 ||
            formData.imapPort === 0 ||
            !formData.email ||
            !formData.password ||
            !formData.imapHost ||
            !formData.smtpHost ||
            !formData.replyTo
        ) {
            setMessage("All fields are required and port numbers must be valid.");
            return;
        }
    
        const token = localStorage.getItem("accessToken");
        setLoading(true);
    
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BackendURL}/api/imap/imap-config`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `${token}`,
                    },
                }
            );
    
            const data = response.data; // Axios already parses JSON
            console.log("IMAP Configuration Response:", response);
    
            if (data.success) {
                setMessage(data.message || "IMAP Configuration Saved Successfully.");
                nevigate("/home"); // Ensure navigate is correctly defined
            } else {
                setMessage(data.message || "Failed to configure IMAP. Please check your inputs.");
            }
        } catch (error) {
            console.error("IMAP Configuration Error:", error);
            
            if (error.response) {
                setMessage(error.response.data.message || "An error occurred. Please check your inputs.");
            } else if (error.request) {
                setMessage("No response received from the server. Please try again later.");
            } else {
                setMessage("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    
        setFormData({
            email: "",
            password: "",
            imapHost: "",
            imapPort: 0,
            smtpHost: "",
            smtpPort: 0,
            replyTo: "",
        });
    };
    
    


    return (
        <div className="flex justify-center flex-col items-center h-screen w-screen bg-white">
            <form className="bg-white p-6 rounded-lg shadow-md w-96 mx-auto">
                <h2 className="text-xl font-semibold text-gray-700 text-center">IMAP Configuration</h2>

                {step === 1 && (
                    <>
                        <div className="flex flex-col py-2">
                            <label className="text-sm font-medium text-gray-600">Email</label>
                            <input type="email" name="email" value={formData.email} placeholder="Enter your email" onChange={handleChange} required className="px-4 py-2 border rounded-md" />
                        </div>
                        <div className="flex flex-col py-2">
                            <label className="text-sm font-medium text-gray-600">Password</label>
                            <input type="password" name="password" value={formData.password} placeholder="Enter your password" onChange={handleChange} required className="px-4 py-2 border rounded-md" />
                        </div>
                        <div className="flex gap-2 py-2">
                            <div className="flex flex-col w-2/3">
                                <label className="text-sm font-medium text-gray-600">IMAP Host</label>
                                <input type="text" name="imapHost" onChange={handleChange} required placeholder="imap.gmail.com" className="px-4 py-2 border rounded-md bg-gray-100 text-gray-600" />
                            </div>
                            <div className="flex flex-col w-1/3">
                                <label className="text-sm font-medium text-gray-600">IMAP Port</label>
                                <input type="text" name="imapPort" onChange={handleChange} placeholder="993" required className="px-4 py-2 border rounded-md bg-gray-100 text-gray-600" />
                            </div>
                        </div>

                        <div className="flex justify-end mt-4">
                            <button type="button" onClick={handleVerify} className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md">{loading ? "Verifying..." : "Verify"}</button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <div className="flex flex-col gap-3" >

                        <div className="flex gap-4">

                            <div className="flex flex-col w-2/3">
                                <label className="text-sm font-medium text-gray-600">SMTP Host</label>
                                <input type="text" name="smtpHost" placeholder="smtp.gmail.com" required value={formData.smtpHost} onChange={handleChange} className="px-4 py-2 border rounded-md bg-gray-100 text-gray-600" />
                            </div>
                            <div className="flex flex-col w-1/3">
                                <label className="text-sm font-medium text-gray-600">SMTP Port</label>
                                <input type="text" name="smtpPort" onChange={handleChange} required placeholder="587" className="px-4 py-2 border rounded-md bg-gray-100 text-gray-600" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-600">Reply To</label>
                            <input type="email" name="replyTo" placeholder="Enter reply-to email" required onChange={handleChange} className="px-4 py-2 border rounded-md" />
                        </div>
                        <div className="flex justify-between mt-4">
                            <button type="button" onClick={() => setStep(1)} className="px-4 py-2 bg-gray-500 text-white rounded-md cursor-pointer">Back</button>
                            <button type="submit" onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer">{loading ? "Submiting..." : "Submit"}</button>
                        </div>
                    </div>
                )}
            </form>
            {message && <p className="mt-4 text-lg text-red-600">{message}</p>}
        </div>

    );
};

export default ImapConfig;
