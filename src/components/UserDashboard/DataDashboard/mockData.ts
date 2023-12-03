// Armar graficas de dona
export const mockDataDonut = {
  content: [
    { sales: 5, category_name: "Novela" },
    { sales: 3, category_name: "Ficción" },
    { sales: 8, category_name: "Literatura" },
    { sales: 10, category_name: "Infantil" },
    { sales: 2, category_name: "Misterio" },
    { sales: 3, category_name: "Salud y bienestar" },
    { sales: 1, category_name: "Filosofia" },
    { sales: 20, category_name: "Cómic" },
    { sales: 11, category_name: "Biografia" },
  ],
  totalPages: 3,
  totalElements: 3,
  currentPage: 0,
  pageSize: 1,
};

//Armar graficas lineales
export const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const salesDataLine = {
  content: [
    { year: 2023, month: 1, sales: 5 },
    { year: 2023, month: 12, sales: 5 },
    { year: 2023, month: 11, sales: 3 },
    { year: 2022, month: 9, sales: 10 },
    { year: 2021, month: 10, sales: 8 },
  ],
  totalPages: 5,
  totalElements: 5,
  currentPage: 0,
  pageSize: 1,
};

export const inventoryData = {
  content: [
    { year: 2023, month: 1, inventory: 12 },
    { year: 2023, month: 12, inventory: 7 },
    { year: 2023, month: 11, inventory: 4 },
    { year: 2022, month: 9, inventory: 12 },
    { year: 2021, month: 10, inventory: 9 },
  ],
};

//Armar graficas de barras

export const paymentTypeData = {
  content: [
    {
      payment_type: "Tarjeta de crédito",
      sales: 40,
    },
    {
      payment_type: "Transferencia bancaria",
      sales: 15,
    },
  ],
  totalPages: 1,
  totalElements: 4,
  currentPage: 0,
  pageSize: 10,
};
