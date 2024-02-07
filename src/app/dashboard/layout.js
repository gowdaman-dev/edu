'use client'
import React from 'react'
import NavBar from '../components/navigator/NavBar'
import SideNav from '../components/navigator/SideNav'
import SideNavMob from '../components/navigator/SideNavMob'
import { useSession } from 'next-auth/react'
import LoaderPage from '../components/loader/LoadingPage'

function layout({ children }) {
    const { data: session, loading } = useSession()
    return (
        <>
            {
                loading ? <LoaderPage /> :
                    <div className='max-w-screen overflow-hidden'>
                        <NavBar />
                        <div className="flex h-screen max-w-screen">
                            <div className="md:flex hidden">
                                <SideNav />
                            </div>
                            <div className="md:hidden flex">
                                <SideNavMob />
                            </div>
                            <div className="h-screen md:w-full">
                                {children}
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default layout