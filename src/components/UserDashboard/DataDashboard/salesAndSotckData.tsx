import { useState, useEffect } from "react";
import { MonthlySales, MonthlyStock } from "../../../types/chatsData";
import {
  getMonthlySales,
  getMonthlyStock,
} from "../../../services/InvoiceService";

const salesAndSotckData = () => {
  const [salesMonthly, setSalesMonthly] = useState<MonthlySales[]>([]);
  const [stockMonthly, setStockMonthly] = useState<MonthlyStock[]>([]);
  useEffect(() => {
    const fetchSalesMonthly = async () => {
      try {
        const response = await getMonthlySales({
          page: 0,
          size: 10,
        });
        setSalesMonthly(response.data);
      } catch (error) {
        console.error("Error al obtener las ventas mensuales:", error);
      }
    };
    const fetchStockMonthly = async () => {
      try {
        const response = await getMonthlyStock({
          page: 0,
          size: 10,
        });
        setStockMonthly(response.data);
      } catch (error) {
        console.error("Error al obtener el stock mensual:", error);
      }
    };
    fetchSalesMonthly();
    fetchStockMonthly();
  }, []);
  return { salesMonthly, stockMonthly };
};

export default salesAndSotckData;
