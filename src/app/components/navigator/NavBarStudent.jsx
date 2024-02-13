'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState, useContext } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { grades } from './Navjson'
import { AnimatePresence, motion } from 'framer-motion'
import { UserContext } from '@/ContextUser'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
function NavBarStudent() {
    const path = usePathname()
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
    return (
        <div className='w-full h-[60px] py-2 flex justify-between px-10 items-center border-b border-gray-200/[.4]'>
            {
                (path == '/dashboard/library') && (
                    <div className="search md:flex hidden rounded-full bg-gray-200 px-4 py-2">
                        <input onChange={(e) => { setNavSearch(e.target.value) }} type="text" placeholder='search...' className='bg-transparent outline-none text-sm' />
                    </div>
                )
            }
        </div>
    )
}

export default NavBarStudent