'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState, useContext } from 'react'
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai'
import { grades } from './Navjson'
import { AnimatePresence, motion } from 'framer-motion'
import { UserContext } from '@/ContextUser'
import { useSession } from 'next-auth/react'
import { AiOutlineClose } from 'react-icons/ai'
function NavBar() {
    const { data: session } = useSession();
    const [grade, setGrade] = useState(grades[0])
    const [showgrade, setShowGrade] = useState(false)
    const {
        nav,
        setnav,
        navmob,
        setnavmob,
        setNavSearch,
        navGrade,
        setNavGrade
    } = useContext(UserContext)
    const grademenuref = useRef();
    const grademenulistref = useRef();
    useEffect(() => {
        let handler = (e) => {
            try {
                if (!grademenuref.current.contains(e.target)) {
                    setShowGrade(false)
                }
            } catch (error) {

            }
        }
        window.addEventListener('click', handler)
        window.addEventListener('resize', () => {
            if (window.screenX <= 720) {
                setnav(false)
            }
        })
    })
    const [popsearch, setPopSearch] = useState(false)
    return (
        <div className='w-screen py-4 flex justify-between px-4 items-center border-b border-gray-200/[.4]'>
            <div className="flex items-center justify-center gap-4">
                <AiOutlineMenu onClick={() => { setnav(!nav); setnavmob(!navmob) }} className='text-2xl' />
                <Image src={'/logo.svg'} height={34} width={34} alt=""></Image>
                <h1 className='text-[--web-primary-color] text-2xl font-bold'>EDULEARN</h1>
            </div>
            <div className="search md:flex hidden rounded-full bg-gray-200 px-4 py-2">
                <input onChange={(e) => { setNavSearch(e.target.value) }} type="text" placeholder='search...' className='bg-transparent outline-none text-sm' />
            </div>
            <AiOutlineSearch className='text-xl md:hidden block' onClick={() => setPopSearch(true)} />
            {
                (popsearch) && (
                    <div className="md:hidden w-screen flex absolute z-[12] top-0 left-0 py-5 bg-white items-center justify-between px-4">
                        <input onChange={(e) => { setNavSearch(e.target.value) }} type="text" placeholder='search...' className='bg-transparent outline-none text-sm' />
                        <AiOutlineClose className="text-xl" onClick={() => setPopSearch(false)} />
                    </div>
                )
            }
            {
                session?.user?.role !== "superadmin" && (
                    <div className="relative flex item-center justify-center">
                        <button ref={grademenuref} onClick={() => setShowGrade(!showgrade)} className='p-2 bg-white rounded-lg shadow text-gray-800'>Grade {navGrade}</button>
                        <AnimatePresence mode='wait'>
                            {
                                (showgrade) && (
                                    <motion.div
                                        initial={{ y: 10, opacity: .6 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 10, opacity: 0 }}
                                        transition={{ duration: .5, type: 'spring' }}
                                        className="flex flex-col z-[4] absolute top-full text-center bg-white rounded-lg shadow px-2 gap-4 py-2 mt-2 h-[300px] w-[90px] overflow-y-scroll">
                                        {
                                            grades.map((item) => {
                                                return <p onClick={() => setNavGrade(item.value)} className='text-sm hover:bg-gray-200 p-1 rounded cursor-pointer' key={item.value}>{item.label}</p>
                                            })
                                        }
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                    </div>
                )
            }
        </div>
    )
}

export default NavBar