import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const accordionData = [
  { 
    id: 1, 
    title: "1. What is Loomify, and how does it work?", 
    content: "Loomify is an AI-powered personalized video outreach tool that helps businesses create engaging cold outreach campaigns. Instead of recording individual videos for each prospect, Loomify stitches a pre-recorded video with a dynamic scrolling view of the prospect's website or link. It then crafts hyper-personalized emails to boost engagement and response rates."
  },
  { 
    id: 2, 
    title: "2. Do I need to record a video for each prospect?", 
    content: "No! You only need to record one video template, and Loomify automatically integrates the prospect’s website or link to make it look highly personalized—without extra work from you."
  },
  { 
    id: 3, 
    title: "3. Does Loomify generate AI-personalized videos?", 
    content: "No, Loomify does not create AI-generated videos. Instead, it stitches your pre-recorded video with the prospect's website or a relevant link to make it look customized for each recipient."
  },
  { 
    id: 4, 
    title: "4. How does Loomify personalize emails?", 
    content: "Loomify analyzes the uploaded video template and the content from the prospect’s website to generate hyper-personalized email copy that feels unique and relevant to each recipient."
  },
  { 
    id: 5, 
    title: "5. Can I use Loomify with my CRM or LinkedIn?", 
    content: "Currently, Loomify does not integrate directly with CRMs or LinkedIn. However, you can export leads from your CRM and upload them into Loomify to automate personalized email outreach."
  },
  { 
    id: 6, 
    title: "6. What industries benefit most from Loomify?", 
    content: [
      "✅ Freelancers & Solopreneurs – Stand out with engaging video outreach",
      "✅ Sales Teams & B2B Businesses – Boost response rates in cold emails",
      "✅ Agencies & Service Providers – Scale personalized outreach without manual work",
      "✅ Founders & Entrepreneurs – Save time and automate lead generation"
    ]
  },
  { 
    id: 7, 
    title: "7. How does Loomify track engagement?", 
    content: [
      "📩 Opens your email",
      "🎥 Watches your video",
      "🗣 Replies to your message",
      "This helps you follow up at the right time and increase conversion rates."
    ]
  },
  { 
    id: 8, 
    title: "8. Do I need video editing skills to use Loomify?", 
    content: "Not at all! Loomify automatically stitches your recorded video with the scrolling prospect website—no editing required. Just upload your video and let Loomify do the rest!"
  },
  { 
    id: 9, 
    title: "9. Is Loomify difficult to set up?", 
    content: [
      "No, setting up Loomify is super simple! Just follow these three steps:",
      "1️⃣ Upload a generic video template",
      "2️⃣ Upload your prospect list & their website links",
      "3️⃣ Let Loomify automate personalized video emails",
      "🚀 You can start in minutes!"
    ]
  },
  { 
    id: 10, 
    title: "10. What results can I expect from using Loomify?", 
    content: [
      "✅ 3X higher response rates compared to regular cold emails",
      "✅ 40% increase in email open rates",
      "✅ More booked meetings & closed deals—without extra effort!",
      "💡 Try it yourself—Start Your Free Trial Today!"
    ]
  },
  { 
    id: 11, 
    title: "11. Is there a free trial available?", 
    content: [
      "Yes! You can try Loomify for free with no credit card required.",
      "🎯 Start Your Free Trial Now!"
    ]
  }
];

const CustomAccordion = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="mx-auto mt-10 bg-blue-100 shadow-lg rounded-2xl py-8 px-6 
        w-[320px] sm:w-[480px] md:w-[640px] lg:w-[800px] xl:w-[1200px]">
      {accordionData.map((item) => (
        <div key={item.id} className="border-b border-blue-900">
          <button
            onClick={() => toggleAccordion(item.id)}
            className="w-full flex justify-between items-center py-4 px-5 md:px-6 transition duration-300"
          >
            <span className="text-lg md:text-xl font-semibold cursor-pointer heading-font">{item.title}</span>
            <div className="bg-blue-900 p-2 md:p-3 rounded-full">
              {openAccordion === item.id ? (
                <FaChevronUp className="text-white text-sm md:text-base" />
              ) : (
                <FaChevronDown className="text-white text-sm md:text-base" />
              )}
            </div>
          </button>
          {openAccordion === item.id && (
            <div className="p-5 text-gray-900 text-base md:text-lg subheading">
              {Array.isArray(item.content) ? (
                <ul className="list-none pl-5">
                  {item.content.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              ) : (
                <p>{item.content}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomAccordion;
