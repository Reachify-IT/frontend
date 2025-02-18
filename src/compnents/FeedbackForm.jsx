import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback Submitted:", { ...formData, rating });
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
          <label htmlFor="name" className="font-semibold">Name</label>
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
          <label htmlFor="email" className="font-semibold">Email</label>
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
          <label htmlFor="description" className="font-semibold">Description</label>
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
          className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition-all cursor-pointer"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default FeedbackForm;
