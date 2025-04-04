import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const BulkEmailForm = () => {
    const [searchParams] = useSearchParams();
    const [provider, setProvider] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [path, setPath] = useState("");
    const [previewData, setPreviewData] = useState([]);
    const [error, setError] = useState("");
    const [file, setFile] = useState(null); // Added missing file state

    // ✅ Extract provider type from URL
    useEffect(() => {
        const providerParam = searchParams.get("provider");
        if (providerParam) {
            setProvider(providerParam);
        }
    }, [searchParams]);

    // ✅ Handle file selection
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setError("");

        if (selectedFile) {
            toast.info(`📁 Selected file: ${selectedFile.name}`, {
                position: "top-right",
                autoClose: 2000,
                theme: "colored",
            });           
        }
    };

    // ✅ Upload Excel File
 const uploadExcelFile = async () => {
        if (!file) {
            toast.error("⚠️ Please select a file to upload!");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BackendURL}/api/excel/upload-excel`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            toast.success("✅ Excel file uploaded successfully!");
            setPath(response.data.path);
        } catch (error) {
            toast.error("❌ File upload failed!");
            console.error("Error uploading file:", error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Send Bulk Emails Based on Provider
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!path) {
            setStatus("⚠️ Please upload a file.");
            return;
        }
    
        const token = localStorage.getItem("accessToken");
        if (!token) {
            toast.error("⚠️ User is not authenticated!");
            return;
        }
    
        setStatus("⏳ Sending emails...");
        setLoading(true);
    
        try {
            const outlookEndpoint = `${import.meta.env.VITE_BackendURL}/api/email/send-emails`;
            const googleEndpoint = `${import.meta.env.VITE_BackendURL}/api/email/send`;
            const imapEndpoint = `${import.meta.env.VITE_BackendURL}/api/email/sendMail-IMAP`;
            let endpoint = googleEndpoint; 
    
            if (provider === "outlook") {
                endpoint = outlookEndpoint;
            }
            else if (provider === "imap-smtp") {
                endpoint = imapEndpoint;
            }
    
            const requestData = { filePath: path, provider };
    
            const response = await axios.post(endpoint, requestData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
            });
    
            toast.success(response.data.message);
            setStatus(response.data.message);
        } catch (error) {
            const errorMessage = error.response?.data.error || error.message;
            setStatus("❌ Error sending emails: " + errorMessage);
            toast.error("❌ Failed to send emails!");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="relative  overflow-hidden flex justify-center items-center h-screen w-screen bg-white rounded-4xl">
        <div className='center-blob-1'></div>
        <div className='center-blob-2'></div>
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">📩 Bulk Email Sender</h2>

            <p className="text-center text-gray-600">Email Provider: <b>{provider || "Unknown"}</b></p>

            {/* ✅ File Upload Input */}
            <div className="mb-4">
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".xlsx, .xls"
                    className="block w-full border border-gray-300 p-2 rounded-md cursor-pointer"
                />
            </div>

            {/* ✅ File Preview Section */}
            {previewData.length > 0 && (
                <div className="mb-4 bg-gray-100 p-3 rounded-md">
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">📜 Preview (First 3 emails):</h3>
                    <ul className="text-gray-700">
                        {previewData.map((entry, index) => (
                            <li key={index} className="border-b py-1">
                                {entry.Email} - {entry.Name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* ✅ Upload Button */}
            <button
                onClick={uploadExcelFile}
                disabled={loading}
                className={`w-full py-2 rounded-md text-white font-semibold ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                    }`}
            >
                {loading ? "⏳ Uploading..." : "📤 Upload File"}
            </button>

            {/* ✅ Send Emails Button */}
            <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-2 rounded-md text-white font-semibold mt-4 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
            >
                {loading ? "⏳ Sending..." : `🚀 Send Emails via ${provider.toUpperCase()}`}
            </button>

            {/* ✅ Feedback Messages */}
            {status && <p className="mt-4 text-green-600 text-center font-semibold">{status}</p>}
            {error && <p className="mt-4 text-red-600 text-center font-semibold">{error}</p>}
        </div>
        </div>
    );
};

export default BulkEmailForm;
