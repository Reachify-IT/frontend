import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";
import GoogleAuth from "./GoogleAuth";
import VideoPreference from "./VideoPreference";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import OtpInput from "react-otp-input";
import loomS1  from "../assets/loom/SmallTopleft.png";
import loomS2  from "../assets/loom/Smallbottomleft.png";
import loomS3  from "../assets/loom/SmallBottomRight.png";
import loomS4  from "../assets/loom/SmallTopRight.png";

import loomM1 from "../assets/loom/MediumTopRight.png";
import loomM2 from "../assets/loom/MediumBottomRight.png";
import loomM3 from "../assets/loom/MediumBottomLeft.png";
import loomM4 from "../assets/loom/MediumTopLeft.png";

import loomL1 from "../assets/loom/LargeTopRight.png";
import loomL2 from "../assets/loom/LargeBottomRight.png";
import loomL3 from "../assets/loom/LargeBottomLeft.png";
import loomL4 from "../assets/loom/LargeTopLeft.png";




const imageMap = {
  "top-left": {
    small: loomS1,
    medium: loomM4,
    large: loomL4,
  },
  "top-right": {
    small: loomS4,
    medium: loomM1,
    large: loomL1,
  },
  "bottom-left": {
    small: loomS2,
    medium: loomM3,
    large: loomL3,
  },
  "bottom-right": {
    small: loomS3,
    medium: loomM2,
    large: loomL2,
  },
};


export default function Settings() {
  const [activePanel, setActivePanel] = useState("User");
  const [isloading, setIsloading] = useState(false);
  const [currentUserPhone, setCurrentUserPhone] = useState(null);
  const [currentUserMail, setCurrentUserMail] = useState(null);


  const [emailOtp, setEmailOtp] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);


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



  // Handle input change
  const userhandleChange = (e) => {
    setuserFormData({ ...userformData, [e.target.name]: e.target.value });
  };




  const openEmailOtpModal = async () => {

    const email = userformData.email;

    if (!email) {

      toast.error("Please enter your email to proceed!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }


    const validateEmail = (email) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    };

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }


   
    setIsEmailModalOpen(true);
    try {
      await axios.post(`${import.meta.env.VITE_BackendURL}/api/otp/send-email-otp`, { email: email });
      toast.info("OTP sent to email!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (error) {
      toast.error("Failed to send email OTP ❌", { position: "top-right" });
    }
  };

  const openPhoneOtpModal = async () => {
    const phone = userformData.phoneNumber;


    if (!phone) {
      toast.error("Please enter your phone number!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }


    if (phone.length !== 13) {
      toast.error("Please enter a valid phone number!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }

  
    setIsPhoneModalOpen(true);
    try {
      await axios.post(`${import.meta.env.VITE_BackendURL}/api/otp/send-phone-otp`, { phoneNumber: phone });
      toast.info("OTP sent to phone!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (error) {
      toast.error("Failed to send phone OTP ❌", { position: "bottom-right" });
    }
  };

  const handleEmailOtpVerification = async () => {
    const email = userformData.email;
    try {
      const response = await axios.post(`${import.meta.env.VITE_BackendURL}/api/otp/verify-email-otp`, {
        email: email,
        otp: emailOtp,
      });

      if (response.data.success) {
        toast.success("Email verified ✅", { position: "bottom-right" });
        setIsEmailVerified(true);
        setIsEmailModalOpen(false);
      } else {
        toast.error("Invalid Email OTP ❌", { position: "bottom-right" });
      }
    } catch (error) {
      toast.error("Email OTP verification failed ❌", { position: "bottom-right" });
    }
  };


  const handlePhoneOtpVerification = async () => {
    const phone = userformData.phoneNumber;
    console.log("phoneOtp", phone);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BackendURL}/api/otp/verify-phone-otp`, {
        phoneNumber: phone,
        otp: phoneOtp,
      });

      if (response.data.success) {
        toast.success("Phone verified ✅", { position: "bottom-right" });
        setIsPhoneVerified(true);
        setIsPhoneModalOpen(false);
      } else {
        toast.error("Invalid Phone OTP ❌", { position: "bottom-right" });
      }
    } catch (error) {
      toast.error("Phone OTP verification failed ❌", { position: "bottom-right" });
    }
  };




  // Handle form submission (Update User Info)
  const UserhandleSubmit = async (e) => {
    e.preventDefault();


    const isEmailChanged = userformData.email !== currentUserMail;
    const isPhoneChanged = userformData.phoneNumber !== currentUserPhone;

    // If email or phone is changed, enforce verification
    if (isEmailChanged && !isEmailVerified) {
      toast.error("Please verify your new email before updating!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }

    if (isPhoneChanged && !isPhoneVerified) {
      toast.error("Please verify your new phone number before updating!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }

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
      setCurrentUserPhone(response.data.user?.phoneNumber);
      setCurrentUserMail(response.data.user?.email);

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


  return (
    <>
      {isloading && <Loader />}
      <div className="flex items-center justify-start flex-col">
        <div className="top-bar flex items-center justify-center flex-col">
          <div className="relative z-10 switchbutton bg-blue-200 inline-flex flex-wrap  items-center justify-evenly gap-1 rounded-3xl">
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
                  <form onSubmit={UserhandleSubmit} className="flex flex-col gap-2">
                    {/* User Name Input */}
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

                    {/* Email Input with OTP Verification */}
                    <div className="flex">
                      <input
                        type="email"
                        name="email"
                        value={userformData.email}
                        disabled={isEmailVerified}
                        onChange={userhandleChange}
                        placeholder="Enter your email"
                        required
                        className={`border-2 border-blue-700 py-3 px-4 placeholder:text-blue-700 placeholder:font-semibold focus:outline-none text-lg w-full pr-12 
                          ${userformData?.email !== currentUserMail
                            ? "rounded-tl-3xl rounded-bl-3xl"
                            : "rounded-3xl"
                          }`
                        }
                      />
                      {userformData?.email !== currentUserMail && <>
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); openEmailOtpModal(); }}
                          className={`text-xs px-4 py-2 text-white rounded-tr-3xl rounded-br-3xl ${isEmailVerified ? "bg-green-500" : "bg-blue-500"}`}
                          disabled={isEmailVerified}
                        >
                          {isEmailVerified ? "Email Verified ✅" : "Verify Email"}
                        </button>
                      </>}

                    </div>

                    {/* Phone Input with OTP Verification */}
                    <div className="flex">
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={userformData.phoneNumber || "+91"}  // Default country code
                        disabled={isPhoneVerified}
                        onChange={userhandleChange}
                        placeholder="Enter your phone number"
                        required
                        className={`border-2 border-blue-700 py-3 px-4 placeholder:text-blue-700 placeholder:font-semibold focus:outline-none text-lg w-full pr-12 
                          ${userformData?.phoneNumber !== currentUserPhone
                            ? "rounded-tl-3xl rounded-bl-3xl"
                            : "rounded-3xl"
                          }`
                        }
                        pattern="^\+\d{1,3}\d{9,10}$" // Ensures country code + valid number
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(/[^0-9+]/g, ""); // Allow only numbers & "+"
                        }}
                      />
                      {userformData?.phoneNumber !== currentUserPhone && <>
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); openPhoneOtpModal(); }}
                          className={`text-xs px-4 py-2 text-white rounded-tr-3xl rounded-br-3xl ${isPhoneVerified ? "bg-green-500" : "bg-blue-500"}`}
                          disabled={isPhoneVerified}
                        >
                          {isPhoneVerified ? "Phone Verified ✅" : "Verify Phone"}
                        </button>
                      </>}

                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col items-center justify-center mt-7">
                      <button type="submit" className="cursor-pointer px-20 py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 font-semibold">
                        Update User
                      </button>
                    </div>
                  </form>

                  {/* Success/Error Message */}
                  {usermessage && (
                    <div className={`text-center font-normal mt-4 rounded ${usermessage.type === "success" ? "text-green-500" : "text-red-500"}`}>
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
                      <div className="h-54  rounded  w-80">
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

      {/* Email OTP Modal */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000062] bg-opacity-50" >
          <div className=" absolute bg-white p-6 rounded-lg shadow-lg w-96 flex items-center flex-col gap-5">
            <div className="absolute top-2 right-2 ">
              <button
                onClick={() => setIsEmailModalOpen(false)}
                className="px-4 py-2 transition duration-200"
              >
                <IoClose className="text-3xl text-red-500 cursor-pointer " />
              </button>
            </div>
            <h2 className="text-xl font-semibold">Verify Email OTP</h2>
            <OtpInput
              value={emailOtp}
              onChange={setEmailOtp}
              numInputs={6}
              containerStyle="flex gap-2 justify-center" // Custom container styling
              renderInput={(props) => (
                <input
                  {...props}
                  className="!w-12 !h-12 !border !border-gray-300 !rounded-md !text-center !text-lg !font-medium !focus:border-blue-500 !focus:ring-2 !focus:ring-blue-300 !outline-none !transition-all !duration-200"
                />
              )}
            />

            <button onClick={handleEmailOtpVerification} className="cursor-pointer mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Verify Email OTP</button>
          </div>
        </div>
      )}

      {/* Phone OTP Modal */}
      {isPhoneModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000062] bg-opacity-50" >

          <div className=" absolute bg-white p-6 rounded-lg shadow-lg w-96 flex items-center flex-col gap-5">
            <div className="absolute top-2 right-2 ">
              <button
                onClick={() => setIsPhoneModalOpen(false)}
                className="px-4 py-2 transition duration-200"
              >
                <IoClose className="text-3xl text-red-500 cursor-pointer " />
              </button>
            </div>
            <h2 className="text-xl font-semibold">Verify Phone OTP</h2>
            <OtpInput
              value={phoneOtp}
              onChange={setPhoneOtp}
              numInputs={6}
              containerStyle="flex gap-2 justify-center "
              renderInput={(props) => (
                <input
                  {...props}
                  className="!w-12 !h-12 !border !border-gray-300 !rounded-md !text-center !text-lg !font-medium !focus:border-blue-500 !focus:ring-2 !focus:ring-blue-300 !outline-none !transition-all !duration-200"
                />
              )}
            />

            <button onClick={handlePhoneOtpVerification} className="cursor-pointer mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Verify Phone OTP</button>
          </div>
        </div>
      )}

    </>
  );
}
