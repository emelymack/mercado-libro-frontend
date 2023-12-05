import { useState, useEffect } from "react";
import { PaymentTypeData } from "../../../types/chatsData";
import { getSalesCountByPayment } from "../../../services/InvoiceService";

const paymentTypeData = () => {
  const [salesData, setSalesData] = useState<PaymentTypeData[]>([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await getSalesCountByPayment({
          page: 0,
          size: 10,
        });
        setSalesData(response.data);
      } catch (error) {
        console.error(
          "Error al obtener los datos de ventas por tipo de pago:",
          error
        );
      }
    };

    fetchSalesData();
  }, []);

  return salesData;
};

export default paymentTypeData;
