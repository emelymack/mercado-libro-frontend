import { ChevronRightIcon } from "@chakra-ui/icons"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"

interface Props {
  category: string, 
  bookTitle: string
}
const BreadcrumbNav = ({category, bookTitle}: Props) => {
  return (
    <Breadcrumb px={{base: 4, md:0}} spacing='8px' fontSize={{lg:'smaller'}} separator={<ChevronRightIcon color='brand.greenLogo' />}>
      <BreadcrumbItem>
        <BreadcrumbLink href='/'>Inicio</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href={`/category/${category}`}>{category}</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href='' noOfLines={1}>{bookTitle}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}

export default BreadcrumbNav