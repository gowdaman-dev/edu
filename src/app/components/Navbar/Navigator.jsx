'use client'
import Image from 'next/image'
import React from 'react'
import { InlineIcon } from '@iconify/react'
function Navigator({ children }) {
    return (
        <div className='w-screen h-fit'>
            <div className="flex px-10 py-4 justify-between items-center">
                <div className=" flex items-center justify-center gap-2">
                    <Image src={'/logos/logo.svg'} height={30} width={30} />
                    <h1 className='font-bold tex-gray-900 text-lg'>Edulearn</h1>
                </div>
                <div className="flex bg-[#92D1CD] px-2 rounded-lg items-center">
                    <InlineIcon className='' icon="iconamoon:search-duotone" height="25" width="25" />
                    <input type="text" className='w-[300px] bg-[#92D1CD] px-2 py-1' placeholder='Search' />
                </div>
            </div>
        </div>
    )
}

export default Navigator