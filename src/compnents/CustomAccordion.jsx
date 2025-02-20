import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const accordionData = [
  { id: 1, title: "General Settings", content: "Manage your general settings." },
  { id: 2, title: "User Management", content: "Manage users in the system." },
  { id: 3, title: "Security & Privacy", content: "Configure security settings." },
];

const CustomAccordion = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="mx-auto mt-10 bg-blue-100 shadow-lg rounded-2xl py-8 px-6 
        w-[320px] sm:w-[480px] md:w-[640px] lg:w-[800px] xl:w-[1000px]">
      {accordionData.map((item) => (
        <div key={item.id} className="border-b border-blue-900">
          <button
            onClick={() => toggleAccordion(item.id)}
            className="w-full flex justify-between items-center py-4 px-5 md:px-6 transition duration-300"
          >
            <span className="text-lg md:text-xl font-semibold cursor-pointer">{item.title}</span>
            <div className="bg-blue-900 p-2 md:p-3 rounded-full">
              {openAccordion === item.id ? (
                <FaChevronUp className="text-white text-sm md:text-base" />
              ) : (
                <FaChevronDown className="text-white text-sm md:text-base" />
              )}
            </div>
          </button>
          {openAccordion === item.id && (
            <div className="p-5 text-gray-900 text-base md:text-lg">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomAccordion;
