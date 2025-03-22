import { useState, useEffect } from "react";
import axios from "axios";
import { FaFolder, FaPlus, FaCloudUploadAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css"; // ✅ Import styles correctly
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const FileManager = ({ onSelectFolder, disableOpenFolder = false }) => {
    const navigate = useNavigate();

    const [folders, setFolders] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [newFolderName, setNewFolderName] = useState("");
    const [showFolderInput, setShowFolderInput] = useState(false);

    const fetchFolders = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BackendURL}/api/folder/all-folders`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            setFolders(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error fetching folders", error);
            setFolders([]);
        }
        finally {
            setIsLoading(false);
        }
    };

    // Fetch folders
    useEffect(() => {
        fetchFolders();
    }, []);

    // Create a new folder
    const createFolder = async () => {
        if (!newFolderName) {
            toast.error("Please enter a folder name", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        const token = localStorage.getItem("accessToken");

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BackendURL}/api/folder/create`,
                { name: newFolderName },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${token}`, // Ensure proper token format if needed
                    },
                }
            );

            // ✅ Use response.data.success instead of response.success
            if (!response.data.success) {
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                return; // Stop further execution if folder already exists
            }

            // ✅ Update state with the newly created folder
            setFolders([...folders, response.data.folder]);

            // ✅ Fetch the updated list of folders
            fetchFolders();

            // ✅ Reset input fields
            setNewFolderName("");
            setShowFolderInput(false);

            // ✅ Show success message
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

        } catch (error) {
            console.error("Error creating folder", error);
            toast.error("An error occurred while creating the folder", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const handleDeleteFolder = async (folderId) => {
        if (disableOpenFolder) return; // Prevent opening if disabled

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(
                        `${import.meta.env.VITE_BackendURL}/api/folder/delete/${folderId}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `${localStorage.getItem("accessToken")}`,
                            },
                        }
                    );

                    if (response.data.success) {
                        Swal.fire({
                            title: "Deleted!",
                            text: response.data.message, // Show backend success message
                            icon: "success",
                        });

                        fetchFolders(); // ✅ Fetch updated folders after deletion
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: response.data.message,
                            icon: "error",
                        });
                    }
                } catch (error) {
                    const errorMessage = error.response?.data?.error || "An error occurred while deleting the folder";
                    console.error("Error deleting folder", errorMessage);

                    Swal.fire({
                        title: "Error!",
                        text: errorMessage,
                        icon: "error",
                    });
                }
            }
        });
    };



    const handleOpenData = async (folderId) => {
        if (disableOpenFolder) return; // Prevent opening if disabled

        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to open this folder?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, open it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(`/folder-data/${folderId}`);
            }
        });
    };


    return (
        <>
        {isLoading && <Loader/>}
        <div className="w-full mx-auto px-16 bg-white  rounded-lg flex items-start justify-start flex-col">
            <h2 className="text-2xl font-semibold text-center mb-4">File Manager</h2>

            <div className="h-[60vh] overflow-y-auto w-full relative z-50">
            {/* Folder Grid */}
            <div className={`grid grid-cols-4 xl:grid-cols-6  gap-4 p-4  rounded-lg ${folders.length === 0 ? "flex justify-center" : ""}`}>
                {folders.map((folder) => (
                    <div
                        key={folder._id}
                        className={`relative group  p-4 border rounded-lg flex flex-col items-center cursor-pointer transition  ${selectedFolder === folder._id ? "bg-blue-100 border-blue-500" : ""
                            }`}
                        onClick={() => {
                            setSelectedFolder(folder._id);
                            handleOpenData(folder._id);
                        }}

                        onDoubleClick={() => {
                            onSelectFolder(folder._id, folder.name);
                        }}
                    >
                        <FaFolder className="text-blue-500 text-4xl" />
                        <p className="mt-2 text-sm font-medium capitalize">{folder.name.length > 10 ? folder.name.slice(0, 10) + "..." : folder.name}</p>
                        {!disableOpenFolder && (
                            <div className="hidden group-hover:flex absolute top-1 right-1 rounded-full bg-white p-1 shadow-md" onClick={(event) => {
                                event.stopPropagation(); // Prevents parent div click event
                                handleDeleteFolder(folder._id);
                            }}><MdDeleteForever className="
                    text-red-500 cursor-pointer text-xl" /></div>
                        )}


                    </div>
                ))}

                {/* Add Folder Button (Appears Next to Last Folder) */}
                <button
                    onClick={() => setShowFolderInput(!showFolderInput)}
                    className="p-4 border rounded-lg flex flex-col items-center justify-center text-gray-600 bg-white cursor-pointer transition hover:bg-gray-200"
                >
                    <FaPlus className="text-3xl" />
                    <p className="mt-2 text-sm font-medium">Add Folder</p>
                </button>
            </div>

            {/* New Folder Input (Popup) */}
            {showFolderInput && (
                <div className="fixed inset-0 flex items-center justify-center bg-[#00000045] bg-opacity-30">
                    <div className="relative bg-white p-4 rounded-md shadow-lg w-96 h-72 items-center justify-center flex flex-col  gap-6 px-20">
                        <div className="flex justify-between gap-5" onClick={() => setShowFolderInput(false)}>
                            <h1 className="text-blue-950 font-semibold text-2xl">Create New Folder</h1>
                            <FaPlus className="absolute top-3 right-4 text-3xl text-red-500 rotate-45 cursor-pointer" />
                        </div>
                        <input
                            type="text"
                            placeholder="New Folder Name"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            onClick={createFolder}
                            className="cursor-pointer w-full mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Create Folder
                        </button>
                    </div>
                </div>
            )}
               </div>

        </div>
        </>
    );
};

export default FileManager;
