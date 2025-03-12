import React, { useState } from 'react'
import logo from "../assets/Reachify (32).png";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaRegBuilding } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { FaVideo } from "react-icons/fa6";
import { IoIosMailUnread } from "react-icons/io";
import { FaClock } from "react-icons/fa6";
import { MdAutoGraph } from "react-icons/md";
import { FaUpload } from "react-icons/fa";
import { FaFileCsv } from "react-icons/fa6";
import { FaCirclePlay } from "react-icons/fa6";
import ClientStories from '../compnents/ClientStories';
import CustomAccordion from '../compnents/CustomAccordion';
import logosmall from "../assets/Untitled design (49).png";
import { FaCheck } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5"; // Close icon
import { GoGraph } from "react-icons/go";
import getImage from "../assets/cardImage.svg"
import { MdOutlineArrowRight } from "react-icons/md";
import step2IMg from "../assets/startprocess.svg"
import step3IMg from "../assets/csvupload.svg"

export default function Landinpage() {
    const [activeStep, setActiveStep] = useState("one");
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='bg-white' >
            <div className='relative overflow-hidden'>
                <div className='center-blob-1'></div>
                <div className='center-blob-2'></div>
                {/* Navbar */}
                <nav className="relative z-50 px-6 sm:px-14 py-5 bg-transprent">
                    <div className="flex justify-between w-full items-center font-semibold">
                        {/* Logo */}
                        <Link to="/">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
                                <p className="font-semibold text-lg">Loomify</p>
                            </div>
                        </Link>

                        {/* Mobile Menu Button */}
                        <div className="sm:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <IoClose size={24} /> : <RxHamburgerMenu size={24} />}
                        </div>

                        {/* Mobile Menu (Slide-in) */}
                        <div
                            className={`fixed top-0 left-0 w-full h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-8 transition-transform duration-300 ease-in-out ${isOpen ? "translate-y-0" : "-translate-y-full"
                                }`}
                        >
                            {/* Close Button */}
                            <button className="absolute top-5 right-5 text-3xl" onClick={() => setIsOpen(false)}>
                                ✕
                            </button>

                            <a href="https://www.reachifyinnovations.com/" target="_blank" rel="noopener noreferrer">
                                <p className="hover:text-neutral-500 relative z-10 transition-all duration-300 ease-in-out">Reachify</p>
                            </a>
                            <p
                                className="hover:text-neutral-500 relative z-10 transition-all duration-300 ease-in-out cursor-pointer"
                                onClick={() => {
                                    document.getElementById("features-section")?.scrollIntoView({ behavior: "smooth" });
                                    setIsOpen(false); // Close menu after click
                                }}
                            >
                                Features
                            </p>

                            {/* Buttons */}
                            <Link to="/login">
                                <button className="hover:bg-blue-700 border border-blue-700 px-10 py-3 text-white rounded-3xl relative z-10 transition-all duration-300 ease-in-out">
                                    Sign In
                                </button>
                            </Link>
                            <Link to="/sign-up">
                                <button className="bg-blue-700 hover:bg-transparent border border-blue-700 px-10 py-3 text-white hover:text-blue-700 rounded-3xl relative z-10 transition-all duration-300 ease-in-out">
                                    Start Your Free Trial
                                </button>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden sm:flex items-center justify-between gap-10">
                            <a href="https://www.reachifyinnovations.com/" target="_blank" rel="noopener noreferrer">
                                <p className="hover:text-neutral-500 relative z-10 transition-all duration-300 ease-in-out">Reachify</p>
                            </a>
                            <p
                                className="hover:text-neutral-500 relative z-10 transition-all duration-300 ease-in-out cursor-pointer"
                                onClick={() => document.getElementById("features-section")?.scrollIntoView({ behavior: "smooth" })}
                            >
                                Features
                            </p>

                            {/* Buttons */}
                            <div className="flex items-center gap-5">
                                <Link to="/login">
                                    <button className="hover:bg-blue-700 border border-blue-700 px-10 py-3 text-black hover:text-white rounded-3xl relative z-10 transition-all duration-300 ease-in-out cursor-pointer">
                                        Sign In
                                    </button>
                                </Link>
                                <Link to="/sign-up">
                                    <button className="bg-blue-700 hover:bg-transparent border border-blue-700 px-10 py-3 text-white hover:text-blue-900 rounded-3xl relative z-10 transition-all duration-300 ease-in-out cursor-pointer">
                                        Start Your Free Trial
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
                {/* heroSection */}
                <section className=" relative z-10 flex justify-center items-center h-full bg-transprent py-24">
                    <div className='relative z-20 flex items-center text-center justify-center flex-col lg:px-3 px-0'>
                        <h1 className="max-w-[40ch] text-4xl lg:text-6xl font-medium text-[#002b7f] text-center heading-font">Turn Cold Leads into Engaged <br /> Conversations with <br /> AI-Personalized Video Outreach </h1>
                        <p className='max-w-[100ch] sm:text-xl text-2xl py-5 subheading'> 🔥 Struggling to get responses from cold outreach? Most emails get ignored, but video messages grab attention instantly! Loomify automates personalized video creation & outreach, so you can engage more leads in less time. </p>
                        <div>
                            <Link to='/sign-up'>
                                <button className='mt-5 hover:border-blue-700 hover:text-black hover:bg-transparent border broder-white bg-[#025cff] px-10 py-3 text-white rounded-3xl cursor-pointer font-semibold relative z-10 transition-all duration-300 ease-in-out '>Start Your Free Trail</button>
                            </Link>
                        </div>
                    </div>
                </section>

            </div>

            {/* Who is Loomify For? */}
            <section>
                <div className='container'>
                    <div className='flex items-center  flex-col pb-20'>
                        <h1 className='text-3xl font-semibold  '>Who is Loomify For?</h1>
                        <div className='flex items-center flex-col sm:flex-row py-10 justify-center gap-5 text-sm'>
                            <div className='flex items-center justify-center gap-1'>
                                <FaUser className='text-blue-700 text-2xl' />
                                <p>Freelancers & Solopreneurs</p>
                            </div>
                            <div className='flex items-center justify-center gap-1'>
                                <HiUserGroup className='text-blue-700 text-3xl' />
                                <p>Sales Teams & B2B Businesses</p>
                            </div>
                            <div className='flex items-center justify-center gap-1'>
                                <FaRegBuilding className='text-blue-700 text-2xl' />
                                <p>Agencies & Service Providers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What Makes Loomify a Game-Changer? */}
            <section className='relative overflow-hidden' id="features-section">
                <div className='center-blob-1'></div>
                <div className='center-blob-2'></div>
                <div className='container relative z-10 '>
                    <div className='pb-10 flex items-center justify-center flex-col h-full'>
                        <h1 className='text-2xl sm:text-6xl font-semibold text-center'>What Makes Loomify a Game-Changer?</h1>

                        <div className="card-section grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-3xl h-full justify-center py-20 px-3">

                            <div className='bg-blue-50 shadow w-full flex items-center flex-col p-6 hover:bg-blue-100 relative z-10 transition-all duration-300 ease-in-out gap-2 rounded-3xl'>
                                <div className='flex items-center justify-center text-white p-4 rounded-full bg-[#025cff] text-5xl '>
                                    <FaVideo />
                                </div>
                                <h1 className='text-xl text-blue-900 font-semibold text-center'>Smart Video Personalization with Link Integration</h1>
                                <p className='text-sm text-center font-semibold text-gray-700'>Upload a generic video template, and Loomify
                                    automatically stitches it with a dynamic
                                    scrolling view of your prospect's website or
                                    link. This creates a custom-like experience
                                    without manually recording for each lead.</p>
                            </div>
                            <div className='bg-blue-50 shadow w-full flex items-center flex-col p-6 hover:bg-blue-100 relative z-10 transition-all duration-300 ease-in-out gap-2 rounded-3xl'>
                                <div className='flex items-center justify-center text-white p-4 rounded-full bg-[#025cff] text-5xl '>
                                    <IoIosMailUnread />
                                </div>
                                <h1 className='text-xl text-blue-900 font-semibold text-center'>Smart Video Personalization with Link Integration</h1>
                                <p className='text-sm text-center font-semibold text-gray-700'>Upload a generic video template, and Loomify
                                    automatically stitches it with a dynamic
                                    scrolling view of your prospect's website or
                                    link. This creates a custom-like experience
                                    without manually recording for each lead.</p>
                            </div>
                            <div className='bg-blue-50 shadow w-full flex items-center flex-col p-6 hover:bg-blue-100 relative z-10 transition-all duration-300 ease-in-out gap-2 rounded-3xl'>
                                <div className='flex items-center justify-center text-white p-4 rounded-full bg-[#025cff] text-5xl '>
                                    <FaClock />
                                </div>
                                <h1 className='text-xl text-blue-900 font-semibold text-center'>Smart Video Personalization with Link Integration</h1>
                                <p className='text-sm text-center font-semibold text-gray-700'>Upload a generic video template, and Loomify
                                    automatically stitches it with a dynamic
                                    scrolling view of your prospect's website or
                                    link. This creates a custom-like experience
                                    without manually recording for each lead.</p>
                            </div>
                            <div className='bg-blue-50 shadow w-full flex items-center flex-col p-6 hover:bg-blue-100 relative z-10 transition-all duration-300 ease-in-out gap-2 rounded-3xl'>
                                <div className='flex items-center justify-center text-white p-4 rounded-full    bg-[#025cff] text-5xl '>
                                    <GoGraph />

                                </div>
                                <h1 className='text-xl text-blue-900 font-semibold text-center'>Smart Video Personalization with Link Integration</h1>
                                <p className='text-sm text-center font-semibold text-gray-700'>Upload a generic video template, and Loomify
                                    automatically stitches it with a dynamic
                                    scrolling view of your prospect's website or
                                    link. This creates a custom-like experience
                                    without manually recording for each lead.</p>
                            </div>

                        </div>

                        <div>
                            <Link to='/sign-up'>
                                <button className='mt-5 hover:border-blue-700 hover:text-black hover:bg-transparent border broder-white bg-[#025cff] px-10 py-3 text-white rounded-3xl cursor-pointer font-semibold relative z-10 transition-all duration-300 ease-in-out' >Try Loomify Free Today! </button>
                            </Link>
                        </div>

                    </div>
                </div>
            </section>


            {/* How It Works – 3 Simple Steps */}

            <section>
                <div className='container'>
                    <div className='flex flex-col items-center justify-center pb-20 pt-28'>
                        <h1 className='text-2xl sm:text-6xl font-semibold text-center'>How It Works – 3 Simple Steps</h1>
                        <div className='py-20 flex items-center flex-col-reverse sm:flex-row gap-10 justify-center px-2 sm:px-20 md:px-14'>
                            <div className="left w-full sm:w-1/2  h-96 flex items-center justify-center px-3 sm:px-20 md:px-5 py-10">
                                {activeStep === "one" && (
                                    <>
                                        <div className="bg-blue-50 p-8 rounded-2xl shadow-lg flex flex-col items-center w-full">
                                            <div className="bg-white p-3 rounded-full shadow-lg border-5 border-black ">
                                                <FaCirclePlay className="text-black text-8xl" />
                                            </div>
                                            <p className="text-lg text-blue-900 font-semibold mt-4">Upload Your Pre-recorded Video</p>
                                            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:text-neutral-300 cursor-pointer">
                                                <FaUpload /> Upload
                                            </button>
                                        </div>
                                    </>
                                )}
                                {activeStep === "two" && (
                                    <> <div className="bg-blue-50 p-8 rounded-2xl shadow-lg flex flex-col items-center w-full">
                                        <img src={step2IMg} alt="" />
                                    </div>

                                    </>
                                )}
                                {activeStep === "three" && (
                                    <div className="p-4 bg-blue-50 text-white rounded-lg w-full text-center">
                                       <img src={step3IMg} alt="" />
                                    </div>
                                )}
                            </div>
                            <div className="relative top-0 w-full sm:w-1/2 h-96   sm:p-6 flex flex-col justify-between pl-10">
                                <div className="flex flex-col justify-between h-full">
                                    <div className="one p-4 rounded-lg ">
                                        <h1 className="text-lg font-bold text-[#002b7f]">Upload Your Video Template</h1>
                                        <p className="text-sm text-gray-700">
                                            Record a short, generic video for your outreach—no need to personalize each one manually.
                                        </p>
                                    </div>
                                    <div className="two p-4 rounded-lg ">
                                        <h1 className="text-lg font-bold text-[#002b7f]">Upload Your Leads & Links</h1>
                                        <p className="text-sm text-gray-700">
                                            Loomify automatically scrolls your prospect’s website or link, stitching it with your pre-recorded video to make it look highly customized.
                                        </p>
                                    </div>
                                    <div className="three   p-4 rounded-lg ">
                                        <h1 className="text-lg font-bold text-[#002b7f]">AI-Generated Email Outreach</h1>
                                        <p className="text-sm text-gray-700">
                                            Loomify writes and sends personalized emails based on the video and the website content, ensuring higher engagement & response rates.
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute  h-full text-2xl font-semibold left-0 sm:left-[-27px] top-0 py-10 flex flex-col items-center">
                                    {/* Vertical line connecting steps */}
                                    <div className="relative flex flex-col justify-between items-center h-full">
                                        <div className="absolute w-1 bg-[#025cff] h-full top-0 left-1/2 transform -translate-x-1/2"></div>

                                        {/* Step 1 */}
                                        <div
                                            className={`relative z-10 transition-all duration-300 ease-in-out p-3 rounded-full border-3 text-blue-700 border-blue-700 flex items-center justify-center w-12 h-12 cursor-pointer ${activeStep === "one" ? "bg-blue-700 text-white" : "bg-white"}`}
                                            onClick={() => setActiveStep("one")}
                                        >
                                            1
                                        </div>

                                        {/* Step 2 */}
                                        <div
                                            className={`relative z-10 transition-all duration-300 ease-in-out p-3 rounded-full border-3 text-blue-700 border-blue-700 flex items-center justify-center w-12 h-12 cursor-pointer ${activeStep === "two" ? "bg-blue-700 text-white" : "bg-white"}`}
                                            onClick={() => setActiveStep("two")}
                                        >
                                            2
                                        </div>

                                        {/* Step 3 */}
                                        <div
                                            className={`relative z-10 transition-all duration-300 ease-in-out p-3 rounded-full border-3 text-blue-700 border-blue-700 flex items-center justify-center w-12 h-12 cursor-pointer ${activeStep === "three" ? "bg-blue-700 text-white" : "bg-white"}`}
                                            onClick={() => setActiveStep("three")}
                                        >
                                            3
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div>
                            <Link to='/sign-up'>
                                <button className='mt-5 hover:border-blue-700 hover:text-black hover:bg-transparent border broder-white bg-[#025cff] px-10 py-3 text-white rounded-3xl cursor-pointer font-semibold relative z-10 transition-all duration-300 ease-in-out'>Start for Free! </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Stories – What Our Users Say */}
            <section>
                <div className='flex items-center justify-center flex-col pb-20'>

                    <ClientStories />
                    <h1 className='text-2xl sm:text-3xl font-semibold text-center'>See for yourself</h1>
                    <div>
                        <Link to='/sign-up'>
                            <button className='mt-5 hover:border-blue-700 hover:text-black hover:bg-transparent border broder-white bg-blue-700 px-10 py-3 text-white rounded-3xl cursor-pointer font-semibold relative z-10 transition-all duration-300 ease-in-out'>Try Loomify Today!</button>
                        </Link>
                    </div>
                </div>

            </section>


            {/* Get More Replies & Close More Deals—Faster! */}
            <section>
                <div className='container'>
                    <div className="py-5 flex items-center justify-center flex-col w-full h-full px-5">
                        <div className='bg-blue-600  rounded-3xl text-white  flex'>
                            <div className='px-3 sm:px-20 py-4 flex flex-col items-start justify-center'>
                                <h1 className=' text-4xl font-bold max-w-[30ch]'>Get More Replies & Close More Deals—Faster!</h1>
                                <ul className='list-none py-6 space-y-2 text-lg'>
                                    <li className="  text-white flex items-center "><span><MdOutlineArrowRight className='text-4xl' /></span> Save Time. Scale Outreach. Increase Engagement.</li>
                                    <li className="  text-white flex items-center "><span><MdOutlineArrowRight className='text-4xl' />
</span>AI-personalized video + automated email outreach = higher conversions</li>
                                </ul>
                                <div className='flex items-center justify-center sm:justify-start'>
                                    <Link to='/sign-up'>
                                        <button className='mt-1 ml-2 border border-blue-700 hover:bg-transparent hover:border-white hover:border hover:text-white bg-gray-100 px-10 py-2 text-blue-900 rounded-3xl cursor-pointer font-semibold relative z-10 transition-all duration-300 ease-in-out'>
                                            Start Your Free Trail
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <img src={getImage} alt="" className='w-[350px] h-full object-contain' />
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Frequently Asked Questions (FAQs) */}
            <section>
                <div className='container'>
                    <div className="py-20 flex items-center justify-center flex-col">
                        <h1 className='text-2xl sm:text-6xl font-semibold text-center'>Frequently Asked Questions (FAQs)</h1>
                        <div>
                            <CustomAccordion />
                        </div>
                    </div>
                </div>
            </section>

            {/* footer section */}
            <footer>
                <div className='bg-[#002b7f] w-full h-full px-3 sm:px-20 py-10'>
                    <div className='flex items-center text-white justify-center sm:justify-start'>
                        <h1 className='font-bold'>@ powered by</h1>
                        <img src={logosmall} alt="" className="h-16 w-16 filter invert" />
                        <a href="https://www.reachifyinnovations.com/" target='_blank'>
                        <h1 className='text-2xl comLogo'>Reachify</h1>
                        </a>
                    </div>
                    <div className='text-white flex-col sm:flex-row flex items-center  sm:items-start justify-center  sm:justify-between mt-10'>
                        <div className='w-full sm:w-1/2'>
                            <h1 className='text-2xl w-full sm:max-w-[30ch] font-semibold'>Start Automating Your Personalized Outreach Today!</h1>
                            <ul className='list-none space-y-2 mt-5'>

                                <li className='flex items-center gap-2 hover:text-neutral-300 cursor-pointer' > ✅ Get More Replies, More Conversions, & More Sales</li>
                                <li className='flex items-center gap-2 hover:text-neutral-300 cursor-pointer' > ✅ No More Manual Outreach – Let AI Do the Heavy Lifting</li>
                                <li className='flex items-center gap-2 hover:text-neutral-300 cursor-pointer' >✅ 100% Free Trial – Start in 60 Seconds!</li>
                            </ul>
                        </div>
                        <div className=' w-full sm:w-1/2 flex flex-col sm:flex-row gap-10 sm:items-start justify-between px-7 sm:px-20 my-10 sm:mt-5'>
                            <div>
                                <h1 className='font-bold text-xl'>Company</h1>
                                <ul className='space-y-2 mt-4 flex flex-col gap-2'>
                                    <a href="https://www.reachifyinnovations.com" target='_blank'>
                                        <li className='text-white hover:text-neutral-300 cursor-pointer'>Reachify</li>
                                    </a>
                                    <a href="https://www.reachifyinnovations.com/blog" target='_blank'>
                                        <li className='text-white hover:text-neutral-300 cursor-pointer'>Blogs</li>
                                    </a>
                                    <a href="https://www.reachifyinnovations.com/privacypolicy" target='_blank'>
                                        <li className='text-white hover:text-neutral-300 cursor-pointer'>Privacy Policy</li>
                                    </a>
                                    <a href="https://www.reachifyinnovations.com/reachifyteams" target='_blank'>
                                        <li className='text-white hover:text-neutral-300 cursor-pointer'>Terms & Conditions</li>
                                    </a>
                                    <li className='text-white hover:text-neutral-300 cursor-pointer'>Refund Policy</li>
                                </ul>
                            </div>
                            <div>
                                <h1 className='font-bold text-xl'>Follow Us</h1>
                                <div className='flex flex-col space-y-4 mt-4'>
                                    <a href="https://www.linkedin.com/company/reachifyinnovations/posts/?feedView=all" target='_blank'>
                                        <span className='flex items-center gap-2 hover:text-neutral-300 cursor-pointer'><CiLinkedin className='text-3xl' />Linkedin</span>
                                    </a>
                                    <a href="https://www.instagram.com/reachify_ai/" target='_blank'>
                                    <span className='flex items-center gap-2 hover:text-neutral-300 cursor-pointer'><FaInstagram className='text-2xl' />Instagram</span>
                                    </a>
                                    <a href="https://x.com/Reachify_ai"></a>
                                    <span className='flex items-center gap-2 hover:text-neutral-300 cursor-pointer'><FaXTwitter className='text-2xl' />X</span>

                                    <a href="https://www.facebook.com/profile.php?id=61557950262831" target='_blank'>
                                    <span className='flex items-center gap-2 hover:text-neutral-300 cursor-pointer'><FaFacebookSquare className='text-2xl' />Facebook</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Link to='/sign-up'>
                            <button className='text-wrap mt-0 border border-blue-700 hover:bg-transparent hover:border-white hover:border hover:text-white bg-gray-100 px-10 py-3 text-blue-900 rounded-3xl cursor-pointer font-bold relative z-10 transition-all duration-300 ease-in-out'>
                                Try Loomify Now – No Credit Card Needed!</button>
                        </Link>
                    </div>
                </div>
                <div className='bg-[#002b7f] text-white text-xs text-center py-2'>
                    <p>© 2025 Loomify. All Rights Reserved.</p>
                </div>

            </footer>

        </div>
    )
}
