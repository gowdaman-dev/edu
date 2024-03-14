'use client'
import React, { useContext } from 'react'
import MainDash from '../components/dashboard/MainDash'
import UserProvider from '../components/dashboard/UserProvider'
import { useSession } from 'next-auth/react'
import LoaderPage from '../components/loader/LoadingPage'
import SuperAdminMembers from '../components/dashboard/SuperAdminMembers'
function page() {
  const { data: session, loading } = useSession();
  return (
    <>
      {
        loading ? <LoaderPage /> :
          <>
            {
              (session?.user?.role == "superadmin") && (
                <>
                  <SuperAdminMembers />
                </>
              )
            }
            {
              (session?.user?.role == "admin" || session?.user?.role == "teacher") && (
                <>
                  <MainDash />
                  <UserProvider />
                </>
              )
            }
            {
              (session?.user?.role == "student") && (
                <>
                  <p className='text-center py-4 px-4 text-red-500 text-2xl'>Restricted Page</p>
                </>
              )
            }
          </>
      }
    </>
  )
}

export default page