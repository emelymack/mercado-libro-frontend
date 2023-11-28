import { ChevronRightIcon } from '@chakra-ui/icons'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

interface BreadcrumbNavProps {
  order: string;
  size: string;
}

const BreadcrumbNav:React.FC<BreadcrumbNavProps>= ({order, size}) => {

  return (
    <Breadcrumb mt={10} spacing='8px' fontSize={size} separator={<ChevronRightIcon color='brand.greenLogo' />}>
      <BreadcrumbItem>
        <BreadcrumbLink href='/'>Inicio</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href={`/purchases`}>Mi cuenta</BreadcrumbLink>
      </BreadcrumbItem>

      {order ? (
        <BreadcrumbItem>
         <BreadcrumbLink href={`/orders`}>{order}</BreadcrumbLink>
        </BreadcrumbItem>
      ) : ''}

    </Breadcrumb>
  )
}

export default BreadcrumbNav