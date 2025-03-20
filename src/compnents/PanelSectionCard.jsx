import React, { useEffect, useRef, useState } from 'react'
import { FaPlay, FaPlayCircle, FaCopy } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";

import { IoClose } from "react-icons/io5";
import axios from 'axios';
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineDownload } from "react-icons/ai";
import FileUpload from './FileUpload';
import Loader from './Loader';
import DataPanel from './DataPanel';





const data = [
  {
    id: 1,
    name: "Bulk Video Creation",
    url: "https://people.zoho.in/zp#performance/myreview/goals",
  },
  {
    id: 2,
    name: "Report Generation",
    url: "https://people.zoho.in/zp#performance/myreview/goals",
  },
  {
    id: 3,
    name: "Scheduled Maintenance",
    url: "https://people.zoho.in/zp#performance/myreview/goals",
  },
  {
    id: 4,
    name: "Limit Exhausted – Upgrade Suggestion",
    url: "https://people.zoho.in/zp#performance/myreview/goals",
  },
  {
    id: 5,
    name: "Bulk Email Campaign",
    url: "https://people.zoho.in/zp#performance/myreview/goals",
  },
  {
    id: 6,
    name: "User Registration",
    url: "https://people.zoho.in/zp#performance/myreview/goals",
  },
  {
    id: 7,
    name: "System Update",
    url: "https://people.zoho.in/zp#performance/myreview/goals",
  },
  {
    id: 8,
    name: "New Message Received",
    url: "https://people.zoho.in/zp#performance/myreview/goals",
  },
  {
    id: 9,
    name: "Subscription Renewal",
    url: "https://people.zoho.in/zp#performance/myreview/goals",
  }
];


function PanelSectionCard() {
  const [activePanel, setActivePanel] = useState("task");

  const [notifications, setNotifications] = useState(data);

  const [isStart, setIsStart] = useState(false);

  const [fileName, setFileName] = useState("Upload CSV to Start Task");
  const [fileCamRecord, setfileCamRecord] = useState("Upload your pre-recorded video");
  const fileInputRef = useRef(null);
  const fileInputRefRecord = useRef(null);

  const [loading, setLoading] = useState(false);
  const [StopLoading, setStopLoading] = useState(false);
  const [showFileManager, setShowFileManager] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState({ id: "", name: "" });

  const [jobId, setJobId] = useState(null); 



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleFileChangeRecord = (event) => {
    const file = event.target.files[0];
    if (file) {
      setfileCamRecord(file.name);
    }
  };

  const handleRemoveFile = () => {
    setFileName("Upload CSV to Start Task"); // Reset file name
    fileInputRef.current.value = ""; // Reset input field
  };
  const handleRemoveFileRecord = () => {
    setfileCamRecord("Upload your pre-recorded video"); // Reset file name
    fileInputRefRecord.current.value = ""; // Reset input field
  };



  const uploadFile = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BackendURL}/api/excel/upload-cam-video`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${token}`,
          },
        }
      );
      toast.info("Cam-Video uploaded successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: <FaCheckCircle className="text-blue-500 h-16 w-16" />,
        theme: "light",
      });
      console.log(response.data);
      return response.data.path;
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      console.error("Error uploading file:", error);
    }
  };

  const uploadExcelFile = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    const token = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BackendURL}/api/excel/upload-excel`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${token}`,
          },
        }
      );
      toast.info("Excel file uploaded successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: <FaCheckCircle className="text-blue-500 h-16 w-16" />,
        theme: "light",
      });
      console.log(response.data);
      return response.data.path;
    } catch (error) {

      const errorMessage = error.response.data.message;
      console.log(errorMessage);
      // Show error toast
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      console.error("Error uploading file:", error);
      throw error; // Ensure caller handles the error
    }
  };



  const handleStart = async () => {
    if (!fileInputRef.current.files[0] || !fileInputRefRecord.current.files[0]) {
      toast.error("Please upload both the CSV and recorded video before starting the task.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    setShowFileManager(true);

    if (!selectedFolder.id || selectedFolder.id.trim() === "") {
      return;
    }

    setLoading(true);
    setIsStart(true);
    setShowFileManager(false);

    const token = localStorage.getItem("accessToken");

    try {
      // Upload CSV file
      let excelUrl;
      try {
        const response = await uploadExcelFile(fileInputRef.current.files[0]);
        console.log("Excel uploaded:", response);
        excelUrl = response; // Store response in local variable
      } catch (error) {
        return; // Stop execution
      }

      // Upload recorded video file
      let videoUrl;
      try {
        const response = await uploadFile(fileInputRefRecord.current.files[0]);
        console.log("Recorded video uploaded:", response);
        videoUrl = response; // Store response in local variable
      } catch (error) {
        return; // Stop execution
      }

      // Ensure both URLs are set before proceeding
      if (!excelUrl || !videoUrl) {
        toast.error("File upload failed. Please try again.", {
          position: "top-right",
        });
        return;
      }

      // Start processing
      const response = await axios.post(
        `${import.meta.env.VITE_BackendURL}/api/excel/start-processing`,
        {
          folderId: selectedFolder.id,
          excelUrl, // Use local variables
          videoUrl, // Use local variables
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          icon: <FaCheckCircle className="text-blue-500 h-6 w-6" />,
          theme: "light",
        });
        setJobId(response.data.jobId);
      }

      setFileName("Upload CSV to Start Task");
      setfileCamRecord("Upload your pre-recorded video");

      console.log("Processing response:", response.data);
    } catch (error) {
      console.error("Error starting task:", error);
      const errorMessage = error.response?.data?.error || "An unexpected error occurred";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } finally {
      setLoading(false);
      setIsStart(false);
      handleRemoveFileRecord();
      handleRemoveFile();
      setSelectedFolder({ id: "", name: "" });
    }
  };



  const handleStop = async () => {
    if (!jobId) { // Only allow stopping if task is running
      toast.error("Please start the task before stopping it.", {
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
    setStopLoading(true);

    try {
      // Terminate the process
      const response = await axios.post(
        `${import.meta.env.VITE_BackendURL}/api/excel/terminate`,
        {jobId},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      toast.info("Task stopped successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: <FaCheckCircle className="text-blue-500 h-16 w-16" />,
        theme: "light",
      });

      console.log(response.data);
      setFileName("Upload CSV to Start Task");
      setfileCamRecord("Upload your pre-recorded video");
    } catch (error) {
      toast.error("Task stop failed!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      console.error("Error stopping task:", error);
    } finally {
      setStopLoading(false);
      handleRemoveFileRecord();
      handleRemoveFile();
      setIsStart(false); // Reset task state to allow restart
    }
  };




  const handleDownload = () => {
    const fileName = "demo.xlsx"; // Replace with your actual file name
    const fileUrl = `/demo_websites.xlsx`; // Relative path from the public folder

    try {
      // Create an anchor element
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", fileName); // Force download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // ✅ Show success toast notification
      toast.success("✅ File downloaded successfully!", {
        position: "top-right",
        autoClose: 3000, // Closes after 3 seconds
      });
    } catch (error) {
      console.error("❌ File download error:", error);

      // ❌ Show error toast notification
      toast.error("❌ Failed to download file!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };



  return (
    <>
      {/* {loading &&  <Loader/>} */}

      <div className='flex items-center justify-center flex-col'>
        <>
          <div className='flex items-center mb-6 justify-start w-full'>
            <div className="ml-20 switchbutton mb-2 bg-blue-200 flex items-center justify-center gap-1 rounded-3xl ">
              <div
                className={`px-8 py-2 rounded-3xl cursor-pointer transition-all ${activePanel === "task" ? "bg-blue-700 text-white" : "bg-transparent text-gray-700"
                  }`}
                onClick={() => setActivePanel("task")}
              >
                Task Panel
              </div>
              {/* <div
                className={`px-8 py-2 rounded-3xl cursor-pointer transition-all ${activePanel === "data" ? "bg-blue-700 text-white" : "bg-transparent text-gray-700"
                  }`}
                onClick={() => setActivePanel("data")}
              >
                Data Panel
              </div> */}
              <div
                className={`px-8 py-2 rounded-3xl cursor-pointer transition-all ${activePanel === "folder" ? "bg-blue-700 text-white" : "bg-transparent text-gray-700"
                  }`}
                onClick={() => setActivePanel("folder")}
              >
                Folders
              </div>
            </div>
          </div>

          {activePanel === "task" && (
            <>
              <div className="flex flex-col lg:flex-row w-full h-auto  gap-4">

                <div className="flex w-full lg:w-[60%] flex-col rounded-3xl p-5 items-start justify-center gap-4">
                  <div className="flex w-full h-full items-center justify-center">
                    <div className='flex flex-col gap-5 items-center justify-center'>
                      <div className="fisrt flex flex-col sm:flex-row w-full justify-between gap-5">

                        <div className="relative bg-blue-100 aspect-square w-full flex items-center justify-between gap-5 flex-col py-9 rounded-3xl">
                          <h1 className="text-center font-normal text-2xl capitalize">Initiate Bulk video creation</h1>

                          <button
                            onClick={handleStart}
                            className="bg-blue-700 px-10 py-3 text-white rounded-3xl flex items-center gap-2 hover:bg-blue-800 disabled:bg-blue-400 cursor-pointer"
                            disabled={loading}
                          >
                            {loading ? (<>Creating...<ImSpinner2 className="animate-spin text-white text-lg" /></>) : (
                              <div className='uppercase flex items-center gap-1 font-semibold '> <FaPlay /> Start </div>)}</button>
                          {selectedFolder.name && (
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                              <span className='text-xs font-semibold capitalize text-green-600 underline'>{selectedFolder.name}</span>
                              <button onClick={() => { setSelectedFolder({ id: null, name: null }) }} className=" border-2 rounded-full border-blue-400 text-blue-400 cursor-pointer text-sm hover:text-red-800">
                                <IoClose />
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="relative z-10 bg-blue-100 aspect-square w-full flex items-center justify-between gap-5 flex-col py-9 rounded-3xl">
                          <h1 className="text-center font-normal text-2xl capitalize">Abort  current <br />task</h1>

                          <button onClick={handleStop} className="bg-blue-700 px-10 py-3 text-white rounded-3xl flex items-center gap-2 hover:bg-blue-800 cursor-pointer" disabled={StopLoading}
                          >
                            {StopLoading ? (<>Aborting...<ImSpinner2 className="animate-spin text-white text-lg" /></>) : (
                              <div className='uppercase flex items-center gap-1 font-semibold '> <FaPlay /> Stop </div>)}</button>
                        </div>
                      </div>


                      {/* Upload CSV to Start Task */}
                      <div>
                        <div className="bg-blue-100 h-auto sm:h-20 w-full flex flex-col sm:flex-row py-5 px-10 items-center gap-4 rounded-3xl justify-between">
                          <h1 className="text-center font-normal text-xl capitalize">
                            {fileName.length > 24 ? fileName.substring(0, 24) + "..." : fileName}
                          </h1>
                          {fileName !== "Upload CSV to Start Task" && (
                            <button onClick={handleRemoveFile} className=" border-2 rounded-full border-blue-400 text-blue-400 cursor-pointer text-xl hover:text-red-800">
                              <IoClose />
                            </button>
                          )}
                          <input
                            type="file"
                            accept=".xlsx, .xls"
                            className="hidden"
                            ref={fileInputRef}
                            id="fileInput"
                            onChange={handleFileChange}
                          />
                          {fileName === "Upload CSV to Start Task" ? (
                            <label htmlFor="fileInput" className="bg-blue-700 px-12 py-4 text-white rounded-3xl flex items-center gap-1 cursor-pointer hover:bg-blue-800">
                              <FiUpload /> Upload
                            </label>
                          ) : (<label className="text-blue-700 px-12 py-4 font-bold rounded-3xl flex items-center gap-1 " disable>
                            Uploaded
                          </label>)}
                        </div>

                        <span className='text-xs text-green-600 font-semibold flex items-center gap-1 py-1 cursor-pointer' onClick={handleDownload}>Download the sample <AiOutlineDownload /> </span>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full lg:w-[40%]  h-auto gap-4 relative z-50">
                  <div className="flex flex-col gap-5 p-3 h-full rounded-3xl   items-center justify-center">
                    <div className="text-9xl border-gray-800  bg-white border-8 p-3 rounded-full">
                      <FaPlayCircle />
                    </div>
                    <div className='flex items-center gap-3 justify-center'>
                      <h1 className="text-center font-normal text-xl capitalize">
                        {fileCamRecord.length > 24 ? fileCamRecord.substring(0, 24) + "..." : fileCamRecord}
                      </h1>
                      {fileCamRecord !== "Upload your pre-recorded video" && (
                        <button onClick={handleRemoveFileRecord} className=" border-2 rounded-full border-blue-400 text-blue-400 cursor-pointer text-xl hover:text-red-800">
                          <IoClose />
                        </button>
                      )}
                    </div>
                    <input
                      type="file"
                      accept=".mp4"
                      ref={fileInputRefRecord}
                      className="hidden"
                      id="fileInput-reocrded"
                      onChange={handleFileChangeRecord}
                    />
                    {fileCamRecord === "Upload your pre-recorded video" ? (
                      <label htmlFor="fileInput-reocrded" className="bg-blue-700 px-12 py-4 text-white rounded-3xl flex items-center gap-1 cursor-pointer hover:bg-blue-800">
                        <FiUpload /> Upload
                      </label>
                    ) : (<label className="text-blue-700 px-12 py-4 font-bold rounded-3xl flex items-center gap-1 " disable>
                      Uploaded
                    </label>)}
                  </div>
                </div>
              </div>
              {showFileManager && console.log("Rendering FileManager")}
              {showFileManager && (
                <div className="fixed z-50 inset-0 flex items-center justify-center bg-[#0000004b] bg-opacity-50">
                  <div className="relative bg-white p-6 rounded-md shadow-lg ">
                    <div className='absolute top-2 right-2 cursor-pointer text-red-500 ' onClick={() => setShowFileManager(false)} ><IoClose className='text-3xl' /></div>
                    <FileUpload
                      disableOpenFolder={true}
                      onSelectFolder={(folderId, folderName) => {
                        console.log("🗂 Folder selected:", folderId, folderName);
                        setSelectedFolder({ id: folderId, name: folderName });
                        setShowFileManager(false);
                      }}
                    />


                  </div>
                </div>
              )}
            </>
          )}

          {/* {activePanel === "data" && (
            <>
              <DataPanel />
            </>

          )} */}

          {activePanel === "folder" && (
            <>
              <FileUpload />
            </>
          )}

        </>
      </div>
    </>
  )
}

export default PanelSectionCard
