'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AiFillLeftCircle, AiFillRightCircle, AiOutlinePlus } from 'react-icons/ai'
import { IoIosLogOut } from "react-icons/io";
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { UserContext } from '@/ContextUser'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { IoLibraryOutline, IoReaderOutline } from 'react-icons/io5'
import { FaRegUser } from 'react-icons/fa6'
import Accountinformation from '../dashboard/AccountInformation';
function SideNavStudent() {
    const [addmember, setAddmember] = useState(false)
    const menuref = useRef();
    const menulistref = useRef();
    const path = usePathname();
    const { nav, setnav, addmanually, setAddmanually , showAccInfo,
        setShowAccInfo} = useContext(UserContext)
    const [addorganisermanually, setaddorganisermanually] = useState(false)
    const animenavtext = (variants) => {
        return {
            initial: 'initial',
            animate: nav ? 'enter' : 'exit',
            exit: 'exit',
            variants
        }
    }
    const navtext = {
        initial: {
            opacity: 0,
        },
        enter: {
            opacity: 1,
            transition: {
                duration: .4,
                ease: 'linear',
                delay: .5
            }
        },
        exit: {
            opacity: 1,
            transition: {
                duration: .1,
                ease: 'linear',
            }
        },
    }
    const navvarient = {
        initial: {
            width: "60px",
        },
        enter: {
            width: "250px",
            transition: {
                duration: .3,
                ease: 'easeIn',
            }
        },
        exit: {
            width: "60px",
            transition: {
                duration: .2,
                ease: 'easeIn',
            }
        },
    }
    useEffect(() => {
        let handler = (e) => {
            try {
                if (!menulistref.current.contains(e.target) && !menuref.current.contains(e.target)) {
                    setAddmember(false)
                }
            } catch (error) {
                return
            }
        }
        window.addEventListener('click', handler)
    })
    return (
        <motion.div initial={'exit'} animate={nav ? 'enter' : 'exit'} exit={"exit"} variants={navvarient} className='h-screen w-[250px] flex relative z-[10] justify-start bg-[--web-container]'>
            {nav ? <AiFillLeftCircle onClick={() => setnav(false)} className='absolute -right-3 top-4 z-[10] text-xl text-gray-400' /> : <AiFillRightCircle onClick={() => setnav(true)} className='absolute -right-3 top-4 z-[8] text-xl text-gray-400' />}
            <div className="flex flex-col justify-left items-start w-full h-full border-r border-gray-200/[.4] overflow-hidden">
                <div className="flex w-full items-center justify-start gap-4 py-2 px-4 h-[60px] border-b">
                    <Image src={'/logo.svg'} height={30} width={30} alt=""></Image>
                    <motion.p {...animenavtext(navtext)} className='text-[--web-primary-color] text-xl font-bold'>EDULEARN</motion.p>
                </div>
                <div className="flex flex-col w-full px-2 py-2 items-start gap-4">
                   
                    <Link href={'/dashboard/library'} className={`flex w-full  justify-start overflow-hidden rounded-lg ${(path == '/dashboard/library') ? "bg-[--web-primary-color] text-white" : "hover:bg-gray-100 text-gray-800"} `}>
                        <div className="w-fit flex justify-start  py-2 px-3 items-center gap-4">
                            <IoLibraryOutline className='text-xl' />
                            <motion.p {...animenavtext(navtext)} className='text-md'>Library</motion.p>
                        </div>
                    </Link>
                    <button onClick={()=>setShowAccInfo(true)} className="flex w-full  justify-start overflow-hidden hover:bg-gray-100 rounded-lg">
                        <div className="w-fit flex justify-start  py-2 px-3 items-center gap-4">
                            <FaRegUser className='text-xl' />
                            <motion.p {...animenavtext(navtext)} className='text-gray-800 text-md'>Account</motion.p>
                        </div>
                    </button>
                    <button onClick={()=>signOut({callbackUrl:"/signin"})} className="flex w-full  justify-start overflow-hidden hover:bg-gray-100 rounded-lg">
                        <div className="w-fit flex justify-start  py-2 px-3 items-center gap-4">
                            <IoIosLogOut className='text-xl' />
                            <motion.p {...animenavtext(navtext)} className='text-gray-800 text-md'>Logout</motion.p>
                        </div>
                    </button>
                </div>
            </div>
            <AnimatePresence mode='wait'>
                {
                    showAccInfo && (
                        <Accountinformation />
                    )
                }


            </AnimatePresence>
        </motion.div>
    )
}

export default SideNavStudent