import { useState } from "react";

import { TbSmartHome } from "react-icons/tb";
import { LuLayoutDashboard } from "react-icons/lu";
import { CiMobile3 } from "react-icons/ci";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { VscPreview } from "react-icons/vsc";
import BarChart from "../compnents/BarChart";
import CreateDoughnutData from "../compnents/CreateDoughnutData";
import { FaUser } from "react-icons/fa";
import { FaRegBuilding } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { BiSolidMessageDots } from "react-icons/bi";
import Settings from "../compnents/Settings";
import FeedbackForm from "../compnents/FeedbackForm";
import PanelSectionCard from "../compnents/PanelSectionCard";
import Notifications from "../compnents/Notifications ";
import { useSelector } from "react-redux";


export function HomePage() {
    const [activePanel, setActivePanel] = useState("task");
    const [activeSection, setActiveSection] = useState("home");

    const notifications = useSelector((state) => state.notifications.notifications);


    return (

        <div className="relative  overflow-hidden flex justify-center items-center h-screen w-screen bg-white rounded-4xl">
            <div className='center-blob-1'></div>
            <div className='center-blob-2'></div>
            <div className="w-full  container flex items-center justify-center px-10 ">
                <div className="flex items-start justify-between w-full h-full mt-0 lg:mt-10">
                    {/* Sidebar */}
                    <div className="realtive mt-3 z-50 sideNavbar w-[10%] h-full justify-center flex flex-col gap-5 items-center">
                        {/* Main Navigation */}
                        <div className="navWrapper w-12 px-1 rounded-full flex flex-col gap-3 items-center bg-blue-100 ">
                            {[
                                { icon: TbSmartHome, name: "home" },
                                { icon: LuLayoutDashboard, name: "dashboard" },
                                { icon: CiMobile3, name: "mobile" }
                            ].map(({ icon: Icon, name }, index) => (
                                <div
                                    key={index}
                                    onClick={() => setActiveSection(name)}
                                    className={`flex items-center justify-center h-12 w-12 rounded-full text-gray-600  cursor-pointer transition-all duration-300 
                ${activeSection === name ? "bg-blue-700 text-white" : "hover:bg-blue-700 hover:text-white"}`}
                                >
                                    <Icon className="text-3xl " />
                                </div>
                            ))}
                        </div>

                        {/* Settings & Notifications */}
                        <div className="navWrapper w-12 px-1 rounded-full flex flex-col gap-6 items-center bg-blue-100 relative">
                            {[
                                { icon: IoNotificationsOutline, name: "notifications", count: notifications.length },
                                { icon: IoSettingsOutline, name: "settings" }
                            ].map(({ icon: Icon, name, count }, index) => (
                                <div
                                    key={index}
                                    onClick={() => setActiveSection(name)}
                                    className={`relative flex items-center justify-center h-12 w-12 rounded-full text-gray-600 cursor-pointer transition-all duration-300 
                ${activeSection === name ? "bg-blue-700 text-white" : "hover:bg-blue-700 hover:text-white"}`}
                                >
                                    {name === "notifications" && count > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                                            {count > 99 ? "99+" : count}
                                        </span>
                                    )}
                                    <Icon className="text-3xl" />
                                </div>
                            ))}
                        </div>


                        {/* Preview Section */}
                        <div className="navWrapper w-12 px-1 rounded-full flex flex-col gap-6 items-center bg-blue-100 ">
                            <div
                                onClick={() => setActiveSection("preview")}
                                className={`flex items-center justify-center h-12 w-12 rounded-full text-gray-600 cursor-pointer transition-all duration-300 
              ${activeSection === "preview" ? "bg-blue-700 text-white" : "hover:bg-blue-700 hover:text-white"}`}
                            >
                                <VscPreview className="text-3xl" />
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="w-[85%] h-[75vh]">
                        {activeSection === "home" && (
                            <>
                                <h1 className="text-4xl font-bold ">My Dashboard</h1>
                                {/* Charts Section */}
                                <div className="flex flex-col lg:flex-row w-full  gap-4 mt-4 relative z-10">

                                    <div className="flex w-full lg:w-[60%] flex-col bg-blue-200 rounded-3xl p-5 items-start justify-center gap-4">
                                        <h1 className="text-start font-bold text-gray-700 text-2xl mt-2">
                                            Bulk Looms sent (Monthly)
                                        </h1>
                                        <div className="flex w-full h-full aspect-[2/1] items-center justify-center">
                                            <BarChart />
                                        </div>
                                    </div>
                                    {/* Pie Charts */}
                                    <div className="flex flex-col w-full lg:w-[40%]  h-auto gap-4 relative z-50">
                                        {[...Array(2)].map((_, i) => (
                                            <div key={i} className="flex flex-col sm:flex-row w-full bg-blue-200 rounded-3xl px-2 items-center justify-center">
                                                <h1 className="text-nowrap font-semibold text-gray-700 text-2xl">
                                                    Limited Used
                                                </h1>
                                                <CreateDoughnutData />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {activeSection === "dashboard" && (
                            <>
                                <PanelSectionCard />
                            </>
                        )}

                        {activeSection === "mobile" && (
                            <>
                                <div className="flex flex-wrap items-center justify-center gap-10 relative z-50 mt-5">
                                    <div className="card w-64 bg-blue-100 px-7 py-5 rounded-2xl">
                                        <div className="card-img h-16 w-16 flex items-center justify-center">
                                            <FaUser className="h-16 w-16 text-blue-700" />
                                        </div>
                                        <div className="flex flex-col gap-2 mt-4">
                                            <h1 className="text-2xl font-bold">Individual Plan</h1>
                                            <h2 className="text-2xl font-bold text-red-500">$20</h2>
                                            <p className="text-center text-lg">For Solo Professionals</p>
                                        </div>
                                        <div className="border-t p-5 mt-2">
                                            <ul className="list-disc font-semibold">
                                                <li>Limit: 2,000 Looms</li>
                                                <li> Ideal for freelancers    & solo users</li>
                                            </ul>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <button className="bg-blue-700 text-sm px-7 py-3 flex items-center justify-center text-white font-semibold rounded-2xl cursor-pointer hover:bg-blue-800">Start 3-day FREE trial </button>
                                        </div>
                                    </div>
                                    <div className="card w-64 bg-blue-100 px-7 py-5 rounded-2xl">
                                        <div className="card-img h-16 w-16 flex items-center justify-center">
                                            <HiUserGroup className="h-16 w-16 text-blue-700" />
                                        </div>
                                        <div className="flex flex-col gap-2 mt-4">
                                            <h1 className="text-2xl font-bold">Small Team Plan</h1>
                                            <h2 className="text-2xl font-bold text-red-500">$60</h2>
                                            <p className="text-center text-lg">For Solo Professionals</p>
                                        </div>
                                        <div className="border-t p-5 mt-2">
                                            <ul className="list-disc font-semibold">
                                                <li>Limit: 6,000 Looms</li>
                                                <li> Ideal for freelancers    & solo users</li>
                                            </ul>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <button className="bg-blue-700 text-sm px-7 py-3 flex items-center justify-center text-white font-semibold rounded-2xl cursor-pointer hover:bg-blue-800">Start 3-day FREE trial </button>
                                        </div>
                                    </div>
                                    <div className="card w-64 bg-blue-100 px-7 py-5 rounded-2xl">
                                        <div className="card-img h-16 w-16 flex items-center justify-center">
                                            <FaRegBuilding className="h-14 w-14 text-blue-700" />
                                        </div>
                                        <div className="flex flex-col gap-2 mt-4">
                                            <h1 className="text-2xl font-bold">Agency Plan</h1>
                                            <h2 className="text-2xl font-bold text-red-500">$150</h2>
                                            <p className="text-center text-lg">For Solo Professionals</p>
                                        </div>
                                        <div className="border-t p-5 mt-2">
                                            <ul className="list-disc font-semibold">
                                                <li>Limit: 20,000 Looms</li>
                                                <li> Ideal for freelancers    & solo users</li>
                                            </ul>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <button className="bg-blue-700 text-sm px-7 py-3 flex items-center justify-center text-white font-semibold rounded-2xl cursor-pointer hover:bg-blue-800">Start 3-day FREE trial </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeSection === "notifications" && (
                            <>
                                <Notifications />
                            </>
                        )}

                        {activeSection === "settings" && (
                            <>
                                <Settings />
                            </>
                        )}

                        {activeSection === "preview" && (
                            <>
                                <FeedbackForm />
                            </>
                        )}

                        {/* Placeholder for other sections */}
                        {!["home", "dashboard", "mobile", "notifications", "settings", "preview"].includes(activeSection) && (
                            <div className="mainContainer w-[85%] h-[450px] flex flex-col items-center justify-center bg-gray-100 rounded-2xl p-6">
                                <span className="text-6xl">🚧</span>
                                <h1 className="text-3xl font-semibold text-gray-800 mt-4">Page Under Progress</h1>
                                <p className="text-gray-600 mt-2 text-center">
                                    We're working on something amazing. Stay tuned!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
