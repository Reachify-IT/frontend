import React from "react";
import { FaUser, FaRegBuilding } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { Link } from "react-router-dom";
import logo from "../assets/Reachify (32).png";

const plans = [
    {
        id: "starter",
        name: "Starter",
        price: 1000,
        looms: 2000,
        icon: <FaUser className="h-16 w-16 text-blue-700" />,
    },
    {
        id: "pro",
        name: "Pro",
        price: 2500,
        looms: 5000,
        icon: <HiUserGroup className="h-16 w-16 text-blue-700" />,
    },
    {
        id: "enterprise",
        name: "Enterprise",
        price: 5000,
        looms: 10000,
        icon: <FaRegBuilding className="h-14 w-14 text-blue-700" />,
    },
];

const PricingSection = () => {

    return (
        <>
            <div className="fixed lg:bg-transparent bg-white top-0 z-50 flex items-center px-10 py-4 w-full">
                <div className="flex justify-between w-full items-center">
                    <Link to="/" >
                        <div className="flex items-center gap-2">
                            <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
                            <p className="font-semibold text-lg">Loomify</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="relative  overflow-hidden flex justify-center items-center h-full  lg:h-screen w-screen bg-white rounded-4xl pt-20">
                <div className='center-blob-1'></div>
                <div className='center-blob-2'></div>
                <div className="min-h-screen flex flex-col items-center justify-center  p-6 relative z-10">
                    <h1 className="text-4xl font-bold text-gray-900 ">Pricing</h1>
                    <div className="flex flex-wrap items-center justify-center gap-10 relative z-0 mt-16">
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                className="w-64 px-7 py-5 rounded-2xl transition duration-300 bg-[#d0ddf570] shadow-lg hover:shadow-2xl"
                            >
                                <div className="h-16 w-16 flex items-center justify-center text-blue-500">{plan.icon}</div>
                                <div className="flex flex-col gap-2 mt-4 text-center">
                                    <h1 className="text-2xl font-bold">{plan.name}</h1>
                                    <h2 className="text-2xl font-bold text-blue-500">${plan.price}</h2>
                                    <p className="text-lg">For Solo Professionals</p>
                                </div>
                                <div className="border-t p-5 mt-2">
                                    <ul className="list-disc font-semibold pl-5">
                                        <li>Limit: {plan.looms} Looms</li>
                                        <li>Ideal for freelancers & solo users</li>
                                    </ul>
                                </div>
                                <div className="flex items-center justify-center mt-4">
                                    <Link to="/login">
                                        <button
                                            className="bg-blue-700 text-sm px-7 py-3 text-white font-semibold rounded-2xl cursor-pointer hover:bg-blue-800"
                                        >
                                            Start 3-day FREE trial
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );

};

export default PricingSection;