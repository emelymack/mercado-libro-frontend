import { ChevronRightIcon } from '@chakra-ui/icons'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const BreadcrumbNav = (order) => {

  return (
    <Breadcrumb px={{base: 4, md:0}} mt={10} spacing='8px' fontSize={{lg:'smaller'}} separator={<ChevronRightIcon color='brand.greenLogo' />}>
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