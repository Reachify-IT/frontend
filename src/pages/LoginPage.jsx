import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginRequest, loginSuccess, loginFailure } from "../../features/userSlice";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";
import socketService from "../../features/socketService";


function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    dispatch(loginRequest());
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BackendURL}/api/auth/signin`, {
        email,
        password,
      });
  
      const { accessToken, user } = response.data;
      console.log("user", response.data);
  
      const expiresAt = new Date().getTime() + 7 * 60 * 60 * 1000; // 7 hours in milliseconds
  
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("tokenExpiry", expiresAt); // Store expiration time
      dispatch(loginSuccess({ user, accessToken }));
  
      // Show success toast
      toast.info("Login successful!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: <FaCheckCircle className="text-blue-500 h-16 w-16" />,
        theme: "light",
      });
      socketService.connect(user?._id);
  
      navigate("/home");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed!";
      setErrorMessage(errorMsg);
      dispatch(loginFailure(errorMsg));
  
      // Show error toast
      toast.error(errorMsg, {
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
    }
  };
  

  return (
    <div className="relative overflow-hidden flex justify-center items-center h-screen w-screen bg-white rounded-4xl">
      <div className="center-blob-1"></div>
      <div className="center-blob-2"></div>
      <div className="flex items-center justify-center flex-col w-full max-w-md px-6">
        <h1 className="text-4xl font-bold text-center">Welcome Back! 👋🏻</h1>
        <div className="form flex flex-col pt-10 w-full">
          <form onSubmit={handleLogin} className="flex flex-col gap-5 w-full">
            {/* email Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-semibold text-lg">
                email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="border-2 border-blue-700 rounded-3xl py-3 px-4 placeholder:text-blue-700 focus:outline-none text-lg placeholder:font-semibold w-full"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="password" className="font-semibold text-lg">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-2 border-blue-700 rounded-3xl py-3 px-4 placeholder:text-blue-700 placeholder:font-semibold focus:outline-none text-lg w-full pr-12"
                  placeholder="Enter your password"
                  required
                />
                <span
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-blue-700"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={24} />
                  ) : (
                    <AiOutlineEye size={24} />
                  )}
                </span>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

            {/* Login Button */}
            <div className="flex flex-col items-center justify-center mt-5">
              <button
                type="submit"
                className="w-full px-8 py-3 bg-blue-500 text-white rounded-3xl hover:bg-blue-600 cursor-pointer font-semibold text-lg"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <Link to="/forget-password" className="mt-4">
                <span>
                  &#40;Forgot Password? <span className="text-red-500">Reset Here</span> &#41;
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
