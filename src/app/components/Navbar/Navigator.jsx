'use client'
import Image from 'next/image'
import React, { useContext} from 'react'
import { InlineIcon } from '@iconify/react'
import AdminNavbar from './AdminNavbar'
import { UserContext } from '@/ContextUser'
import { motion } from 'framer-motion'
function Navigator({ children }) {
    const {setnav, nav} = useContext(UserContext)
    return (
        <div className='w-screen h-full'>
            <div className="flex px-10 py-4 justify-between items-center">
                <div className=" flex items-center justify-center gap-2">
                    <Image onClick={()=>setnav(!nav)} className='' src={'/icons/menu.svg'} height={30} width={30} alt='menu' />
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
                    <select className='px-2 py-2 rounded-lg bg-white shadow-[0px_0px_2px_0px_var(--green-mild)] ' name="" id="">
                        <option value="1">Grade 1 </option>
                        <option value="add"> Add Grade </option>
                    </select>
                </div>
            </div>
            <div className="flex h-full justify-end">
                <motion.div animate={nav?{width:'280px'}:{width:'0px'}} className="h-full flex justify-end">
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