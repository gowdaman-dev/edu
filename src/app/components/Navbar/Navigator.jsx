'use client'
import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { InlineIcon } from '@iconify/react'
import Navbar from './Navbar'
import { UserContext } from '@/ContextUser'
import { motion } from 'framer-motion'
import { IoSchoolOutline } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { webName } from '../globalDetails'
const grades = [
    {
        label: 'grade 1',
        value: 1,
    },
    {
        label: 'grade 2',
        value: 2,
    },
    {
        label: 'grade 3',
        value: 3,
    },
    {
        label: 'grade 4',
        value: 4,
    },
    {
        label: 'grade 5',
        value: 5,
    },
    {
        label: 'grade 6',
        value: 6,
    },
    {
        label: 'grade 7',
        value: 7,
    },
    {
        label: 'grade 8',
        value: 8,
    },
    {
        label: 'grade 9',
        value: 9,
    },
    {
        label: 'grade 10',
        value: 10,
    },
    {
        label: 'grade 11',
        value: 11,
    },
    {
        label: 'grade 12',
        value: 12,
    },
    {
        label: 'Teacher',
        value: 'teacher',
    },
]
function Navigator({ children }) {
    const { setnav, nav } = useContext(UserContext)
    const [grade, setGrade] = useState(grades[0])
    const [showgrade, setShowGrade] = useState(false)
    const [mobsearch, setMobsearch] = useState(false)
    const grademenurefmain = useRef()
    const grademenuref = useRef()
    useEffect(() => {
        const handler = (e) => {
            try {
                if (!grademenurefmain.current.contains(e.target) && !grademenuref.current.contains(e.target)) {
                    setShowGrade(false)
                }
            } catch (error) {
                return
            }
        }
        window.addEventListener('mousedown', handler)
    })

    return (
        <div className='w-screen h-full'>
            <div className="flex items-center justify-between px-10 py-4">
                <div className="flex items-center justify-center gap-2 ">
                    <IoIosMenu onClick={() => setnav(!nav)} className='text-4xl' />
                    <div className="flex items-center justify-center gap-2 ">
                        <Image src={'/logos/logo.svg'} height={30} width={30} alt='logo' />
                        <h1 className='hidden text-lg font-bold tex-gray-900 md:flex'>{webName}</h1>
                    </div>
                </div>
                <div className="md:flex hidden bg-[#92D1CD99] px-2 rounded-lg items-center">
                    <InlineIcon className='text-gray-600' icon="tdesign:search" height="25" width="25" />
                    <input type="text" className='w-[300px] bg-transparent outline-none px-2 py-1 text-gray-700' placeholder='Search' />
                </div>
                {
                    mobsearch && (
                        <div className="absolute top-0 left-0 z-40 flex items-center justify-between w-full px-4 py-4 bg-white md:hidden">
                            <div className="flex items-center px-2 bg-gray-100 rounded-lg">
                                <InlineIcon className='text-gray-500' icon="tdesign:search" height="25" width="25" />
                                <input type="text" className='w-[300px] bg-transparent outline-none px-2 py-2 text-sm font-light text-gray-700' placeholder='Search' />
                            </div>
                            <IoIosCloseCircleOutline className='text-2xl' onClick={() => setMobsearch(false)} />
                        </div>
                    )
                }
                <div className="flex items-center gap-4">
                    <CiSearch onClick={() => setMobsearch(true)} className='text-2xl md:hidden' />
                    <div className="relative flex px-2">
                        <button ref={grademenurefmain} className='p-2 px-4 text-center bg-white border rounded-lg ' onClick={() => setShowGrade(!showgrade)}> <span className='hidden md:flex'>{grade['label']}</span> <IoSchoolOutline className='text-2xl md:hidden' /></button>
                        {
                            (showgrade) && (
                                <div ref={grademenuref} className="bg-white border rounded-lg mt-2 py-2 right-0 h-[40vh] overflow-y-scroll px-2 absolute top-full flex flex-col gap-2">
                                    {
                                        grades.map((items) => {
                                            return <button className='px-2 py-2 rounded-lg hover:bg-gray-200' key={items.value} onClick={() => { setGrade(items); setShowGrade(false); }} >{items.label}</button>
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="flex justify-end h-full">
                <motion.div animate={nav ? { width: '280px' } : { width: '0px' }} className={`h-full md:relative absolute z-50 bg-[--web-container]  left-0 flex justify-end`}>
                    <Navbar />
                </motion.div>
                <div className="w-[100%] min-h-full p-4 ">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Navigator
