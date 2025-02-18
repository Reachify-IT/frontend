import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from 'react-router-dom';


export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className="relative overflow-hidden flex justify-center items-center h-screen w-screen bg-white rounded-4xl">
                <div className='center-blob-1'></div>
                <div className='center-blob-2'></div>
                <div className='flex items-center justify-center flex-col'>
                    <h1 className="text-6xl font-bold"> Get Started with Loomify!🫱🏻‍🫲🏻</h1>
                    <div className="form flex flex-col pt-10">
                        <form action="submit" className='flex flex-col gap-3'>
                            <div className='flex items-center justify-between gap-4 text-xl'>
                                <label htmlFor="name" className='font-semibold w-40'>User name</label>
                                <input type="text" name="name" id="name" className='border-2 border-blue-700 rounded-3xl py-2 px-16 placeholder:text-blue-700 focus:outline-none text-lg placeholder:font-semibold w-full' placeholder='Enter your name' />
                            </div>

                            <div className='flex items-center justify-between  gap-4 text-xl'>
                                <label htmlFor="email" className='font-semibold w-40'>Email</label>
                                <input type="email" name="email" id="email" className='border-2 border-blue-700 rounded-3xl py-2 px-16 placeholder:text-blue-700 focus:outline-none text-lg placeholder:font-semibold w-full' placeholder='Enter your email' />
                            </div>

                            <div className='flex items-center justify-between  gap-4 text-xl'>
                                <label htmlFor="phone" className='font-semibold w-40'>Phone</label>
                                <input type="tel" name="phone" id="phone" className='border-2 border-blue-700 rounded-3xl py-2 px-16 placeholder:text-blue-700 focus:outline-none text-lg placeholder:font-semibold w-full' placeholder='Enter your phone No' />
                            </div>

                            <div className="flex items-center justify-between gap-4 text-xl relative">
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
                                <button className='w-full px-8 py-3 bg-blue-500 text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 cursor-pointer font-semibold'>Sign Up</button>
                                <Link to="/forget-password" className='mt-4'>
                                    <span>&#40;Forgot Password? <span className='text-red-500'>Reset Here</span> &#41;</span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
