import { useState, useEffect } from "react";
import { getAllUsers } from "../../../services/UserService";
import { getAllBooksSearch } from "../../../services/SearchServiceBook";
import { getAllCategories } from "../../../services/CategoryService";

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
        const usersResponse = await getAllUsers({ page: 0, size: 10 }); // Ajusta los parámetros según tus necesidades
        const booksResponse = await getAllBooksSearch({ page: 0 });
        const categoriesResponse = await getAllCategories();

        setData((prevData) => ({
          ...prevData,
          totalUsers: usersResponse.totalElements ?? prevData.totalUsers,
          totalBooks: booksResponse.totalElements ?? prevData.totalBooks,
          totalCategories: categoriesResponse.length,
          // totalSales: salesResponse.totalElements ?? prevData.totalSales,
        }));
      } catch (error) {
        console.error("Error al obtener los datos del dashboard:", error);
      }
    };

    fetchData();
  }, []);

  return data;
};

export default useDashboardData;
