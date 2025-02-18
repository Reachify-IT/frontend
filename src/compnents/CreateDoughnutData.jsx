import React from "react";
import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend, Title);

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "hsl(var(--chart-1))" },
  safari: { label: "Safari", color: "hsl(var(--chart-2))" },
  firefox: { label: "Firefox", color: "hsl(var(--chart-3))" },
  edge: { label: "Edge", color: "hsl(var(--chart-4))" },
  other: { label: "Other", color: "hsl(var(--chart-5))" },
};

const data = {
  labels: ["Processed", "Pending"],
  datasets: [
    {
      data: [60, 40],
      backgroundColor: ["rgb(255, 5, 5)", "rgb(0, 123, 255)"],
      borderWidth: 0,
      radius: '70%'   
    },
  ],
};

const options = {
  cutout: "70%", // Adjusts the thickness of the Doughnut chart
  plugins: {
    legend: {
      display: false, // Hide legend
    },
    tooltip: {
      enabled: true, // Show tooltips on hover
    },
  },
};

function CreateDoughnutData() {
  return (
    <div style={{ padding:"0", height:"200px", margin: "0", textAlign: "center" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default CreateDoughnutData;
