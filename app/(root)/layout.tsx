
import React from 'react'
import Header from '../components/Header'
import { getServerSession } from 'next-auth';
import { getSession, } from 'next-auth/react';
import { currentUser } from '@/actions/user.action';

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
