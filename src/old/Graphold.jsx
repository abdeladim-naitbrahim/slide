import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Enregistrement des composants nécessaires de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Graph({ a, b }) {
  const xValues = Array.from({ length: 11 }, (_, i) => i - 5);  // x = [-5, -4, ..., 5]
  const yValues = xValues.map(x => a * x + b);

  const data = {
    labels: xValues,
    datasets: [
      {
        label: `y = ${a}x + ${b}`,
        data: yValues,
        borderColor: "blue",
        fill: false,
        tension: 0.1
      }
    ]
  };

  return <Line data={data} />;
}
