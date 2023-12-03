import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options: ChartOptions<"bar"> = {
  indexAxis: "y",
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Quarterly Sales Data",
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem: TooltipItem<"bar">) {
          const label = tooltipItem.dataset.label ?? "Unknown";
          const value = tooltipItem.formattedValue ?? "0";
          return `${label}: ${value}`;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Quarters",
      },
      grid: {
        display: false,
      },
    },
    y: {
      title: {
        display: true,
        text: "Sales",
      },
    },
  },
  elements: {
    bar: {},
  },
};

export interface BarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  return <Bar options={options} data={data} />;
};

export default BarChart;
