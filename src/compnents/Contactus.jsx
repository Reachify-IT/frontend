import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/Reachify (32).png";

export default function Contactus() {
    const [formSubmitted, setFormSubmitted] = useState(false); // ❌ It was true by default

    useEffect(() => {
        // Dynamically load the form embed script
        const script = document.createElement("script");
        script.src = "https://link.msgsndr.com/js/form_embed.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    useEffect(() => {
        const iframe = document.getElementById("inline-7mhVa0CQG7kwrYWi6Iy5");

        const checkFormSubmission = () => {
            if (iframe?.contentWindow?.location.href.includes("success") || iframe?.contentWindow?.document.body.innerText.includes("Thank you")) {
                setFormSubmitted(true);
            }
        };

        const interval = setInterval(checkFormSubmission, 1000);

        return () => clearInterval(interval);
    }, []);


    return (
        <div>
            <div className="fixed top-0 z-50 flex items-center px-10 py-4 w-full">
                <div className="flex justify-between w-full items-center">
                    <Link to="/" >
                        <div className="flex items-center gap-2">
                            <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
                            <p className="font-semibold text-lg">Loomify</p>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="relative overflow-hidden flex justify-center items-center h-screen w-screen bg-white rounded-4xl">
                <div className='center-blob-1'></div>
                <div className='center-blob-2'></div>

                <div>
                    <h1 className='text-4xl lg:text-3xl font-bold text-center py-4'>Contact Us</h1>
                    <div className='mt-5 h-[80vh] overflow-y-auto'>
                        <div>
                            {formSubmitted ? (
                                <div className="text-center text-green-600 text-2xl font-semibold">
                                    ✅ Thank you for reaching out! We'll get back to you soon.
                                </div>
                            ) : (
                                <iframe
                                    src="https://api.leadconnectorhq.com/widget/form/7mhVa0CQG7kwrYWi6Iy5"
                                    className="w-[50vw] h-[75vh] border-none rounded-[20px] mb-1"
                                    id="inline-7mhVa0CQG7kwrYWi6Iy5"
                                    title="Contact Us"
                                ></iframe>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
