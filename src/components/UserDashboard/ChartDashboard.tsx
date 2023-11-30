import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import BarChart from "../Charts/BarChart";
import LineChart from "../Charts/LineChart";
import StackedAreaChart from "../Charts/StackedAreaChart";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import DoughnutSegmentedChart from "../Charts/DoughnutSegmentedChart";
import StatCard from "../Charts/StatCard";
import { Navigate } from "react-router-dom";
import useDashboardData from "./DataDashboard/useDashboardData";
import { useAppSelector } from "../../context/hooks";

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

const ChartDashboard = () => {
  const { totalUsers, totalBooks, totalCategories } = useDashboardData();
  const { name, lastName } = useAppSelector((state) => state.user);
  const date = new Date();
  const isAdmin = localStorage.getItem("isLoggedAdmin") === "true";

  if (!isAdmin) {
    return <Navigate to="*" />;
  }

  const exportToPDF = async () => {
    const dashboardElement = document.getElementById(
      "dashboard"
    ) as HTMLElement;

    if (dashboardElement) {
      const charts = Array.from(
        dashboardElement.querySelectorAll(".chart") as NodeListOf<HTMLElement>
      );
      const originalSizes = charts.map((chart) => {
        const originalSize = {
          width: chart.style.width,
          height: chart.style.height,
        };
        chart.style.width = "400px";
        chart.style.height = "300px";
        return originalSize;
      });

      dashboardElement.style.width = "1920px";
      dashboardElement.style.height = "auto";
      dashboardElement.style.overflow = "visible";

      const canvas = await html2canvas(dashboardElement, {
        scale: 1,
        useCORS: true,
      });

      charts.forEach((chart, index) => {
        chart.style.width = originalSizes[index].width;
        chart.style.height = originalSizes[index].height;
      });

      dashboardElement.style.width = "";
      dashboardElement.style.height = "";
      dashboardElement.style.overflow = "";

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "letter",
      });

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdf.internal.pageSize.getWidth(),
        pdf.internal.pageSize.getHeight()
      );

      charts.forEach((chart, index) => {
        chart.style.width = originalSizes[index].width;
        chart.style.height = originalSizes[index].height;
      });

      const date = new Date();
      const dateString = date.toISOString().replace(/[:.]/g, "-");

      pdf.save(`Dashboard-${dateString}.pdf`);
    }
  };

  return (
    <>
      <div id="dashboard">
        <Flex direction="column">
          <Box p={{ base: 3, md: 5 }} pt={{ base: 20, md: 40 }}>
            <Text
              fontSize={{ base: "xl", md: "3xl" }}
              fontWeight="bold"
              textAlign="center"
            >
              Información general Mercado Libro
            </Text>
            <SimpleGrid
              pt={5}
              columns={{ base: 1, md: 2, lg: 4 }}
              spacing={5}
              mb={5}
            >
              <StatCard
                title="Usuarios"
                value={totalUsers}
                max={totalUsers + 100}
              />
              <StatCard
                title="Libros"
                value={totalBooks}
                max={totalBooks + 100}
              />
              <StatCard
                title="Categorias"
                value={totalCategories}
                max={totalCategories + 100}
              />
              <StatCard title="Sales" value={22} max={1000} />
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
            <Box width="100%" p="2">
              <Text fontSize="sm">Usuario actual: {name + " " + lastName}</Text>
              <Text fontSize="sm">
                Fecha y hora actual: {date.toLocaleDateString()}{" "}
                {date.toLocaleTimeString()}
              </Text>
            </Box>
          </Box>
        </Flex>
      </div>
      <Button
        onClick={exportToPDF}
        colorScheme="blue"
        size={{ base: "sm", md: "md", lg: "lg" }}
        m={5}
      >
        Exportar a PDF
      </Button>
    </>
  );
};

export default ChartDashboard;
