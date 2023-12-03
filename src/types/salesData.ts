export interface SalesData {
  sales?: number;
  category_name?: string;
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
