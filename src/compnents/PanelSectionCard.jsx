import React, { useState } from 'react'
import { FaPlay, FaPlayCircle, FaCopy } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";



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
    navigator.clipboard.writeText(selectedNotification.url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000); // Show "Copied!" for 2 seconds
  };

  return (
    <>
        <div className='flex items-center justify-center flex-col'>
          <>
            <div className="switchbutton mb-2 bg-blue-200 inline-flex items-center justify-center gap-1 rounded-3xl ">
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
            {activePanel === "task" && (
              <>
                <div className="flex flex-col lg:flex-row w-full  gap-4">

                  <div className="flex w-full lg:w-[60%] flex-col rounded-3xl p-5 items-start justify-center gap-4">
                    <h1 className="text-start font-bold text-gray-700 text-2xl mt-2">
                      Bulk Looms sent (Monthly)
                    </h1>
                    <div className="flex w-full h-full items-center justify-center">
                      <div className='flex flex-col gap-5 items-center justify-center'>
                        <div className="fisrt flex flex-col sm:flex-row w-full justify-between gap-5">
                          <div className="bg-blue-100 aspect-square w-full flex items-center justify-between gap-5 flex-col py-14 rounded-3xl">
                            <h1 className="text-center font-normal text-2xl capitalize">initial Bulk video creation</h1>
                            <button className="bg-blue-700 px-12 py-4 text-white rounded-3xl flex items-center gap-2 hover:bg-blue-800"><FaPlay />Start</button>
                          </div>
                          <div className="bg-blue-100 aspect-square w-full flex items-center justify-between gap-5 flex-col py-14 rounded-3xl">
                            <h1 className="text-center font-normal text-2xl capitalize">Abort  current task</h1>
                            <button className="bg-blue-700 px-12 py-4 text-white rounded-3xl flex items-center gap-2 hover:bg-blue-800"><FaPlay />Stop</button>
                          </div>
                        </div>
                        <div className="bg-blue-100 h-auto sm:h-20 w-full flex flex-col sm:flex-row py-5 px-10 items-center gap-4 rounded-3xl justify-between">
                          <h1 className="text-center font-normal text-2xl capitalize">upload CSV to Start Task</h1>
                          <button className="bg-blue-700 px-12 py-4 text-white rounded-3xl flex items-center gap-1 hover:bg-blue-800"><FiUpload />Upload</button>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full lg:w-[40%]  h-auto gap-4 relative z-50">
                    <div className="flex flex-col gap-5 p-3 h-full rounded-3xl   items-center justify-center">
                      <div className="text-9xl border-gray-800  bg-white border-8 p-3 rounded-full">
                        <FaPlayCircle />
                      </div>
                      <h1 className="text-center font-normal text-2xl capitalize">Upload your pre-recorded video</h1>
                      <button className="bg-blue-700 px-12 py-4 text-white rounded-3xl flex items-center gap-1 hover:bg-blue-800"><FiUpload />Upload</button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activePanel === "data" && (
              <>
                <div className="relative w-full flex flex-col gap-4 z-50 py-2 overflow-y-auto h-[80vh] lg:h-[450px] px-4 bg-tranprent rounded-lg no-scrollbar">
                  {data.map((notification) => (
                    <div key={notification.id} className="flex items-center  bg-blue-100 py-3 rounded-3xl px-5 shadow-md">
                      <div>
                      </div>
                      <div className="flex justify-between w-full border-blue-700 px-4 gap-20">
                        <div className='flex flex-col items-start w-full'>
                          <h1 className="text-md font-normal">
                            {notification.name.length > 20 ? notification.name.slice(0, 10) + "..." : notification.name}
                          </h1>
                          <p className="text-gray-700 text-xs border-t border-blue-500">
                            {notification.url.length > 40 ? notification.url.slice(0, 30) + "..." : notification.url}
                          </p>
                        </div>

                        <div className='flex items-center gap-2'>
                          <span className='text-green-500 bg-white p-2 rounded-full hover:bg-green-500 hover:text-white cursor-pointer transition-all duration-400'><FaPen /></span>
                          <span className='text-red-500 bg-white p-2 rounded-full  hover:bg-red-500 hover:text-white cursor-pointer transition-all duration-400'><MdDelete /></span>
                          <span className='text-blue-500 bg-white p-2 rounded-full  hover:bg-blue-500 hover:text-white cursor-pointer transition-all duration-400' onClick={() => openModal(notification)}><FaEye /></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {isModalOpen && selectedNotification && (
                  <div className="fixed inset-0 bg-[#00000029] bg-opacity-50 flex items-center justify-center z-50">
                    
                    <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                      <div className="flex justify-between items-center gap-3 mt-4">
                      <h2 className="text-xl font-bold mb-4">Edit Notification</h2>
                        <button
                          className=" px-2 py-1 border cursor-pointer border-white rounded-md hover:border-red-500 text-red-500 transition-all duration-200"
                          onClick={closeModal}
                        >
                          <RxCross2 className='font-bold text-3xl' />
                        </button>
                      </div>

                      {/* Name Input */}
                      <label className="block text-sm font-medium text-gray-700">Name:</label>
                      <input
                        type="text"
                        readOnly
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={selectedNotification.name}
                        onChange={(e) => handleEdit("name", e.target.value)}
                      />

                      {/* URL Input with Copy Button */}
                      <label className="block text-sm font-medium text-gray-700">URL:</label>
                      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 mb-3 bg-gray-100">
                        <input
                          type="text"
                          className="w-full bg-transparent outline-none text-gray-700"
                          value={selectedNotification.url}
                          readOnly
                        />
                        <button
                          className="ml-2 cursor-pointer text-blue-500 hover:text-blue-700 transition-all duration-200"
                          onClick={copyToClipboard}
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
