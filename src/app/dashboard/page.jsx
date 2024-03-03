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
              (session?.user?.role == "admin"||session?.user?.role == "teacher") && (
                <>
                  <MainDash/>
                  <UserProvider/>
                </>
              )
            }
            {
              (session?.user?.role == "student") && (
                <>
                  student1234
                  
                </>
              )
            }
          </>
      }
    </>
  )
}

export default page