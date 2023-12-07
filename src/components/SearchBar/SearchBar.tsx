import { useEffect, useState } from "react";
import { Button, Flex, Icon, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import searchIcon from "../../assets/icons/icon-search.svg";
// import closeIcon from "../../assets/icons/icon-xmark.svg"
import { getAllBooksSearch } from "../../services/SearchServiceBook";
import { useNavigate } from "react-router-dom";
import { Book } from "../../types/product";
import CustomLoading from "../CustomLoading/CustomLoading";
import ModalError from "../Modal/ModalError";
import { Search2Icon } from "@chakra-ui/icons";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenSearch, onOpen: onOpenSearch, onClose: onCloseSearch } = useDisclosure();

  const history = useNavigate();


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchTerm.length > 0) {
      setIsLoading(true);
      try {
        const response = await getAllBooksSearch({
          keyword: searchTerm,
          page: 0,
          size: 20
        });
        setBooks(response.data);
        if (response.data.length > 0) {
          history(`/books/search/${searchTerm}`);
          onCloseSearch()
        } else {
          onOpen();
        }
      } catch (error) {
        console.error("Error al buscar libros:", error);
      } finally {
        setSearchTerm("");
        setIsLoading(false);
      }
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => { }, [isLoading]);

  if (isLoading) return <CustomLoading />;

  return (
    <>
      <Button
        bg={"none"}
        px={{ base: 2, md: 3 }}
        className="headerBtn"
        onClick={onOpenSearch}
      >
        <Image
          src={searchIcon}
          boxSize={{ base: "50px", md: "50px", sm: "50px" }}
        />
      </Button>
      <Modal isOpen={isOpenSearch} onClose={onCloseSearch}>
        <ModalOverlay />
        <ModalContent bg={'gray.800'} w={{base: '90vw'}}>
          <ModalHeader color={'brand.violetLogo'} pe={{base: 20}}>Buscar por título o autor</ModalHeader>
          <ModalCloseButton color={'brand.violetLogo'} fontSize={'18px'} _hover={{bg: 'brand.violetLogo25'}} />
          <ModalBody pb={5} py={5}>
            <form onSubmit={onSubmit} style={{ display: 'flex', alignItems: 'center'}}>
              <Input
                placeholder="Escribe aquí..."
                value={searchTerm}
                onChange={handleInputChange}
                size="lg"
                borderRadius="md"
                w={{ base: "sm", md: "sm"}}
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
                bg={'brand.violetLogo50'}
                color="#003844"
                border={'none'}
                borderColor="#d8dee4"
                fontWeight={500}
              />
              <Button variant={'brandPrimary'} type="submit" ms={3} p={5}><Icon as={Search2Icon} boxSize={5}/></Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ModalError
        isOpen={isOpen}
        onClose={onClose}
        title="No se encontraron resultados para la búsqueda"
      />
    </>
  );
};

export default SearchBar;
