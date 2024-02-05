'use client'
import React, { useContext } from 'react'
import MainDash from '../components/dashboard/MainDash'
import UserProvider from '../components/dashboard/UserProvider'
function page() {
  return (
    <div className='max-w-[100%] flex flex-col bg-red-400'>
      <MainDash />
      <UserProvider/>
    </div>
  )
}

export default page