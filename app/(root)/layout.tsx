"use client";
import React from 'react'
import Header from '../components/Header'

const Layout = ({children}:{children:React.ReactNode}) => {

    
    console.log("rendering layout")
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
