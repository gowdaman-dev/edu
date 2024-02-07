'use client'
import React, { useContext } from 'react'
import MainDash from '../components/dashboard/MainDash'
import UserProvider from '../components/dashboard/UserProvider'
import { useSession } from 'next-auth/react'
import LoaderPage from '../components/loader/LoadingPage'
function page() {

  return (
    <div className='md:w-full w-screen flex flex-col px-2 '>
      <MainDash />
      <UserProvider />
    </div>
  )
}

export default page