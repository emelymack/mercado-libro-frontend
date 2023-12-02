import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface DoughnutSegmentedChartProps {
  data: ChartData<"doughnut">;
}

const DoughnutSegmentedChart: React.FC<DoughnutSegmentedChartProps> = ({
  data,
}) => {
  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 20,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: "Ventas por categoria",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.label + ": " + context.parsed;
          },
        },
      },
    },
    cutout: "50%",
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutSegmentedChart;
