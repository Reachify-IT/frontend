import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


export default function Settings() {
  const [activePanel, setActivePanel] = useState("User");
  const [showPassword, setShowPassword] = useState(false);



  return (
    <>

        <div className="flex items-center justify-start flex-col">
          <div className="top-bar flex items-center justify-start flex-col">
            <div className="switchbutton bg-blue-200 inline-flex items-center justify-center gap-1 rounded-3xl">
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
                className={`px-8 py-3 rounded-3xl cursor-pointer transition-all ${activePanel === "Loom"
                  ? "bg-blue-700 text-white"
                  : "bg-transparent text-gray-700"
                  }`}
                onClick={() => setActivePanel("Loom")}
              >
                Loom Integration
              </div>
            </div>

            <div>
              {activePanel === "User" && (
                <>
                  <div className="form flex flex-col pt-10">
                    <form action="submit" className='flex flex-col gap-3'>
                      <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xl'>
                        <label htmlFor="name" className='font-semibold w-40'>User name</label>
                        <input type="text" name="name" id="name" className='border-2 border-blue-700 rounded-3xl py-2 px-16 placeholder:text-blue-700 focus:outline-none text-lg placeholder:font-semibold w-full' placeholder='Enter your name' />
                      </div>

                      <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between  gap-4 text-xl'>
                        <label htmlFor="email" className='font-semibold w-40'>Email</label>
                        <input type="email" name="email" id="email" className='border-2 border-blue-700 rounded-3xl py-2 px-16 placeholder:text-blue-700 focus:outline-none text-lg placeholder:font-semibold w-full' placeholder='Enter your email' />
                      </div>

                      <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between  gap-4 text-xl'>
                        <label htmlFor="phone" className='font-semibold w-40'>Phone</label>
                        <input type="tel" name="phone" id="phone" className='border-2 border-blue-700 rounded-3xl py-2 px-16 placeholder:text-blue-700 focus:outline-none text-lg placeholder:font-semibold w-full' placeholder='Enter your phone No' />
                      </div>

                      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xl relative">
                        <label htmlFor="password" className="font-semibold w-38">Password</label>
                        <div className="relative w-full">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            className="border-2 border-blue-700 rounded-3xl py-2 px-16 placeholder:text-blue-700 focus:outline-none text-lg placeholder:font-semibold w-full"
                            placeholder="Enter your password"
                          />
                          <span
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-blue-700"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                          </span>
                        </div>
                      </div>

                      <div className='flex flex-col items-center justify-center mt-7'>
                        <button className='px-20 py-3 bg-blue-500 text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 cursor-pointer font-semibold'>Update User</button>

                      </div>
                    </form>
                  </div>
                </>
              )}
              {activePanel === "Loom" && (
                <>
                  <div className="form flex flex-col pt-10">
                    <form action="submit" className='flex flex-col gap-5'>
                      <div className="flex flex-col items-start gap-2 text-xl">
                        <label htmlFor="cameraPosition" className="font-semibold w-40">
                          Camera Position
                        </label>
                        <select
                          id="cameraPosition"
                          name="cameraPosition"
                          className="border-2 border-blue-700 font-semibold rounded-3xl py-2 px-4 text-blue-700 focus:outline-none text-lg placeholder:font-semibold w-full"
                        >
                          <option value="" disabled selected>
                            Select a position
                          </option>
                          <option value="top">Top</option>
                          <option value="left">Left</option>
                          <option value="right">Right</option>
                          <option value="bottom">Bottom</option>
                        </select>
                      </div>

                      <div className='flex flex-col items-start justify-between gap-2 text-xl'>
                        <label htmlFor="name" className='font-semibold w-40'>Camera Size</label>
                        <input type="text" name="name" id="name" className='border-2 border-blue-700 rounded-3xl py-2 px-4 placeholder:text-blue-700 focus:outline-none text-lg placeholder:font-semibold w-full' placeholder='Enter Camera Size' />
                      </div>
                      <div className='flex flex-col items-center justify-center mt-7'>
                        <button className='px-20 py-3 bg-blue-500 text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 cursor-pointer font-semibold'>Update Camera Settings</button>

                      </div>

                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
  
    </>
  );
}
