import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { useDisclosure } from '@chakra-ui/react'

interface Props {
  children: React.ReactNode
}
const Layout = ({children}:Props) => {
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();

  return (
    <>
      <Header isOpenLogin={isOpenLogin} onOpenLogin={onOpenLogin} onCloseLogin={onCloseLogin} />
        {children}
      <Footer onOpenLogin={onOpenLogin} />
    </>
  )
}

export default Layout