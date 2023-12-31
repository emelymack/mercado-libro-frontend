import { ChevronRightIcon } from '@chakra-ui/icons'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

const BreadcrumbNav = () => {
  return (
    <Breadcrumb px={{base: 4, md:0}} mt={10} spacing='8px' fontSize={{lg:'smaller'}} separator={<ChevronRightIcon color='brand.greenLogo' />}>
      <BreadcrumbItem>
        <BreadcrumbLink href='/'>Inicio</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href={`/bestsellers`}>Más vendidos</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}

export default BreadcrumbNav