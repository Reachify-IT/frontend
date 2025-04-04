import React from "react";
import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

Chart.register(ArcElement, Tooltip, Legend, Title);

const CreateDoughnutData = () => {
  const mailCount = useSelector((state) => state.mailCount?.data);
  const user = useSelector((state) => state.user?.user);
  const currPlan = user?.planDetails || "Trial"; // Default to "Trial" if undefined

  console.log("Current Plan:", currPlan);
  console.log("Mail Count:", mailCount);

  // Ensure mailCount exists and has valid values
  const successMails = mailCount?.successMails ?? 0; // Default to 0 if undefined
  const pendingMails = {
    Trial: 30,
    Starter: 2000,
    Pro: 5000,
    Enterprise: 10000,
  };

  console.log("Success Mails:", successMails);
  console.log("Pending Mails:", pendingMails[currPlan]);

  // If the processed mail count is very small, ensure it is visible
  const processed = Math.max(successMails, 1); // Ensure a minimum of 1 for visibility
  const pending = Math.max(pendingMails[currPlan] - successMails, 0); // Prevent negative values

  // Generate chart data dynamically
  const data = {
    labels: ["Processed", "Pending"],
    datasets: [
      {
        data: [processed, pending], // Adjusted values to ensure visibility
        backgroundColor: ["rgb(0, 102, 204)", "rgb(0, 153, 255)"],
        borderWidth: 0,
        radius: "80%",
      },
    ],
  };


  const options = {
    cutout: "70%", // Adjust thickness of Doughnut chart
    plugins: {
      legend: { display: false }, // Hide legend
      tooltip: { enabled: true }, // Show tooltips on hover
    },
  };

  return (
    <div style={{ padding: "0", height: "200px", margin: "0", textAlign: "center" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default CreateDoughnutData;
