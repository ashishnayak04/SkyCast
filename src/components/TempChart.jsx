import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from "chart.js";
import { celsiusToFahrenheit, formatHour } from "../utils/weatherUtils";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const TempChart = ({ forecast, unit }) => {
  const next24 = forecast.list.slice(0, 8);
  const labels = next24.map((i) => formatHour(i.dt_txt));
  const temps = next24.map((i) => unit === "C" ? Math.round(i.main.temp) : celsiusToFahrenheit(i.main.temp));

  const data = {
    labels,
    datasets: [{
      label: `Temp (°${unit})`,
      data: temps,
      fill: true,
      borderColor: "rgba(255,255,255,0.8)",
      backgroundColor: "rgba(255,255,255,0.1)",
      pointBackgroundColor: "white",
      pointRadius: 4,
      tension: 0.4,
    }],
  };

  const options = {
  responsive: true,
  maintainAspectRatio: false, // 🔥 THIS is the key fix
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: { label: (c) => `${c.raw}°${unit}` }
    }
  },
  scales: {
    x: {
      ticks: { color: "rgba(255,255,255,0.7)", font: { size: 11 } },
      grid: { color: "rgba(255,255,255,0.1)" }
    },
    y: {
      ticks: {
        color: "rgba(255,255,255,0.7)",
        font: { size: 11 },
        callback: (v) => `${v}°`
      },
      grid: { color: "rgba(255,255,255,0.1)" }
    }
  }
};

  return (
    <div className="bg-white/20 dark:bg-slate-800/40 backdrop-blur-xl border border-white/40 dark:border-slate-600 rounded-3xl p-6 text-white dark:text-slate-100 shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
      <h3 className="text-sm font-semibold tracking-wide text-white/80 dark:text-slate-400 uppercase mb-6">Next 24 hours</h3>
      <div className="relative h-48 w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default TempChart;
