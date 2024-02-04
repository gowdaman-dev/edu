import React from 'react'
import NavBar from '../components/navigator/NavBar'
import SideNav from '../components/navigator/SideNav'

function layout({ children }) {
    return (
        <div>
            <NavBar />
            <div className="flex h-screen">
                <SideNav/>
                <div className="body flex-1 px-2">
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default layout