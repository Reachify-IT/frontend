import axios from "axios";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });
  const [loading, setLoading] = useState(false); // State to track submission

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("accessToken");
  
    if (!formData.name || !formData.email || !formData.description || rating === 0) {
      toast.error("Please fill all fields and provide a rating!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
  
    const feedbackData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      description: formData.description.trim(),
      rating,
    };
  
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BackendURL}/api/feedback/submit`,
        feedbackData, // This should be the second argument
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`, // Added "Bearer" for better security
          },
        }
      );
  
      console.log("Response:", response.data);
      toast.success("Feedback submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  
      // Reset form
      setFormData({ name: "", email: "", description: "" });
      setRating(0);
      setHover(0);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl p-6 w-[400px] space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700">Feedback Form</h2>

        {/* Name Field */}
        <div className="flex flex-col">
          <label htmlFor="name" className="font-semibold pl-5">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="border-2 border-blue-700 rounded-2xl px-4 py-2 focus:outline-none"
            required
          />
        </div>

        {/* Email Field */}
        <div className="flex flex-col">
          <label htmlFor="email" className="font-semibold pl-5">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="border-2 border-blue-700 rounded-2xl px-4 py-2 focus:outline-none"
            required
          />
        </div>

        {/* Description Field */}
        <div className="flex flex-col">
          <label htmlFor="description" className="font-semibold pl-5">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write your feedback..."
            rows="3"
            className="border-2 border-blue-700 rounded-2xl px-4 py-2 focus:outline-none resize-none"
            required
          />
        </div>

        {/* Star Rating */}
        <div className="flex items-center justify-center gap-10">
          <label className="font-semibold">Rating:</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer text-2xl ${
                  star <= (hover || rating) ? "text-yellow-500" : "text-gray-400"
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition-all cursor-pointer disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
}

export default FeedbackForm;
