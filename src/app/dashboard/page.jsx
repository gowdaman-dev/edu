'use client'
import React, { useContext } from 'react'
import MainDash from '../components/dashboard/MainDash'
import UserProvider from '../components/dashboard/UserProvider'
function page() {
  return (
    <div className='min-w-full'>
      <MainDash />
      <UserProvider/>
    </div>
  )
}

export default page