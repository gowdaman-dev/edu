'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { adminnavlinks } from './Navjson'
import { IoIosLogOut } from "react-icons/io";
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { UserContext } from '@/ContextUser'
import ManualAdder from '../adduser/ManualAdder'
import { signOut } from 'next-auth/react'
function SideNavMobStudent() {
    const [addmember, setAddmember] = useState(false)
    const menuref = useRef();
    const menulistref = useRef();
    const path = usePathname();
    const {setnavmob,navmob, addmanually, setAddmanually} = useContext(UserContext)
    const anime = (variants) => {
        return {
            initial: 'initial',
            animate: 'enter',
            exit: 'exit',
            variants
        }
    }
    const addervariant = {
        initial: {
            height: 0,
        },
        enter: {
            height: "fit-content",
            transition: {
                duration: .3,
                ease: 'easeIn',
            }
        },
        exit: {
            height: 0,
            transition: {
                duration: .2,
                ease: 'easeIn',
            }
        },
    }
    const navvarient = {
        initial: {
            width: 0,
        },
        enter: {
            width: "250px",
            transition: {
                duration: .3,
                ease: 'easeIn',
            }
        },
        exit: {
            width: 0,
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
        <motion.div initial={'initial'} animate={navmob ? 'enter' : 'exit'} exit={"exit"} variants={navvarient} className='h-full  z-[8] flex absolute left-0 overflow-x-hidden justify-end bg-[--web-container]'>
            <div className="flex min-w-[250px] h-full border-r border-gray-200/[.4]">
                <div className="relative flex flex-col items-center w-full gap-4 px-2 py-2">
                    <button ref={menuref} onClick={() => setAddmember(!addmember)} className='flex items-center justify-center bg-white  text-gray-800 shadow-sm shadow-[--web-primary-color] py-2 rounded w-full'>
                        <AiOutlinePlus className='text-xl'/>
                        <p>Add Members</p>
                    </button>
                    <AnimatePresence mode='wait'>
                        {
                            addmember && (
                                <motion.div {...anime(addervariant)} ref={menulistref} className="flex flex-col overflow-hidden justify-end py-2 bg-gray-200/[.5] text-gray-800 border rounded w-full ">
                                    <div className="flex flex-col gap-4">
                                        <button onClick={() => {setAddmanually(true) ; setnavmob(false)}}>Add Manually</button>
                                        <AnimatePresence mode='wait'>
                                            {
                                                addmanually && (<ManualAdder close={setAddmanually} />)
                                            }
                                        </AnimatePresence>
                                        <button onClick={()=>[setnavmob(false)]}>Request</button>
                                    </div>
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                    {
                        adminnavlinks.map((items) => {
                            if (path == items.path) {
                                return <Link
                                    onClick={()=>setnavmob(false)}
                                    href={items.path}
                                    key={items.label}
                                    className='text-md bg-[--web-primary-color] flex items-center justify-start gap-2 px-4 text-white w-full py-2 text-center rounded'
                                >
                                    {items.icon}
                                    {items.label}
                                </Link>
                            } else {
                                return <Link
                                    onClick={()=>setnavmob(false)}
                                    href={items.path}
                                    key={items.label}
                                    className='text-md hover:bg-gray-200/[.5] flex items-center justify-start gap-2 px-4 text-gray-800 w-full py-2 text-center rounded'
                                >
                                    {items.icon}
                                    {items.label}
                                </Link>
                            }
                        })
                    }
                    <button onClick={()=>{signOut({callbackUrl:"/signin"}) ; setnavmob(false)}} className='text-md hover:bg-gray-200/[.5] flex items-center justify-start gap-2 px-4 text-gray-800 w-full py-2 text-center rounded'>
                        <IoIosLogOut className='text-xl' />
                        <p>Logout</p>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default SideNavMobStudent