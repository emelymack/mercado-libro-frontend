import { Box, SimpleGrid } from "@chakra-ui/react";
import CategoryCard from "../Card/CategoryCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllCategory, Category } from "../../services/BookService";
import { Title } from "../Title";

export const Categories = () => {
  const [categoria, setCategoria] = useState<Category[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    getAllCategory().then((res) => {
      setCategoria(res);
    });
  }, []);

  return (
    <Box px={{ base: 5, md: 20 }} my={20}>
      <Title htmlElement={"h2"} size="lg" text={"Categorías"} align="center" />
      <SimpleGrid
        pt={8}
        columns={{ base: 1, md: 2, lg: 3 }}
        spacingX={6}
        spacingY={7}
      >
        {categoria?.map((item) => (
          <Link to={`/category/${item?.name}`}>
            <CategoryCard img={item?.image_link} title={item?.name} />
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Categories;
