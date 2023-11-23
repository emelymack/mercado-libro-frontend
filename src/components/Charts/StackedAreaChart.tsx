import React from "react";
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
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";

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
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Media Data",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Quarter",
      },
    },
    y: {
      stacked: true,
      title: {
        display: true,
        text: "Value",
      },
    },
  },
  elements: {
    line: {
      tension: 0.3, // Smooth curves
      fill: true, // Fill area under the lines
    },
    point: {
      radius: 0, // Hide points
    },
  },
};

export interface StackedAreaChartProps {
  data: ChartData<"line">;
}

const StackedAreaChart: React.FC<StackedAreaChartProps> = ({ data }) => {
  return <Line options={options} data={data} />;
};

export default StackedAreaChart;
