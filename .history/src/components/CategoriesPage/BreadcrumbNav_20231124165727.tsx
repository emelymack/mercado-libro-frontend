import { ChevronRightIcon } from '@chakra-ui/icons'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

interface Props {
  category: string
}

const BreadcrumbNav = ({category}: Props) => {
  return (
    <Breadcrumb px={{base: 4, md:0}} mt={0} pt={0} spacing='8px' fontSize={{lg:'smaller'}} separator={<ChevronRightIcon color='brand.greenLogo' />}>
      <BreadcrumbItem>
        <BreadcrumbLink href='/'>Inicio</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href={`/category/${category}`}>{category}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}

export default BreadcrumbNav