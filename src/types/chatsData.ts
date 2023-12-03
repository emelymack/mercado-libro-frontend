export interface SalesData {
  sales?: number;
  category_name?: string;
}

export interface PaymentTypeData {
  sales?: number;
  payment_type?: string;
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
