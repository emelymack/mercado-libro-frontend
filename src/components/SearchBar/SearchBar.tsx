import { useState } from "react";
import { Button, Flex, Image, Input } from "@chakra-ui/react";
import searchIcon from "../../assets/icons/icon-search.svg";
import closeIcon from "../../assets/icons/icon-xmark.svg"
import { getAllBooksSearch } from "../../services/SearchServiceBook";
import { useNavigate } from "react-router-dom";
import { Book } from "../../types/product";

const SearchBar = () => {
  const [isInputVisible, setInputVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [, setBooks] = useState<Book[]>([]);

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
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
        w="100%"
      >
        {isInputVisible && (
          <Input
            placeholder="Buscar por titulo o categoria"
            value={searchTerm}
            onChange={handleInputChange}
            size="lg"
            borderRadius="md"
            w={{ base: "sm", md: "sm", lg: "xs" }}
            borderColor="gray.300"
            focusBorderColor="teal.500"
            _hover={{
              borderColor: "teal.500",
            }}
            _placeholder={{
              color: "brand.blueLogo",
            }}
            _autofill={{
              border: "1px solid transparent",
              textFillColor: "#003844",
              boxShadow: "0 0 0px 1000px #ffffff inset",
              transition: "background-color 5000s ease-in-out 0s",
              backgroundColor: "brand.blueLogo",
            }}
            bg={"brand.violetLogo50"}
          />
        )}

        <Button
          bg={"none"}
          px={{ base: 2, md: 3 }}
          className="headerBtn"
          onClick={handleClick}
        >
          <Image
            src={!isInputVisible ? searchIcon : closeIcon}
            boxSize={{ base: "50px", md: "50px", sm: "50px" }}
          />
        </Button>
      </Flex>
    </>
  );
};

export default SearchBar;
