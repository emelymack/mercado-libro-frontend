import { useState, useEffect } from "react";
import { BooksByAuthorData } from "../../../types/chatsData";
import { getBooksByAuthor } from "../../../services/InvoiceService";

const useBooksByAuthorData = () => {
  const [booksByAuthor, setBooksByAuthor] = useState<BooksByAuthorData[]>([]);

  useEffect(() => {
    const fetchBooksByAuthor = async () => {
      debugger;
      try {
        const response = await getBooksByAuthor({
          page: 0,
          size: 10,
        });
        setBooksByAuthor(response.data);
      } catch (error) {
        console.error("Error al obtener los libros por autor:", error);
      }
    };

    fetchBooksByAuthor();
  }, []);

  return booksByAuthor;
};

export default useBooksByAuthorData;
