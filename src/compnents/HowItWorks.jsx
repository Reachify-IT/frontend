import { useState, useEffect, useRef } from "react";
import { FaCirclePlay, FaUpload } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdAutoGraph } from "react-icons/md";
import { FaFileCsv } from "react-icons/fa6";
import step2IMg from "../assets/startprocess.svg"
import step3IMg from "../assets/csvupload.svg"

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState("one");
  const stepRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setActiveStep(["one", "two", "three"][index]);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    stepRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      stepRefs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  return (
    <section>
      <div className="container">
        <div className="flex flex-col items-center justify-center pb-20 pt-28">
          <h1 className="text-2xl sm:text-6xl font-semibold text-center">
            How It Works – 3 Simple Steps
          </h1>
          <div className="py-20 flex flex-col-reverse sm:flex-row gap-10 justify-center px-2 sm:px-20 md:px-14">
            <div className="left w-full sm:w-1/2 h-96 flex items-center justify-center">
              {activeStep === "one" && (
                <div className="bg-blue-50 p-8 rounded-2xl shadow-lg flex flex-col items-center">
                  <div className="bg-white p-3 rounded-full shadow-lg border border-black">
                    <FaCirclePlay className="text-black text-8xl" />
                  </div>
                  <p className="text-lg text-blue-900 font-semibold mt-4">
                    Upload Your Pre-recorded Video
                  </p>
                  <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
                    <FaUpload /> Upload
                  </button>
                </div>
              )}
              {activeStep === "two" && <img src="step2.jpg" alt="Step 2" className="w-full h-auto" />}
              {activeStep === "three" && <img src="step3.jpg" alt="Step 3" className="w-full h-auto" />}
            </div>

            <div className="w-full sm:w-1/2 h-96 sm:p-6 flex flex-col justify-between pl-10">
              <div className="flex flex-col justify-between h-full">
                <div ref={stepRefs[0]} className="one p-4 rounded-lg">
                  <h1 className="text-lg font-bold text-[#002b7f]">Upload Your Video Template</h1>
                  <p className="text-sm text-gray-700">
                    Record a short, generic video for your outreach—no need to personalize each one manually.
                  </p>
                </div>
                <div ref={stepRefs[1]} className="two p-4 rounded-lg">
                  <h1 className="text-lg font-bold text-[#002b7f]">Upload Your Leads & Links</h1>
                  <p className="text-sm text-gray-700">
                    Loomify automatically scrolls your prospect’s website or link, stitching it with your pre-recorded video to make it look highly customized.
                  </p>
                </div>
                <div ref={stepRefs[2]} className="three p-4 rounded-lg">
                  <h1 className="text-lg font-bold text-[#002b7f]">AI-Generated Email Outreach</h1>
                  <p className="text-sm text-gray-700">
                    Loomify writes and sends personalized emails based on the video and the website content, ensuring higher engagement & response rates.
                  </p>
                </div>
              </div>

              <div className="absolute left-[-27px] top-0 py-10 flex flex-col items-center">
                <div className="relative flex flex-col justify-between items-center h-full">
                  <div className="absolute w-1 bg-[#025cff] h-full top-0 left-1/2 transform -translate-x-1/2"></div>

                  {["one", "two", "three"].map((step, index) => (
                    <div
                      key={step}
                      className={`relative z-10 transition-all duration-300 ease-in-out p-3 rounded-full border-3 text-blue-700 border-blue-700 flex items-center justify-center w-12 h-12 cursor-pointer ${
                        activeStep === step ? "bg-blue-700 text-white" : "bg-white"
                      }`}
                      onClick={() => setActiveStep(step)}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link to="/sign-up">
            <button className="mt-5 hover:border-blue-700 hover:text-black hover:bg-transparent border border-white bg-[#025cff] px-10 py-3 text-white rounded-3xl cursor-pointer font-semibold transition-all duration-300">
              Start for Free!
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
