'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { adminnavlinks, superadminnavlinks } from './Navjson'
import { IoIosLogOut } from "react-icons/io";
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { UserContext } from '@/ContextUser'
import ManualAdder from '../adduser/ManualAdder'
import OrganiserManualAdder from '../adduser/OrganiserManualAdder'
import { signOut, useSession } from 'next-auth/react'
import { IoSchoolOutline } from 'react-icons/io5'
import { MdOutlineManageAccounts } from 'react-icons/md'
import Accountinformation from '../dashboard/AccountInformation'
import SchoolInformation from '../dashboard/Schoolinformation'
import MemberRequestPage from '../dashboard/MemberRequestCom'
import OraganizerRequestPage from '../dashboard/OrganizerRequestCom'
function SideNav() {
    const [addmember, setAddmember] = useState(false)
    const menuref = useRef();
    const menulistref = useRef();
    const path = usePathname();
    const { nav ,setnav, addmanually, setAddmanually,toggleRequest, setToggleRequest, showAccInfo, setShowAccInfo, showsklinfo, setShowSklInfo } = useContext(UserContext)
    const [addorganisermanually, setaddorganisermanually] = useState(false)
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
            height: "75px",
            transition: {
                duration: .1,
                ease: 'linear',
            }
        },
        exit: {
            height: 0,
            transition: {
                duration: .1,
                ease: 'linear',
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
    const { data: session, loading } = useSession();
    return (
        <motion.div initial={'exit'} animate={nav ? 'enter' : 'exit'} exit={"exit"} variants={navvarient} className='h-full flex z-[8] absolute left-0 justify-end bg-[--web-container]'>
            <div className="flex min-w-[250px] h-full border-r border-gray-200/[.4]">
                <div className="relative flex flex-col items-center w-full gap-4 px-2 py-2">
                    <button ref={menuref} onClick={() => setAddmember(!addmember)} className='flex items-center justify-center bg-white  text-gray-800 shadow-sm shadow-[--web-primary-color] py-2 rounded w-full'>
                        <AiOutlinePlus className='text-xl' />
                        <p>{loading ? "loading..." : (session?.user?.role == 'superadmin') ? "Add Organizers" : "Add Members"}</p>
                    </button>
                    <AnimatePresence mode='wait'>
                        {
                            addmember && (
                                <motion.div {...anime(addervariant)} ref={menulistref} className="flex flex-col overflow-hidden justify-end bg-gray-200/[.5] text-gray-800 border rounded w-full ">
                                    <div className="flex flex-col items-center justify-center py-2 h-fit gap-2">
                                        <button onClick={() => setAddmanually(true)}>Add Manually</button>
                                        <AnimatePresence mode='wait'>
                                            {
                                                session?.user?.role == "superadmin" ? addmanually && (<OrganiserManualAdder close={setAddmanually} />) : addmanually && (<ManualAdder close={setAddmanually} />)
                                            }
                                        </AnimatePresence>
                                        <button onClick={() => setToggleRequest(true)}>Request</button>
                                        <AnimatePresence mode='wait'>
                                            {
                                                toggleRequest && (session?.user?.role ==='superadmin'?<OraganizerRequestPage/>:<MemberRequestPage/>)
                                            }
                                        </AnimatePresence>

                                    </div>
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                    {
                        (session?.user?.role == "admin" || session?.user?.role == "teacher") ? adminnavlinks.map((items) => {
                            if (path == items.path) {
                                return <Link
                                    onClick={() => setnav(false)}
                                    href={items.path}
                                    key={items.label}
                                    className='text-md bg-[--web-primary-color] flex items-center justify-start gap-2 px-4 text-white w-full py-2 text-center rounded'
                                >
                                    {items.icon}
                                    {items.label}
                                </Link>
                            } else {
                                return <Link
                                    onClick={() => setnav(false)}
                                    href={items.path}
                                    key={items.label}
                                    className='text-md hover:bg-gray-200/[.5] flex items-center justify-start gap-2 px-4 text-gray-800 w-full py-2 text-center rounded'
                                >
                                    {items.icon}
                                    {items.label}
                                </Link>
                            }
                        }) : superadminnavlinks.map((items) => {
                            if (path == items.path) {
                                return <Link
                                    onClick={() => setnav(false)}
                                    href={items.path}
                                    key={items.label}
                                    className='text-md bg-[--web-primary-color] flex items-center justify-start gap-2 px-4 text-white w-full py-2 text-center rounded'
                                >
                                    {items.icon}
                                    {items.label}
                                </Link>
                            } else {
                                return <Link
                                    onClick={() => setnav(false)}
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
                    {
                        (session?.user?.role == "admin" || session?.user?.role == "teacher") && (
                            <button onClick={() => setShowSklInfo(true)} className='text-md hover:bg-gray-200/[.5] flex items-center justify-start gap-2 px-4 text-gray-800 w-full py-2 text-center rounded'>
                                <IoSchoolOutline className='text-xl' /><p>School Information</p>
                            </button>
                        )
                    }
                    {
                        showsklinfo && (
                            <SchoolInformation />
                        )
                    }
                    <button onClick={() => { setShowAccInfo(true); setnav(false) }} className='text-md hover:bg-gray-200/[.5] flex items-center justify-start gap-2 px-4 text-gray-800 w-full py-2 text-center rounded'>
                        <MdOutlineManageAccounts className='text-xl' /><p>Account Information</p>
                    </button>
                    <AnimatePresence mode='wait'>
                        {
                            showAccInfo && (
                                <Accountinformation />
                            )
                        }
                    </AnimatePresence>
                    <button onClick={() => signOut({callbackUrl:`${window.location.origin}/signin`})} className='text-md hover:bg-gray-200/[.5] flex items-center justify-start gap-2 px-4 text-gray-800 w-full py-2 text-center rounded'>
                        <IoIosLogOut className='text-xl' />
                        <p>Logout</p>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default SideNav