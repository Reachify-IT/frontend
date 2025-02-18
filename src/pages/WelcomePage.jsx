import React from 'react';
import { Link } from 'react-router-dom';


function WelcomePage() {
    return (
        <>
        <div className="relative overflow-hidden flex justify-center items-center h-screen w-screen bg-white rounded-4xl">
            <div className='center-blob-1'></div>
            <div className='center-blob-2'></div>
            <div className='flex items-center justify-center flex-col'>
                <h1 className="text-6xl font-bold">Welcome to Loomify! 🚀</h1>
                <p className='text-2xl py-5'>Automate personalized Loom videos with ease.</p>
                <div className='flex'>
                    <p>🔹 Save time with automation</p>
                    <p>🔹 Generate bulk personalized videos</p>
                    <p>🔹 Save time with automation</p>
                </div>
                <div className='flex flex-col pt-10'>
                    <div className='flex items-center justify-center gap-5'>
                        <Link to="/login">
                        <button className='px-8 py-3 bg-blue-500 text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 cursor-pointer font-semibold'>Login</button>
                        </Link>

                        <Link to="/sign-up">
                        <button className='px-8 py-3 bg-blue-500 text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 cursor-pointer font-semibold'>Sign Up</button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
        </>
    );
}

export default WelcomePage;
