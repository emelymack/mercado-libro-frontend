import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import BarChart from "../Charts/BarChart";
import LineChart from "../Charts/LineChart";
import StackedAreaChart from "../Charts/StackedAreaChart";

import DoughnutSegmentedChart from "../Charts/DoughnutSegmentedChart";
import StatCard from "../Charts/StatCard";
import { Navigate } from "react-router-dom";

const dataBar = {
  labels: ["Libro 1", "Libro 2", "Libro 3", "Libro 4", "Libro 5"],
  datasets: [
    {
      label: "Ventas",
      data: [65, 59, 80, 81, 56],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Inventario",
      data: [45, 49, 60, 70, 46],
      backgroundColor: "rgba(54, 162, 235, 0.5)",
    },
  ],
};
const dataLine = {
  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
  datasets: [
    {
      label: "Ventas",
      data: [20, 59, 80, 81, 56],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      pointRadius: 5,
      pointHoverRadius: 8,
      fill: false,
    },
    {
      label: "Inventario",
      data: [10, 48, 40, 19, 86],
      borderColor: "rgb(54, 162, 235)",
      backgroundColor: "rgba(54, 162, 235, 0.5)",
      pointRadius: 5,
      pointHoverRadius: 8,
      fill: false,
    },
  ],
};
const dataAreas = {
  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
  datasets: [
    {
      label: "Ventas",
      data: [65, 59, 80, 81, 56],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      pointBackgroundColor: "rgba(255, 99, 132, 1)",
    },
    {
      label: "Inventario",
      data: [28, 48, 40, 19, 86],
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      pointBackgroundColor: "rgba(54, 162, 235, 1)",
    },
  ],
};

const dataForDoughnut = {
  labels: ["Libro 1", "Libro 2", "Libro 3"],
  datasets: [
    {
      data: [10, 20, 30],
      backgroundColor: [
        "rgba(75, 192, 192, 0.2)",
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.2)",
      ],
      borderColor: [
        "rgba(75, 192, 192, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const chartSize = "400px";

const ChartDashboard: React.FC = () => {
  const isAdmin = localStorage.getItem("isLoggedAdmin") === "true";

  if (!isAdmin) {
    return <Navigate to="*" />;
  }

  return (
    <>
      <Flex direction="column" minHeight="100vh">
        <Box p={5} pt={40}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5} mb={5}>
            <StatCard title="Clicks" value={1213} max={5000} />
            <StatCard title="Views" value={422} max={5000} />
            <StatCard title="Leads" value={31} max={5000} />
            <StatCard title="Sales" value={22} max={5000} />
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={5} mb={5}>
            <Box
              p={5}
              boxShadow="xl"
              borderRadius="lg"
              h={chartSize}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <DoughnutSegmentedChart data={dataForDoughnut} />
            </Box>
            <Box
              p={5}
              boxShadow="xl"
              borderRadius="lg"
              h={chartSize}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <LineChart data={dataLine} />
            </Box>
            <Box
              p={5}
              boxShadow="xl"
              borderRadius="lg"
              h={chartSize}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <BarChart data={dataBar} />
            </Box>
            <Box
              p={5}
              boxShadow="xl"
              borderRadius="lg"
              h={chartSize}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StackedAreaChart data={dataAreas} />
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>
    </>
  );
};

export default ChartDashboard;
