import { useState, useEffect } from "react";
import { getAllUsers } from "../../../services/UserService";
import { getAllBooksSearch } from "../../../services/SearchServiceBook";
import { getAllCategories } from "../../../services/CategoryService";
import { getAllInvoices } from "../../../services/InvoiceService";

type DashboardData = {
  totalUsers: number;
  totalBooks: number;
  totalCategories: number;
  totalSales: number;
};

const useDashboardData = (): DashboardData => {
  const [data, setData] = useState<DashboardData>({
    totalUsers: 0,
    totalBooks: 0,
    totalCategories: 0,
    totalSales: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          usersResponse,
          booksResponse,
          salesResponse,
          categoriesResponse,
        ] = await Promise.all([
          getAllUsers({ page: 0, size: 1 }),
          getAllBooksSearch({ page: 0, size: 1 }),
          getAllInvoices({ page: 0, size: 1 }),
          getAllCategories(),
        ]);

        setData({
          totalUsers: usersResponse.totalElements || 0,
          totalBooks: booksResponse.totalElements || 0,
          totalCategories: categoriesResponse.length || 0,
          totalSales: salesResponse.totalElements || 0,
        });
      } catch (error) {
        console.error("Error al obtener los datos del dashboard:", error);
      }
    };

    fetchData();
  }, []);

  return data;
};

export default useDashboardData;
