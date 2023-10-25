import { Box, SimpleGrid } from "@chakra-ui/react"
import CategoryCard from "../Card/CategoryCard"

import img1 from '../../assets/img/portada_el-duelo_gabriel-rolon_202009172233.jpg'
import img2 from '../../assets/img/portada_la-pez_gabriela-larralde_202309071714.jpg'
import img3 from '../../assets/img/portada_destroza-este-diario-ahora-a-todo-color_keri-smith_201802011849.jpg'
import img4 from '../../assets/img/376931_portada_parasyte-n-0308_hitoshi-iwaaki_201701051250.jpg'
import img5 from '../../assets/img/358594_portada_manos-que-curan_barbara-ann-brennan_202205302327.jpg'
import img6 from '../../assets/img/377616_portada_miss-marple-doce-casos-nuevos_varios-autores_202310231050.jpg'

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
    title: 'Misterio'
  },
]

const Categories = () => {
  return (
    <Box px={20} my={20}>
      <SimpleGrid columns={3} spacingX={6} spacingY={7}>
        {categories.map((item) => (
          <CategoryCard img={item.img} title={item.title} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default Categories