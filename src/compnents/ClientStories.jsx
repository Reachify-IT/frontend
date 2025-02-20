import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import star from "../assets/star.svg";

const testimonials = [
    {
        name: "Jane Austen",
        position: "CEO, XYZ Company",
        message:
            "We prioritize size inclusivity. Whether your business is a budding startup or an established company, we're here to supercharge your business strategies! We prioritize size inclusivity. Whether your business is a budding startup or an established company, we're here to supercharge your business strategies!We prioritize size inclusivity. Whether your business is a budding startup or an established company, we're here to supercharge your business strategies!We prioritize size inclusivity. Whether your business is a budding startup or an established company, we're here to supercharge your business strategies!We prioritize size inclusivity. Whether your business is a budding startup or an established company, we're here to supercharge your business strategies!",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "John Doe",
        position: "Founder, ABC Ltd",
        message:
            "Their services have transformed our business. The team’s expertise is unmatched!",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
        name: "Emily Smith",
        position: "Marketing Head, DEF Inc.",
        message: "Working with this team has been a game-changer for our growth!",
        image: "https://randomuser.me/api/portraits/women/50.jpg",
    },
    {
        name: "Michael Brown",
        position: "CTO, GHI Corp",
        message: "Amazing service! Helped us scale like never before.",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Sarah Williams",
        position: "Product Manager, JKL Ltd.",
        message: "Highly recommend their team! They exceeded our expectations.",
        image: "https://randomuser.me/api/portraits/women/60.jpg",
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
        let slidesToShow = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
        return Array.from({ length: slidesToShow }, (_, i) =>
            testimonials[(slideIndex + i) % testimonials.length]
        );
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto px-5 sm:px-0">
            <h2 className="text-center text-3xl font-semibold mb-6">
                What Our Clients Say
            </h2>

            {/* Testimonial Container */}
            <div className="relative flex justify-center gap-4 overflow-hidden py-16">
                {getVisibleSlides().map((testimonial, index) => (
                    <div
                        key={index}
                        className="bg-blue-100 hover:bg-blue-200 transition-all duration-300 ease-in-out border border-white/30 shadow-lg backdrop-blur-md justify-between rounded-3xl p-6  flex flex-col items-start text-start gap-3 w-96 h-80"
                    >
                        <div>
                            <div className="flex gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <img key={i} src={star} alt="star" className="h-4 w-4" />
                                ))}
                            </div>
                            <p className="text-sm text-start">
                                {testimonial.message.split(" ").slice(0, 26).join(" ")}
                                {testimonial.message.split(" ").length > 26 && "..."}
                            </p>

                        </div>
                        <div>
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="h-16 w-16 object-cover rounded-full mt-4"
                            />
                            <h3 className="mt-2 font-semibold text-lg">{testimonial.name}</h3>
                            <p className="text-xs font-light">{testimonial.position}</p>
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
    );
}
