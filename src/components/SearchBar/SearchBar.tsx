import { useState } from "react";
import { Button, Image, Input } from "@chakra-ui/react";
import searchIcon from "../../assets/icons/icon-search.svg";
import { Book } from "../../services/BookService";
import { getAllBooksSearch } from "../../services/SearchServiceBook";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [isInputVisible, setInputVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<Book[]>([]);

  const history = useNavigate();

  const handleClick = async () => {
    setInputVisible(!isInputVisible);
    if (searchTerm !== "") {
      try {
        const response = await getAllBooksSearch({
          keyword: searchTerm,
          page: 0,
        });
        setBooks(response.data);
        if (response.data.length > 0) {
          history(`/books/search/${searchTerm}`);
        }
      } catch (error) {
        console.error("Error al buscar libros:", error);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      {isInputVisible && (
        <Input
          placeholder="Buscar por titulo o categoria..."
          value={searchTerm}
          onChange={handleInputChange}
        />
      )}

      <Button
        bg={"none"}
        px={{ base: 2, md: 3 }}
        className="headerBtn"
        onClick={handleClick}
      >
        <Image
          src={searchIcon}
          boxSize={{ base: "50px", md: "50px", sm: "50px" }}
        />
      </Button>
    </>
  );
};

export default SearchBar;
