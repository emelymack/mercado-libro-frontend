import { useEffect, useState } from "react";
import { getSalesByCategory } from "../../../services/InvoiceService";
import { SalesData } from "../../../types/chatsData";

const useSalesData = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await getSalesByCategory({
          page: 0,
          size: 10,
        });
        setSalesData(response.data);
      } catch (error) {
        console.error(
          "Error al obtener los datos de ventas por categoría:",
          error
        );
      }
    };

    fetchSalesData();
  }, []);

  return salesData;
};

export default useSalesData;
