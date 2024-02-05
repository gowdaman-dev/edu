import React from 'react'
import NavBar from '../components/navigator/NavBar'
import SideNav from '../components/navigator/SideNav'
import SideNavMob from '../components/navigator/SideNavMob'

function layout({ children }) {
    return (
        <div className='max-w-screen overflow-hidden'>
            <NavBar />
            <div className="flex h-screen max-w-screen">
                <SideNav />
                <SideNavMob />
                <div className="h-screen md:w-full">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default layout