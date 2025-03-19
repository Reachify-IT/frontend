import { useEffect, useState } from "react";
import axios from "axios";

export default function VideoPreference() {
  const [videoPreference, setVideoPreference] = useState("storeOnly");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Fetch Video Preference from Backend
  const getVideoPreference = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No access token found");

      const response = await axios.get(
        `${import.meta.env.VITE_BackendURL}/api/users/video-preference`,
        { headers: { Authorization: `${token}` } }
      );

      setVideoPreference(response.data.videoPreference || "storeOnly");
    } catch (error) {
      console.error("Error fetching video preference:", error);
      setMessage({ type: "error", text: "Failed to fetch video preference" });
    }
  };

  useEffect(() => {
    getVideoPreference();
  }, []);

  // ✅ Handle Preference Change
  const handleChange = (e) => {
    setVideoPreference(e.target.value);
  };

  // ✅ Update Video Preference
  const handleVideoPreferenceSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No access token found");

      const response = await axios.put(
        `${import.meta.env.VITE_BackendURL}/api/users/video-preference`,
        { videoPreference },
        { headers: { Authorization: `${token}` } }
      );

      setMessage({ type: "success", text: response.data.message });
    } catch (error) {
      console.error("Error updating video preference:", error);
      setMessage({ type: "error", text: "Failed to update video preference" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4">Video Preference</h2>

      <form onSubmit={handleVideoPreferenceSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col items-start gap-3">
          <label className="font-semibold text-lg">Select Your Video Preference:</label>

          {/* ✅ Replaced Select with Radio Buttons */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="videoPreference"
                value="storeOnly"
                checked={videoPreference === "storeOnly"}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-blue-800 font-medium">Store Only</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="videoPreference"
                value="instantMail"
                checked={videoPreference === "instantMail"}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-blue-800 font-medium">Instant Mail</span>
            </label>
          </div>
        </div>

        {/* ✅ Submit Button */}
        <button
          type="submit"
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Preference"}
        </button>
      </form>

      {/* ✅ Message Display */}
      {message && (
        <div className={`mt-4 text-center font-semibold ${
          message.type === "success" ? "text-green-600" : "text-red-600"
        }`}>
          {message.text}
        </div>
      )}
    </div>
  );
}
