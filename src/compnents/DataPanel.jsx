import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPlay, FaPlayCircle, FaCopy } from "react-icons/fa";

import { FaEye } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

export default function DataPanel() {
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [copied, setCopied] = useState(false);





    const fetchAllProcessedVideos = async () => {
        const token = localStorage.getItem("accessToken");
        setLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BackendURL}/api/excel/all-videos`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${token}`,
                    },
                }
            );

            setVideos(response.data); // Store data in state
        } catch (error) {
            console.error("Error fetching processed videos:", error);
            setError(error);
            toast.error("❌ Failed to fetch processed videos!", {
                position: "top-right",
                autoClose: 3000,
            });
        } finally {
            setLoading(false);
        }
    };


    const isFetched = useRef(false); // ✅ Track fetch status

    useEffect(() => {
        if (!isFetched.current) {
            fetchAllProcessedVideos();
            isFetched.current = true; // Prevent re-fetch
        }
    }, []);

    const openModal = (notification) => {
        setSelectedNotification(notification);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const copyToClipboard = () => {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(selectedNotification.mergedUrl)
                .then(() => setCopied(true))
                .catch((err) => console.error("Clipboard copy failed:", err));
        } else {
            // Fallback: Create a temporary input field
            const textArea = document.createElement("textarea");
            textArea.value = selectedNotification.mergedUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setCopied(true);
        }

        setTimeout(() => setCopied(false), 2000);
    };


    return (
        <>
        {loading && <Loader />}
        <div className='w-full px-16'>
            {videos?.videos?.length === 0 && (
                <p className='text-center text-2xl pt-20'>No video found, make your first video. Now</p>
            )}
            <div className="relative w-full flex flex-col gap-4 z-50 py-2 overflow-y-auto h-[75vh] lg:h-[420px] px-4 bg-transparent rounded-lg no-scrollbar scroll-smooth">
                {videos?.videos?.map((videoGroup) =>
                    videoGroup.videos.map((video) => (
                        <div
                            key={video._id}
                            className="flex items-center bg-blue-100 py-3 rounded-3xl px-5 shadow-md"
                        >
                            <div className="flex justify-between w-full border-blue-700 px-4 gap-20">
                                <div className="flex flex-col items-start w-full">
                                    <h1 className="text-md font-mono">
                                        {video.websiteUrl.length > 20
                                            ? video.websiteUrl.slice(0, 20) + "..."
                                            : video.websiteUrl}
                                    </h1>
                                    <p className="text-gray-700 text-xs border-t border-blue-500">
                                        {video.mergedUrl.length > 40
                                            ? video.mergedUrl.slice(0, 40) + "..."
                                            : video.mergedUrl}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    {/* <span className="text-green-500 bg-white p-2 rounded-full hover:bg-green-500 hover:text-white cursor-pointer transition-all duration-400">
                                <FaPen />
                              </span> */}
                                    <span className="text-red-500 bg-white p-2 rounded-full hover:bg-red-500 hover:text-white cursor-pointer transition-all duration-400">
                                        <MdDelete />
                                    </span>
                                    <span
                                        className="text-blue-500 bg-white p-2 rounded-full hover:bg-blue-500 hover:text-white cursor-pointer transition-all duration-400"
                                        onClick={() => openModal(video)}
                                    >
                                        <FaEye />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {isModalOpen && selectedNotification && (
                <div className="fixed inset-0 bg-[#00000029] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                        <div className="flex justify-between items-center gap-3 mt-4">
                            <h2 className="text-xl font-bold mb-4">Video Details</h2>
                            <button
                                className="px-2 py-1 border cursor-pointer border-white rounded-md hover:border-red-500 text-red-500 transition-all duration-200"
                                onClick={closeModal}
                            >
                                <RxCross2 className="font-bold text-3xl" />
                            </button>
                        </div>

                        {/* Website URL Input */}
                        <label className="block text-sm font-medium text-gray-700">Website URL:</label>
                        <input
                            type="text"
                            readOnly
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={selectedNotification.websiteUrl}
                        />

                        {/* Merged Video URL Input with Copy Button */}
                        <label className="block text-sm font-medium text-gray-700">Merged Video URL:</label>
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 mb-3 bg-gray-100">
                            <input
                                type="text"
                                className="w-full bg-transparent outline-none text-gray-700"
                                value={selectedNotification.mergedUrl}
                                readOnly
                            />
                            <button
                                className="ml-2 cursor-pointer text-blue-500 hover:text-blue-700 transition-all duration-200"
                                onClick={() => copyToClipboard(selectedNotification.mergedUrl)}
                            >
                                <FaCopy />
                            </button>
                        </div>

                        {/* Copy Notification */}
                        {copied && <p className="text-green-500 text-sm">Copied!</p>}
                    </div>
                </div>
            )}
        </div>
        </>
    )
}
