'use client'
import React from 'react'
import NavBar from '../components/navigator/NavBar'
import SideNav from '../components/navigator/SideNav'
import SideNavMob from '../components/navigator/SideNavMob'
import { useSession } from 'next-auth/react'
import LoaderPage from '../components/loader/LoadingPage'
import NavBarStudent from '../components/navigator/NavBarStudent'
import SideNavStudent from '../components/navigator/SideNavStudent'
import SideNavMobStudent from '../components/navigator/SideNavMobStudent'

function layout({ children }) {
    const { data: session, loading } = useSession()
    return (
        <>
            {
                loading ? <LoaderPage /> :
                    <>
                        {
                            (session?.user?.role !== "student") ?
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
                                :
                                <>
                                    <div className='max-w-screen overflow-hidden'>
                                        <div className="flex h-screen max-w-screen">
                                            <div className="md:flex flex-1 hidden relative z-[10]">
                                                <SideNavStudent />
                                            </div>
                                            <div className="md:hidden flex-1 flex relative z-[10]">
                                                <SideNavMobStudent />
                                            </div>
                                            <div className="h-screen md:w-full relative z-0">
                                                <NavBarStudent />
                                                {children}
                                            </div>
                                        </div>
                                    </div>
                                </>
                        }
                    </>
            }
        </>
    )
}

export default layout