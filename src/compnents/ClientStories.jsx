import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import star from "../assets/star.svg";

const testimonials = [
    {
        name: " Alex Morgan",
        position: " Sales Director,Austin, USA",
        message:
            "Before Loomify, our email outreach was getting ignored. Once we started using personalized video emails, our response rate TRIPLED in just 30 days. Now, every email feels like a direct, personal touch—without the manual work!",
        heading: "3X More Replies Without Extra Effort!",
    },
    {
        name: "Mark Joseph",
        position: "Founder, MJ Digital Agency, Sydney, Australia",
        message:
            "As an agency, we send hundreds of outreach emails daily. Recording individual videos wasn’t an option. Loomify allowed us to create a single template, auto-personalize it with prospect links, and send highly engaging outreach at scale!",
        heading:   "Finally, Scalable Personalized Outreach Without the Hassle!",
    },
    {
        name: "Jessica Rao",
        position: "B2B Consultant, Mumbai, India",
        message: "I run a B2B consulting business, and prospecting has always been time-consuming. With Loomify, my outreach became effortless. In just one week, I closed 5 deals from cold leads—something that used to take me months!",
        heading: "Loomify Helped Me Close 5 Deals in One Week!",
    },
    {
        name: " David Kingston",
        position: "CEO & Founder, GrowthTech, San Francisco, USA",
        message: "As a startup founder, I don’t have time to record a video for every lead. Loomify made it possible to automate my outreach while keeping it hyper-personalized. The first time I used it, I got 6 responses in a day!",
        heading:  "Game-Changer for Startup Founders Doing Sales Alone!",
    },
    {
        name: "Emily Sharma",
        position: "Business Development Manager, Bangalore, India",
        message: "Cold outreach used to feel robotic, and I hated spending hours crafting personalized emails. With Loomify, I send better outreach in half the time, and my reply rate has doubled. This tool is a must-have!",
        heading: "Higher Response Rates, More Conversations, and Less Work!",
    },
    {
        name: "Michael Brown",
        position: "Growth Marketer, Melbourne, Australia",
        message:"We ran an A/B test between our standard email outreach and Loomify-powered emails. The results? Our response rate jumped from 2% to 18%! This is by far the easiest and most effective outreach tool I’ve used.",
        heading: "From 2% to 18% Response Rate—A Total Transformation!",
    },
];

export default function ClientStories() {
    const [slideIndex, setSlideIndex] = useState(0);

    const nextSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setSlideIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    // Get the 3 testimonials to show at a time
    const getVisibleSlides = () => {
        let slidesToShow = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 2;
        return Array.from({ length: slidesToShow }, (_, i) =>
            testimonials[(slideIndex + i) % testimonials.length]
        );
    };

    return (
        <>
            <h2 className="text-center text-6xl font-semibold mb-6 w-full">
                Success Stories – What Our Users Say
            </h2>
            <div className="relative w-full max-w-4xl mx-auto px-5 sm:px-0">

                {/* Testimonial Container */}
                <div className="relative flex justify-center items-center gap-4 overflow-hidden py-16">
                    {getVisibleSlides().map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-blue-100 hover:bg-blue-200 transition-all duration-300 ease-in-out border border-white/30 shadow-lg backdrop-blur-md justify-center rounded-3xl p-6  flex flex-col items-center text-center gap-3 w-96 h-80"
                        >
                            <div>

                                <div className="flex gap-1 mb-2 items-center justify-center">
                                    {[...Array(5)].map((_, i) => (
                                        <img key={i} src={star} alt="star" className="h-9 w-9" />
                                    ))}
                                </div>
                                <h1 className="text-lg font-semibold text-[#002b7f] py-2">
                                    {testimonial.heading.split(" ").slice(0, 4).join(" ")}
                                    {testimonial.heading.split(" ").length > 4 && "..."}
                                    </h1>


                            </div>
                            <div>
                                <p className="text-sm text-center py-2 h-28">
                                    {testimonial.message.split(" ").slice(0, 26).join(" ")}
                                    {testimonial.message.split(" ").length > 26 && "..."}
                                </p>
                                <p className="text-md font-normal text-blue-900"><span className="mr-1 border-t w-3 h-1 inline-block"></span>{testimonial.name}
                                 {testimonial.position.split(" ").slice(0, 3).join(" ")}
                                 {testimonial.heading.split(" ").length > 3 && "..."}
                                 </p>
                            </div>

                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <button
                    className="absolute left-2 lg:-left-20 top-1/2 transform -translate-y-1/2 bg-blue-700 p-3 rounded-full shadow-md hover:bg-blue-400 transition"
                    onClick={prevSlide}
                >
                    <ChevronLeft className="h-6 w-6 text-white" />
                </button>

                <button
                    className="absolute right-2 lg:-right-20 top-1/2 transform -translate-y-1/2 bg-blue-700 p-3 rounded-full shadow-md hover:bg-blue-400 transition"
                    onClick={nextSlide}
                >
                    <ChevronRight className="h-6 w-6 text-white" />
                </button>
            </div>
        </>
    );
}
