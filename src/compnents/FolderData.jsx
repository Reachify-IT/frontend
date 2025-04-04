import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import { MdOutlineFileDownload } from "react-icons/md";
import { saveAs } from "file-saver";
import Loader from "./Loader";
import { IoMdArrowBack } from "react-icons/io";

export default function FolderData() {
  const { id } = useParams();
  const [folderData, setFolderData] = useState(null);
  const [foldername, setFolderName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  const fetchFolderData = async () => {
    const token = localStorage.getItem("accessToken");
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BackendURL}/api/folder/get-folder-data/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      console.log("Folder Data:", response.data);
      setFolderData(response.data.data);
      setFolderName(response.data.folder || "Unknown Folder");
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Error fetching folder data";
      setMessage(errorMessage);
      console.error("Error fetching folder data:", error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFolderData();
  }, []);

  // Function to download data as XLSX file
  const downloadExcel = () => {
    if (!folderData?.videos?.length) {
      alert("No data available to download.");
      return;
    }

    const data = folderData.videos.map((video, index) => ({
      "S.No": index + 1,
      "Name": video.name,
      "Email": video.email,
      "Client Company": video.clientCompany,
      "Client Designation": video.clientDesignation,
      "Website URL": video.websiteUrl,
      "Merged Video URL": video.mergedUrl,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Folder Data");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(file, `Folder_Data_${id}.xlsx`);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="relative overflow-hidden flex justify-center items-center h-screen w-screen bg-white rounded-4xl">
        <div className="center-blob-1"></div>
        <div className="center-blob-2"></div>
        <div className="p-4">



          {folderData?.videos?.length > 0 ? (
            <div className="relative z-10">
              <Link to="/home">
                <div className="cursor-pointer">
                  <button className="cursor-pointer font-semibold text-red-500 flex items-center gap-1"><IoMdArrowBack />Go Back</button>
                </div>
              </Link>
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-4 capitalize"> Currently viewing folder: <strong className="text-blue-950">{foldername}</strong></p>
                </div>

                {/* Download Button */}
                <button

                  className="text-xs mb-4 text-black px-4 py-2 rounde flex items-center gap-2 "
                >
                  Download as Excel<MdOutlineFileDownload className="text-3xl  cursor-pointer text-green-600" onClick={downloadExcel} />
                </button>
              </div>
              <div className="h-96 overflow-y-scroll">
                <table className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-blue-200">
                      <th className="border border-gray-300 px-4 py-2 first:rounded-tl-lg last:rounded-tr-lg">Name</th>
                      <th className="border border-gray-300 px-4 py-2">Email</th>
                      <th className="border border-gray-300 px-4 py-2">Client Company</th>
                      <th className="border border-gray-300 px-4 py-2">Client Designation</th>
                      <th className="border border-gray-300 px-4 py-2">Website URL</th>
                      <th className="border border-gray-300 px-4 py-2 last:rounded-tr-lg">Merged Video</th>
                    </tr>
                  </thead>
                  <tbody>
                    {folderData?.videos.map((video, index) => (
                      <tr key={video._id} className="hover:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2">{video?.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{video?.email}</td>
                        <td className="border border-gray-300 px-4 py-2">{video?.clientCompany}</td>
                        <td className="border border-gray-300 px-4 py-2">{video?.clientDesignation}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <a href={video?.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                            {video?.websiteUrl}
                          </a>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <a href={video?.mergedUrl} target="_blank" rel="noopener noreferrer" className="text-green-500 underline">
                            View Merged Video
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <p>No videos found in this folder.</p>
              <Link to="/home"><h1 className="text-xl font-semibold underline text-red-500">Go to Home</h1></Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
