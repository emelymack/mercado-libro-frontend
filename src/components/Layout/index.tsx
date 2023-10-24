import React from 'react'
import Header from './Header'
import Footer from './Footer'

interface Props {
  children: React.ReactNode
}
const Layout = ({children}:Props) => {
  return (
    <>
      <Header />
        {children}
      <Footer />
    </>
  )
}

export default Layout