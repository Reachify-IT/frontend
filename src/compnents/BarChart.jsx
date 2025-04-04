import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import axios from "axios";
import { useEffect, useState } from "react";

// Register necessary ChartJS components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController
);

const BarChart = () => {
  const [monthlyVideos, setMonthlyVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserInfo = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No access token found");

      const response = await axios.get(`${import.meta.env.VITE_BackendURL}/api/auth/me`, {
        headers: { Authorization: `${token}` },
      });

      console.log("🚀 Monthly Videos:", response.data.monthlyVideos);
      setMonthlyVideos(response.data.monthlyVideos);
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // Convert month number to month name
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];

  // Create a default object with 0 values for all months
  const defaultData = Array(12).fill(0);

  // Populate the data array based on the API response
  monthlyVideos.forEach((item) => {
    defaultData[item.month - 1] = item.totalVideos; // Adjust month index
  });

  const data = {
    labels: monthNames,
    datasets: [
      {
        label: "Monthly Video Uploads",
        backgroundColor: "rgb(255, 101, 98)",
        hoverBackgroundColor: "rgb(255, 0, 0)",
        borderRadius: 10,
        data: defaultData, // Use the modified array with 0 for missing months
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-full">
      {isLoading ? <p>Loading...</p> : <Bar data={data} options={options} />}
    </div>
  );
};

export default BarChart;
