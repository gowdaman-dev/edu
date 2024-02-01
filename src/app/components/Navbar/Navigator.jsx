'use client'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { InlineIcon } from '@iconify/react'
import AdminNavbar from './AdminNavbar'
import { UserContext } from '@/ContextUser'
import { motion } from 'framer-motion'
const grade = [
    {
        label:'grade 1',
        value:1,
    },
    {
        label:'grade 2',
        value:2,
    },
    {
        label:'grade 3',
        value:3,
    },
    {
        label:'grade 4',
        value:4,
    },
    {
        label:'grade 5',
        value:5,
    },
    {
        label:'grade 6',
        value:6,
    },
    {
        label:'grade 7',
        value:7,
    },
    {
        label:'grade 8',
        value:8,
    },
    {
        label:'grade 9',
        value:9,
    },
    {
        label:'grade 11',
        value:11,
    },
    {
        label:'grade 12',
        value:12,
    },
    {
        label:'grade 1',
        value:1,
    },
    {
        label:'grade 1',
        value:1,
    },
]
function Navigator({ children }) {
    const { setnav, nav } = useContext(UserContext)
    const [grade, setGrade] = useState(grade[0])
    return (
        <div className='w-screen h-full'>
            <div className="flex px-10 py-4 justify-between items-center">
                <div className=" flex items-center justify-center gap-2">
                    <Image onClick={() => setnav(!nav)} className='' src={'/icons/menu.svg'} height={30} width={30} alt='menu' />
                    <div className=" flex items-center justify-center gap-2">
                        <Image src={'/logos/logo.svg'} height={30} width={30} alt='logo' />
                        <h1 className='font-bold tex-gray-900 text-lg'>Edulearn</h1>
                    </div>
                </div>
                <div className="flex bg-[#92D1CD99] px-2 rounded-lg items-center">
                    <InlineIcon className='text-gray-600' icon="tdesign:search" height="25" width="25" />
                    <input type="text" className='w-[300px] bg-transparent outline-none px-2 py-1 text-gray-700' placeholder='Search' />
                </div>
                <div className="flex">
                    <button>{grade['label']}</button>
                </div>
            </div>
            <div className="flex h-full justify-end">
                <motion.div animate={nav ? { width: '280px'} : { width: '0px' }} className="h-full flex justify-end">
                    <AdminNavbar />
                </motion.div>
                <div className="w-[100%] min-h-screen">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Navigator