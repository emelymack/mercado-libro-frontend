import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options: ChartOptions<"line"> = {
  maintainAspectRatio: false,
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  plugins: {
    title: {
      display: true,
      text: "Ventas por mes y inventario",
    },
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return context.dataset.label + ": " + context.parsed.y;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Time",
      },
      grid: {
        display: false,
      },
    },
    y: {
      title: {
        display: true,
        text: "Value",
      },
    },
  },
  elements: {
    line: {
      tension: 0.4,
      borderWidth: 3,
      fill: true,
    },
    point: {
      radius: 6,
    },
  },
};

export interface LineChartProps {
  data: ChartData<"line">;
}

export const LineChart: React.FC<LineChartProps> = ({ data }) => {
  return <Line options={options} data={data} />;
};

export default LineChart;
