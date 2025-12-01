import React from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function StatsGraph({ stats }) {
  // Example: stats is an array of objects with date and value
  // e.g. [{ date: '2025-12-01', workouts: 2 }, ...]
  const labels = stats ? stats.map(item => item.date) : []
  const data = {
    labels,
    datasets: [
      {
        label: "Workouts Completed",
        data: stats ? stats.map(item => item.workouts) : [],
        fill: false,
        borderColor: "#3b82f6", // Tailwind blue-500
        backgroundColor: "#3b82f6",
        tension: 0.3,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Workout Progress Over Time" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  }

  return <Line data={data} options={options} />
}
