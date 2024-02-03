'use client'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

function SideNav() {
    return (
        <div className='w-[230px] h-full flex justify-end bg-[--web-container]'>
            <div className="flex w-full h-full border-r">
                <div className="relative flex flex-col items-center">
                    <button className='flex items-center justify-center w-fit'>
                        <AiOutlinePlus className='text-xl'/>
                        <p>Add Members</p>
                    </button>
                    
                </div>
            </div>
        </div>
    )
}

export default SideNav