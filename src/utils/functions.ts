import { CartItem } from "../types/product";

// obtener fecha en formato DD/MM/YYYY
export function formatDateDDMMYYYY(dateString: string) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Formatear el día y el mes para que tengan dos dígitos
  const formattedDay = day.toString().padStart(2, '0');
  const formattedMonth = month.toString().padStart(2, '0');

  // Crear la cadena de fecha en el formato deseado
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

  return formattedDate;
}

// obtener fecha en formato mes/YYYY
export function formatDateMonthYYYY(date: string) {
  // Crear un objeto Date a partir de la cadena de fecha
  const dateObject = new Date(date);

  // Crear un array con los nombres de los meses
  const monthNames = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ];

  // Obtener el mes y el año de la fecha
  const month = monthNames[dateObject.getMonth()];
  const year = dateObject.getFullYear();

  // Crear la cadena de fecha en el formato deseado
  const formattedDate = `${month} ${year}`;

  return formattedDate;
}

// buscar en Google
export const googleSearch = (str: string) => {
  const searchStr = str.split(' ').join('+')
  return `https://www.google.com/search?q=${searchStr}`
}