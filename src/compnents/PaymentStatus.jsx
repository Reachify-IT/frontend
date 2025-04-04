import  { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function PaymentStatus() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [status, setStatus] = useState("Checking...");

  console.log("🚀 orderId", orderId);

  useEffect(() => {
    if (!orderId) {
      setStatus("Invalid request. No Order ID found.");
      return;
    }
  
    axios
      .get(`${import.meta.env.VITE_BackendURL}/api/payments/status/${orderId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("accessToken")}`, // ✅ Removed extra space and added "Bearer"
        },
      })
      .then((res) => setStatus(res.data.status)) // ✅ Fixed incorrect comma
      .catch(() => setStatus("Failed"));
  }, [orderId]);
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Payment Status
        </h2>
        <p className="mt-2 text-center text-gray-600">Order ID: <span className="font-medium text-gray-900">{orderId}</span></p>
        <div className="mt-4 flex justify-center">
          <span
            className={`px-4 py-2 text-lg font-medium rounded-lg 
            ${
              status === "SUCCESS"
                ? "bg-green-100 text-green-600"
                : status === "ACTIVE"
                ? "bg-red-100 text-yellow-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {status}
          </span>
        </div>
      </div>
      <div>
        <Link to="/home">
        <button
          className="mt-4 px-4 py-2 text-lg font-medium underline  text-red-500 cursor-pointer"
        >
          Go to Home
        </button>
        </Link>
      </div>
    </div>
  );
}
