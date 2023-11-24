import { ChevronRightIcon } from '@chakra-ui/icons'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

interface Props {
  novedades: string
}

const BreadcrumbNav = ({novedades}: Props) => {
  return (
    <Breadcrumb px={{base: 4, md:0}} mt={20} spacing='8px' fontSize={{lg:'smaller'}} separator={<ChevronRightIcon color='brand.greenLogo' />}>
      <BreadcrumbItem>
        <BreadcrumbLink href='/'>Inicio</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href={`/${novedades}`}>{novedades}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}

export default BreadcrumbNav