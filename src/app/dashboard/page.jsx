'use client'
import React, { useContext } from 'react'
import MainDash from '../components/dashboard/MainDash'
import UserProvider from '../components/dashboard/UserProvider'
function page() {
  return (
    <div className='md:max-w-[100%] w-screen flex flex-col px-2 '>
      <MainDash />
      <UserProvider/>
    </div>
  )
}

export default page