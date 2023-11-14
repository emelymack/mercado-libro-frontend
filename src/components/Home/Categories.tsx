import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import CategoryCard from "../Card/CategoryCard";
import img1 from "../../assets/img/portada_el-duelo_gabriel-rolon_202009172233.jpg";
import img2 from "../../assets/img/portada_la-pez_gabriela-larralde_202309071714.jpg";
import img3 from "../../assets/img/portada_destroza-este-diario-ahora-a-todo-color_keri-smith_201802011849.jpg";
import img4 from "../../assets/img/376931_portada_parasyte-n-0308_hitoshi-iwaaki_201701051250.jpg";
import img5 from "../../assets/img/358594_portada_manos-que-curan_barbara-ann-brennan_202205302327.jpg";
import img6 from "../../assets/img/377616_portada_miss-marple-doce-casos-nuevos_varios-autores_202310231050.jpg";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllCategory, Category } from "../../services/BookService";
import { Title } from "../Title";

/* const categories = [
  {
    img: img2,
    title: 'Literatura'
  },
  {
    img: img1,
    title: 'Salud y bienestar'
  },
  {
    img: img3,
    title: 'Infantiles'
  },
  {
    img: img4,
    title: 'Cómic y novela gráfica'
  },
  {
    img: img5,
    title: 'Ciencia, historia y sociedad'
  },
  {
    img: img6,
    title: 'novela'
  },
] */

interface Props {
  title: string;
}

export const Categories = ({ title }: Props) => {
  const [categoria, setCategoria] = useState<Category[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    getAllCategory().then((res) => {
      console.log(res);
      setCategoria(res);
    });
  }, []);

  return (
    <Box px={{ base: 5, md: 20 }} my={20}>
      <Title htmlElement={"h2"} size="lg" text={"Categorias"} />
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
