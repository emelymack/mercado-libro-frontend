import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import BarChart from "../Charts/BarChart";
import LineChart from "../Charts/LineChart";
import BarChartHorizontal from "../Charts/BartChartHorizontal";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import DoughnutSegmentedChart from "../Charts/DoughnutSegmentedChart";
import StatCard from "../Charts/StatCard";
import { Navigate } from "react-router-dom";
import useDashboardData from "./DataDashboard/useDashboardData";
import { useAppSelector } from "../../context/hooks";
import { inventoryData, months, salesDataLine } from "./DataDashboard/mockData";
import useSalesData from "./DataDashboard/useSalesData";
import paymentTypeData from "./DataDashboard/paymentTypeData";
import useBooksByAuthorData from "./DataDashboard/useBooksByAuthorData";
import { useEffect, useState } from "react";
import { BarData, DoughnutData } from "../../types/chatsData";

const dataLine = {
  labels: salesDataLine.content.map(
    (item) => `${months[item.month - 1]} ${item.year}`
  ),
  datasets: [
    {
      label: "Ventas",
      data: salesDataLine.content.map((item) => item.sales),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      pointRadius: 5,
      pointHoverRadius: 8,
      fill: false,
    },
    {
      label: "Inventario",
      data: inventoryData.content.map((item) => item.inventory),
      borderColor: "rgb(54, 162, 235)",
      backgroundColor: "rgba(54, 162, 235, 0.5)",
      pointRadius: 5,
      pointHoverRadius: 8,
      fill: false,
    },
  ],
};

const chartSize = "600px";

const ChartDashboard = () => {
  const { totalUsers, totalBooks, totalCategories, totalSales } =
    useDashboardData();
  const { name, lastName } = useAppSelector((state) => state.user);
  const paymentDataLine = paymentTypeData();
  const salesDataDonut = useSalesData();
  const booksByAuthor = useBooksByAuthorData();
  const maxBooks =
    Math.max(...booksByAuthor.map((item) => item.total_books)) + 10;
  const [barData, setBarData] = useState<BarData>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "",
      },
    ],
  });
  const [dataForDoughnut, setDataForDoughnut] = useState<DoughnutData>({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  const [barHorizontalData, setBarHorizontalData] = useState<BarData>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "",
      },
    ],
  });

  useEffect(() => {
    if (salesDataDonut) {
      const filteredSalesData = salesDataDonut.filter(
        (item) => item.sales !== undefined && item.category_name !== undefined
      );

      setDataForDoughnut({
        labels: filteredSalesData.map((item) => item.category_name!),
        datasets: [
          {
            data: filteredSalesData.map((item) => item.sales!),
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(75, 192, 192, 0.5)",
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [salesDataDonut]);

  useEffect(() => {
    if (paymentDataLine && paymentDataLine.length > 0) {
      const dataBar = {
        labels: ["Tipo de pago"],
        datasets: paymentDataLine.map((item) => {
          return {
            label: item.payment_type || "",
            data: [item.sales || 0],
            backgroundColor:
              item.payment_type === "MERCADO_PAGO"
                ? "rgba(54, 162, 235, 0.5)"
                : "rgba(255, 99, 132, 0.5)",
          };
        }),
      };

      setBarData(dataBar);
    }
  }, [paymentDataLine]);

  useEffect(() => {
    if (booksByAuthor && booksByAuthor.length > 0) {
      const colors = booksByAuthor.map(
        () =>
          `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
            Math.random() * 255
          }, 0.5)`
      );

      const dataBarHorizontal = {
        labels: ["Libros"],
        datasets: booksByAuthor.map((item, index) => {
          return {
            label: item.author || "",
            data: [item.total_books || 0],
            backgroundColor: colors[index],
          };
        }),
      };
      setBarHorizontalData(dataBarHorizontal);
    }
  }, [booksByAuthor]);

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
              <StatCard
                title="Ventas"
                value={totalSales}
                max={totalSales + 100}
              />
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
                <BarChart data={barData} />
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
                <BarChartHorizontal data={barHorizontalData} />
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
