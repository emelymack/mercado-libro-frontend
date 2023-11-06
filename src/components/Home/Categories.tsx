import { Box, SimpleGrid } from "@chakra-ui/react"
import CategoryCard from "../Card/CategoryCard"
import img1 from '../../assets/img/portada_el-duelo_gabriel-rolon_202009172233.jpg'
import img2 from '../../assets/img/portada_la-pez_gabriela-larralde_202309071714.jpg'
import img3 from '../../assets/img/portada_destroza-este-diario-ahora-a-todo-color_keri-smith_201802011849.jpg'
import img4 from '../../assets/img/376931_portada_parasyte-n-0308_hitoshi-iwaaki_201701051250.jpg'
import img5 from '../../assets/img/358594_portada_manos-que-curan_barbara-ann-brennan_202205302327.jpg'
import img6 from '../../assets/img/377616_portada_miss-marple-doce-casos-nuevos_varios-autores_202310231050.jpg'
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { Category } from "../../types/category"
 
const categories = [
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
]

export const Categories = () => {

  const [result, setResult] = useState<Category[]>([]);
  useEffect(() => {
    const getCategories = async () => {
      const data = await fetch(`http://localhost:8080/v1/api/category`, {
        method: "GET"
      });
      const jsonData = await data.json();
      setResult(jsonData.results);
    };

    getCategories();
  }, []);

  return (
    <Box px={{'base': 10, 'md': 20}} my={20}>
      <SimpleGrid columns={{'base': 1, 'md': 2, 'lg': 3 }} spacingX={6} spacingY={7}>
        {categories?.map((item) => (
           <Link to={`/category/${item.title}`}>
            <CategoryCard img={item?.img} title={item?.title} />
            </Link>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default Categories