import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";
import GoogleAuth from "./GoogleAuth";
import VideoPreference from "./VideoPreference";
import Loader from "./Loader";

const imageMap = {
  "top-left": {
    small: "https://images.ctfassets.net/r6vlh4dr9f5y/452H07Tf4a4Bgbualq68pE/68594803c196627615e7eb769cc33764/4.jpg?fm=webp&fit=fill&f=center&w=2176&h=",
    medium: "https://images.ctfassets.net/r6vlh4dr9f5y/rLGBofYEGcQUTZN22vX1G/36572d816816b4725cda3f6dd9ef7e0d/A_video_conference_happening_in_Dialpads_desktop_app.jpg?fm=webp&fit=fill&f=center&w=2176&h=",
    large: "https://images.ctfassets.net/r6vlh4dr9f5y/3854686/f8fd3faea55e8b930077320254e93a6a/Screenshare-Full-Screen.png?fm=webp&fit=fill&f=center&w=2176&h=",
    "extra-large": "https://images.ctfassets.net/r6vlh4dr9f5y/2374430/1db8afb80c2d57801a89c5a94cdc9c1e/Screenshot_of_changing_the_video_background_in_Dialpad_Meetings.jpg?fm=webp&fit=fill&f=center&w=2176&h=",
  },
  "top-right": {
    small: "https://images.ctfassets.net/r6vlh4dr9f5y/452H07Tf4a4Bgbualq68pE/68594803c196627615e7eb769cc33764/4.jpg?fm=webp&fit=fill&f=center&w=2176&h=",
    medium: "https://images.ctfassets.net/r6vlh4dr9f5y/rLGBofYEGcQUTZN22vX1G/36572d816816b4725cda3f6dd9ef7e0d/A_video_conference_happening_in_Dialpads_desktop_app.jpg?fm=webp&fit=fill&f=center&w=2176&h=",
    large: "https://images.ctfassets.net/r6vlh4dr9f5y/3854686/f8fd3faea55e8b930077320254e93a6a/Screenshare-Full-Screen.png?fm=webp&fit=fill&f=center&w=2176&h=",
    "extra-large": "https://images.ctfassets.net/r6vlh4dr9f5y/2374430/1db8afb80c2d57801a89c5a94cdc9c1e/Screenshot_of_changing_the_video_background_in_Dialpad_Meetings.jpg?fm=webp&fit=fill&f=center&w=2176&h=",
  },
  "bottom-left": {
    small: "https://images.ctfassets.net/r6vlh4dr9f5y/452H07Tf4a4Bgbualq68pE/68594803c196627615e7eb769cc33764/4.jpg?fm=webp&fit=fill&f=center&w=2176&h=",
    medium: "https://images.ctfassets.net/r6vlh4dr9f5y/rLGBofYEGcQUTZN22vX1G/36572d816816b4725cda3f6dd9ef7e0d/A_video_conference_happening_in_Dialpads_desktop_app.jpg?fm=webp&fit=fill&f=center&w=2176&h=",
    large: "https://images.ctfassets.net/r6vlh4dr9f5y/3854686/f8fd3faea55e8b930077320254e93a6a/Screenshare-Full-Screen.png?fm=webp&fit=fill&f=center&w=2176&h=",
    "extra-large": "https://images.ctfassets.net/r6vlh4dr9f5y/2374430/1db8afb80c2d57801a89c5a94cdc9c1e/Screenshot_of_changing_the_video_background_in_Dialpad_Meetings.jpg?fm=webp&fit=fill&f=center&w=2176&h=",
  },
  "bottom-right": {
    small: "https://images.ctfassets.net/r6vlh4dr9f5y/452H07Tf4a4Bgbualq68pE/68594803c196627615e7eb769cc33764/4.jpg?fm=webp&fit=fill&f=center&w=2176&h=",
    medium: "https://images.ctfassets.net/r6vlh4dr9f5y/rLGBofYEGcQUTZN22vX1G/36572d816816b4725cda3f6dd9ef7e0d/A_video_conference_happening_in_Dialpads_desktop_app.jpg?fm=webp&fit=fill&f=center&w=2176&h=",
    large: "https://images.ctfassets.net/r6vlh4dr9f5y/3854686/f8fd3faea55e8b930077320254e93a6a/Screenshare-Full-Screen.png?fm=webp&fit=fill&f=center&w=2176&h=",
    "extra-large": "https://images.ctfassets.net/r6vlh4dr9f5y/2374430/1db8afb80c2d57801a89c5a94cdc9c1e/Screenshot_of_changing_the_video_background_in_Dialpad_Meetings.jpg?fm=webp&fit=fill&f=center&w=2176&h=",
  },
};


export default function Settings() {
  const [activePanel, setActivePanel] = useState("User");
  const [showPassword, setShowPassword] = useState(false);
  const [isloading, setIsloading] = useState(false);

  const [formData, setFormData] = useState({
    position: "",
    size: "",
  });

  const [message, setMessage] = useState(null);

  const imageUrl = imageMap?.[formData.position]?.[formData.size];


  // Fetch Camera Settings
  const getCameraSettings = async () => {
    setIsloading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }

      const response = await axios.get(
        `${import.meta.env.VITE_BackendURL}/api/users/camera-settings`,
        {
          headers: { Authorization: `${token}` },
        }
      );

      setFormData({
        position: response.data.cameraSettings.position || "",
        size: response.data.cameraSettings.size || "",
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching camera settings:", error);
      setMessage({ type: "error", text: "Failed to fetch camera settings" });
      return null;
    }
    finally {
      setIsloading(false);
    }
  };


  useEffect(() => {
    getCameraSettings();
  }, []);


  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }

      const response = await axios.put(
        `${import.meta.env.VITE_BackendURL}/api/users/camera-settings`,
        formData,
        {
          headers: { Authorization: `${token}` },
        }
      );

      setMessage({ type: "success", text: response.data.message });

      // Fetch updated camera settings
      getCameraSettings();
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update settings" });
      console.error("Error updating camera settings:", error);
    }
  };



  const [userformData, setuserFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
  });

  const [usermessage, setuserMessage] = useState(null);

  // Fetch user data when component mounts
  const fetchUserInfo = async () => {
    setIsloading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No access token found");

      const response = await axios.get(`${import.meta.env.VITE_BackendURL}/api/auth/me`, {
        headers: { Authorization: `${token}` },
      });

      console.log(response.data.user);

      setuserFormData({
        username: response.data.user?.username || "",
        email: response.data.user?.email || "",
        phoneNumber: response.data.user?.phoneNumber || "",
      });
    } catch (error) {
      console.error("Error fetching user info:", error);
      setuserMessage({ type: "error", text: "Failed to fetch user info" });
    }
    finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // Handle input change
  const userhandleChange = (e) => {
    setuserFormData({ ...userformData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Update User Info)
  const UserhandleSubmit = async (e) => {

    e.preventDefault();
    setIsloading(true);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No access token found");

      const response = await axios.put(`${import.meta.env.VITE_BackendURL}/api/auth/update`, userformData, {
        headers: { Authorization: `${token}` },
      });

      setuserMessage({ type: "success", text: response.data.message });
      fetchUserInfo(); // Fetch updated data
    } catch (error) {
      console.error("Error updating user info:", error);
      setuserMessage({ type: "error", text: "Failed to update user info" });
    }
    finally {
      setIsloading(false);
    }
  };





  return (
    <>
      {isloading && <Loader />}
      <div className="flex items-center justify-start flex-col">
        <div className="top-bar flex items-center justify-start flex-col">
          <div className="relative z-10 switchbutton bg-blue-200 inline-flex items-center justify-center gap-1 rounded-3xl">
            <div
              className={`px-8 py-3 rounded-3xl cursor-pointer transition-all ${activePanel === "User"
                ? "bg-blue-700 text-white"
                : "bg-transparent text-gray-700"
                }`}
              onClick={() => setActivePanel("User")}
            >
              User Settings
            </div>

            <div
              className={`px-8 py-3 rounded-3xl cursor-pointer transition-all ${activePanel === "videoPreference" ? "bg-blue-700 text-white" : "bg-transparent text-gray-700"}`}
              onClick={() => setActivePanel("videoPreference")}
            >
              Video Preferences
            </div>
            <div
              className={`px-8 py-3 rounded-3xl cursor-pointer transition-all ${activePanel === "Loom"
                ? "bg-blue-700 text-white"
                : "bg-transparent text-gray-700"
                }`}
              onClick={() => setActivePanel("Loom")}
            >
              Loom Integration
            </div>
            <div
              className={`px-8 py-3 rounded-3xl cursor-pointer transition-all ${activePanel === "mail"
                ? "bg-blue-700 text-white"
                : "bg-transparent text-gray-700"
                }`}
              onClick={() => setActivePanel("mail")}
            >
              Mail configuration
            </div>


          </div>



          <div>
            {activePanel === "User" && (
              <>
                <div className="form flex flex-col pt-10 w-full">

                  <form onSubmit={UserhandleSubmit} className="flex flex-col gap-2 ">
                    <div className="flex flex-col items-start gap-1 text-md">
                      <label htmlFor="username" className="font-semibold w-40">User Name</label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        value={userformData.username}
                        onChange={userhandleChange}
                        className="border-2 border-blue-700 rounded-3xl py-1 px-12 placeholder:text-blue-700 focus:outline-none text-lg placeholder:font-semibold w-full"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div className="flex flex-col items-start gap-1 text-md">
                      <label htmlFor="email" className="font-semibold w-40">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={userformData.email}
                        onChange={userhandleChange}
                        className="border-2 border-blue-700 rounded-3xl py-1 px-12 placeholder:text-blue-700 focus:outline-none text-lg placeholder:font-semibold w-full"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="flex flex-col items-start gap-1 text-md">
                      <label htmlFor="phoneNumber" className="font-semibold w-40">Phone</label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={userformData.phoneNumber}
                        onChange={userhandleChange}
                        className="border-2 border-blue-700 rounded-3xl py-1 px-12 placeholder:text-blue-700 focus:outline-none text-lg placeholder:font-semibold w-full"
                        placeholder="Enter your phone No"
                      />
                    </div>

                    <div className="flex flex-col items-center justify-center mt-7">
                      <button type="submit" className="px-20 py-3 bg-blue-500 text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 cursor-pointer font-semibold">
                        Update User
                      </button>
                    </div>
                  </form>
                  {usermessage && (
                    <div className={`text-center font-normal  mt-4 rounded ${usermessage.type === "success" ? "text-green-500" : "text-red-500"}`}>
                      {usermessage.text}
                    </div>
                  )}
                </div>
              </>
            )}
            {activePanel === "Loom" && (
              <>
                <div className="form flex flex-col pt-10 relative z-20">
                  <div className="flex flex-col lg:flex-row items-center gap-10 w-full">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
                      {/* Camera Position */}
                      <div className="flex flex-col items-start gap-2 text-xl">
                        <label htmlFor="position" className="font-semibold w-40">
                          Camera Position
                        </label>
                        <select
                          id="position"
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                          className="border-2 border-blue-700 font-semibold rounded-3xl py-2 px-4 text-blue-700 focus:outline-none text-lg placeholder:font-semibold w-full"
                          required
                        >
                          <option value="" disabled>
                            Select a position
                          </option>
                          <option value="top-left">Top Left</option>
                          <option value="top-right">Top Right</option>
                          <option value="bottom-left">Bottom Left</option>
                          <option value="bottom-right">Bottom Right</option>
                        </select>
                      </div>

                      {/* Camera Size */}
                      <div className="flex flex-col items-start gap-2 text-xl">
                        <label htmlFor="size" className="font-semibold w-40">
                          Camera Size
                        </label>
                        <select
                          id="size"
                          name="size"
                          value={formData.size}
                          onChange={handleChange}
                          className="border-2 border-blue-700 font-semibold rounded-3xl py-2 px-4 text-blue-700 focus:outline-none text-lg placeholder:font-semibold w-full"
                          required
                        >
                          <option value="" disabled>
                            Select a size
                          </option>
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                        </select>
                      </div>

                      {/* Submit Button */}
                      <div className="flex flex-col items-center justify-center mt-7">
                        <button
                          type="submit"
                          className="px-10 py-3 bg-blue-500 text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 cursor-pointer font-semibold"
                        >
                          Update Camera Settings
                        </button>
                      </div>

                      {/* Message Display */}
                      {message && (
                        <div className={`text-${message.type === "success" ? "green" : "red"}-500 font-semibold mt-4`}>
                          {message.text}
                        </div>
                      )}
                    </form>
                    <div className="flex justify-center flex-col items-start w-full h-full">
                      <span className="font-semibold text-blue-900 py-1">Preview</span>
                      <div className="p-4 h-54 bg-gray-100 rounded shadow w-80">
                        {imageUrl ? (
                          <img src={imageUrl} alt="Selected" className="h-full w-full rounded-xl" />
                        ) : (
                          <p>No image available</p>
                        )}
                      </div>
                    </div>
                  </div>

                </div>

              </>
            )}

            {activePanel === "mail" && (
              <>
                <GoogleAuth />
              </>
            )}

            {activePanel === "videoPreference" && (
              <>
                <div className="form flex flex-col pt-10 relative z-20">
                  <VideoPreference />
                </div>
              </>
            )}

          </div>
        </div>
      </div>

    </>
  );
}
