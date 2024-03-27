
import React from 'react'
import Header from '../components/Header'

const Layout = async ({children}:{children:React.ReactNode}) => {
  return (
    <div>
      <Header/>

      <div>

      {children}
      </div>
    </div>
  )
}

export default Layout
