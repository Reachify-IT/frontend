import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


export default function ForgetPass() {
        const [showPassword, setShowPassword] = useState(false);
    
  return (
    <>
        <div className="relative overflow-hidden flex justify-center items-center h-screen w-screen bg-white rounded-4xl">
                  <div className='center-blob-1'></div>
                  <div className='center-blob-2'></div>
                  <div className='flex items-center justify-center flex-col w-full  px-6'>
                      <h1 className="text-4xl font-bold text-center">Welcome Change Password! 👋🏻</h1>
                      <div className="form flex flex-col pt-5 w-full max-w-md">
                          <form action="submit" className="flex flex-col gap-3 w-full">
                              {/* Email Field */}
                              <div className="flex flex-col gap-2">
                                  <label htmlFor="email" className="font-normal text-lg">Current Password</label>
                                  <input
                                      type="password"
                                      name="email"
                                      id="email"
                                      className="border-2 border-blue-700 rounded-3xl py-1 px-4 placeholder:text-blue-700 focus:outline-none text-lg placeholder:font-normal w-full"
                                      placeholder="Enter your password"
                                  />
                              </div>
      
                              {/* Password Field */}
                              <div className="flex flex-col gap-2 relative">
                                  <label htmlFor="password" className="font-normal text-lg">New Password</label>
                                  <div className="relative">
                                      <input
                                          type={showPassword ? "text" : "password"}
                                          name="password"
                                          id="password"
                                          className="border-2 border-blue-700 rounded-3xl py-1 px-4 placeholder:text-blue-700 placeholder:font-normal focus:outline-none text-lg w-full pr-12"
                                          placeholder="Enter your New password"
                                      />
                                      <span
                                          className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-blue-700"
                                          onClick={() => setShowPassword((prev) => !prev)}
                                      >
                                          {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                                      </span>
                                  </div>
                              </div>
      
                              <div className="flex flex-col gap-2 relative">
                                  <label htmlFor="password" className="font-normal text-lg">New Password</label>
                                  <div className="relative">
                                      <input
                                          type={showPassword ? "text" : "password"}
                                          name="password"
                                          id="password"
                                          className="border-2 border-blue-700 rounded-3xl py-1 px-4 placeholder:text-blue-700 placeholder:font-normal focus:outline-none text-lg w-full pr-12"
                                          placeholder="Enter your New password"
                                      />
                                      <span
                                          className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-blue-700"
                                          onClick={() => setShowPassword((prev) => !prev)}
                                      >
                                          {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                                      </span>
                                  </div>
                              </div>
      
                              {/* Login Button */}
                              <div className="flex flex-col items-center justify-center mt-5">
                                  <button className="w-full py-3 bg-blue-500 text-white rounded-3xl hover:bg-blue-600 cursor-pointer font-semibold text-lg">
                                      Change Password
                                  </button>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
    </>
  )
}
