'use client'
import React, { useContext, useEffect } from 'react'
import NavBar from '../components/navigator/NavBar'
import SideNav from '../components/navigator/SideNav'
import SideNavMob from '../components/navigator/SideNavMob'
import { signOut, useSession } from 'next-auth/react'
import LoaderPage from '../components/loader/LoadingPage'
import NavBarStudent from '../components/navigator/NavBarStudent'
import SideNavStudent from '../components/navigator/SideNavStudent'
import SideNavMobStudent from '../components/navigator/SideNavMobStudent'
import { UserContext } from '@/ContextUser'

function layout({ children }) {
    const { data: session, loading } = useSession()
    const { setnav } = useContext(UserContext)
    useEffect(() => {
        if (window.screenX <= 640) {
            setnav(false)
        }
    }, [])
    useEffect(() => {
        if (session?.user) {
            try {
                if (session?.user?.auth == false) {
                    signOut()
                }
            } catch (error) {

            }
        }
    })
    return (
        <>
            {
                loading ? <LoaderPage /> :
                    <>
                        {
                            (session?.user?.role == "admin" || session?.user?.role == "teacher" || session?.user?.role == "superadmin") && (
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
                            )
                        }
                        {
                            (session?.user?.role == "student") && (
                        <div className='max-w-screen overflow-hidden'>
                             <div className="flex h-screen max-w-screen">
                              <div className="flex flex-1 absolute md:relative z-[10]">
                            <SideNavStudent />
                            </div>
                                     
                             <div className="h-screen md:w-full relative z-0">
                                  <NavBarStudent />
                                            {children}
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                    </>
            }
        </>
    )
}

export default layout