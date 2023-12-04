import { months } from "../components/UserDashboard/DataDashboard/mockData";
export interface SalesData {
  sales?: number;
  category_name?: string;
}

export interface PaymentTypeData {
  sales?: number;
  payment_type?: string;
}

export interface SalesByCategoryData {
  sales?: number;
  category_name?: string;
}

export interface BooksByAuthorData {
  total_books?: number;
  author?: string;
}

export interface MonthlySales {
  year?: number;
  month?: number;
  sales?: number;
}

export interface MonthlyStock {
  year?: number;
  month?: string;
  stock?: number;
}

export interface DoughnutData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

export interface BarData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

export interface LineData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    pointRadius: number;
    pointHoverRadius: number;
    fill: boolean;
  }[];
}
