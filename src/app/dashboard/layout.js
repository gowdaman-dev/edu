import React from 'react'
import NavBar from '../components/navigator/NavBar'
import SideNav from '../components/navigator/SideNav'

function layout({ children }) {
    return (
        <div className='max-w-screen overflow-hidden'>
            <NavBar />
            <div className="flex h-screen max-w-screen">
                <SideNav />
                <div className="body flex-1 px-2 h-screen max-w-screen">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default layout