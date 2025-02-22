import React, { useEffect, useRef, useState } from 'react'
import { FaPlay, FaPlayCircle, FaCopy } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";





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
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const [fileName, setFileName] = useState("Upload CSV to Start Task");
  const [fileCamRecord, setfileCamRecord] = useState("Upload your pre-recorded video");
  const fileInputRef = useRef(null);
  const fileInputRefRecord = useRef(null);

  const [loading, setLoading] = useState(false);
  const [StopLoading, setStopLoading] = useState(false);




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

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BackendURL}/api/excel/upload-cam-video`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.info("Cam-Video uploaded successful!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: <FaCheckCircle className="text-blue-500 h-16 w-16" />,
        theme: "light",
      });
      console.log(response.data);
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

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BackendURL}/api/excel/upload-excel`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.info("Excel file uploaded successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: <FaCheckCircle className="text-blue-500 h-16 w-16" />,
        theme: "light",
      });
      console.log(response.data);
    } catch (error) {
      // Show error toast
      toast.error("File upload failed!", {
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


  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  const fetchAllProcessedVideos = async () => {
    const token = localStorage.getItem("accessToken");

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProcessedVideos();
  }, []);



  const handleStart = async () => {
    if (!fileInputRef.current.files[0] || !fileInputRefRecord.current.files[0]) {
      toast.error("Please upload both the CSV and recorded video before starting the task.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: <FaCheckCircle className="text-blue-500 h-16 w-16" />,
        theme: "light",
      });
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("accessToken");

    try {
      // Upload files sequentially and wait for completion
      await uploadExcelFile(fileInputRef.current.files[0]);
      await uploadFile(fileInputRefRecord.current.files[0]);

      // Start processing only if uploads succeed
      const response = await axios.post(
        `${import.meta.env.VITE_BackendURL}/api/excel/start-processing`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      toast.info("video's Processing Completed Successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: <FaCheckCircle className="text-blue-500 h-16 w-16" />,
        theme: "light",
      });

      setFileName("Upload CSV to Start Task");
      setfileCamRecord("Upload your pre-recorded video");


      console.log(response.data);
    } catch (error) {

      // Show error toast
      toast.error(error.response.data.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      console.error("Error starting task:", error);
    } finally {
      setLoading(false);
      handleRemoveFileRecord();
      handleRemoveFile();
    }
  };

  const handleStop = async () => {
    const token = localStorage.getItem("accessToken");
    setStopLoading(true);

    try {
      // Start processing only if uploads succeed
      const response = await axios.post(
        `${import.meta.env.VITE_BackendURL}/api/excel/terminate`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      toast.info("Task stop successfully!", {
        position: "bottom-right",
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
      toast.error("Task start failed!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      console.error("Error starting task:", error);
    } finally {
      setStopLoading(false);
      handleRemoveFileRecord();
      handleRemoveFile();
    }
  };





  const openModal = (notification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (field, value) => {
    setSelectedNotification({ ...selectedNotification, [field]: value });
  };

  const handleSave = () => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === selectedNotification.id ? selectedNotification : item
      )
    );
    closeModal();
  };


  const copyToClipboard = () => {
    navigator.clipboard.writeText(selectedNotification.mergedUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000); // Show "Copied!" for 2 seconds
  };

  return (
    <>
      <div className='flex items-center justify-center flex-col'>
        <>
          <div className='flex items-center mb-6 justify-start w-full'>
            <div className="switchbutton mb-2 bg-blue-200 flex items-center justify-center gap-1 rounded-3xl ">
              <div
                className={`px-8 py-2 rounded-3xl cursor-pointer transition-all ${activePanel === "task" ? "bg-blue-700 text-white" : "bg-transparent text-gray-700"
                  }`}
                onClick={() => setActivePanel("task")}
              >
                Task Panel
              </div>
              <div
                className={`px-8 py-2 rounded-3xl cursor-pointer transition-all ${activePanel === "data" ? "bg-blue-700 text-white" : "bg-transparent text-gray-700"
                  }`}
                onClick={() => setActivePanel("data")}
              >
                Data Panel
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

                        <div className="bg-blue-100 aspect-square w-full flex items-center justify-between gap-5 flex-col py-14 rounded-3xl">
                          <h1 className="text-center font-normal text-2xl capitalize">Initiate Bulk video creation</h1>
                          {(fileCamRecord !== "Upload your pre-recorded video" && fileName !== "Upload CSV to Start Task") ? (
                            <button
                              onClick={handleStart}
                              className="bg-blue-700 px-12 py-4 text-white rounded-3xl flex items-center gap-2 hover:bg-blue-800 disabled:bg-blue-400 cursor-pointer"
                              disabled={loading}
                            >
                              {loading ? (<ImSpinner2 className="animate-spin text-white text-lg" />) : (
                                <> <FaPlay /> Start </>)}
                            </button>

                          ) : (<>
                            <button className="bg-blue-100 px-6 py-4 text-wrap text-gray-700 rounded-3xl flex items-center gap-2 " disabled>Upload files, first</button>
                          </>)}
                        </div>

                        <div className="relative z-10 bg-blue-100 aspect-square w-full flex items-center justify-between gap-5 flex-col py-14 rounded-3xl">
                          <h1 className="text-center font-normal text-2xl capitalize">Abort  current task</h1>
                          {(fileCamRecord !== "Upload your pre-recorded video" && fileName !== "Upload CSV to Start Task") ? (
                            <button onClick={handleStop} className="bg-blue-700 px-12 py-4 text-white rounded-3xl flex items-center gap-2 hover:bg-blue-800 cursor-pointer" disabled={StopLoading}
                            >
                              {StopLoading ? (<>Aborting...<ImSpinner2 className="animate-spin text-white text-lg" /></>) : (
                                <> <FaPlay /> Stop </>)}</button>
                          ) : (<>
                            <button className="bg-blue-100 px-6 py-4 text-wrap text-gray-700 rounded-3xl flex items-center gap-2 " disabled>Upload files, first</button>
                          </>)}
                        </div>
                      </div>

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
            </>
          )}

          {activePanel === "data" && (
            <>
            {videos?.videos.length ===0 &&(
                   <p className='text-center text-2xl pt-20'>No video found, make your first video. Now</p>
              )}
              <div className="relative w-full flex flex-col gap-4 z-50 py-2 overflow-y-auto h-[80vh] lg:h-[420px] px-4 bg-transparent rounded-lg no-scrollbar scroll-smooth">
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
            </>

          )}

        </>
      </div>
    </>
  )
}

export default PanelSectionCard
