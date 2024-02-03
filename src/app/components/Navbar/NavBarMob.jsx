'use client'
import { InlineIcon } from '@iconify/react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { TiUser } from "react-icons/ti";
import { IoLibrary } from "react-icons/io5";
import { BiSolidSchool } from "react-icons/bi";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ManualAdder from '../adduser/ManualAdder';
import { AnimatePresence, motion } from 'framer-motion';
import { UserContext } from '@/ContextUser';
import { GoPlus } from 'react-icons/go';
const adminlinks = [
    {
        label: 'Member List',
        icon: <TiUser />,
        path: '/dashboard'
    },
    {
        label: 'Shared Library',
        icon: <IoLibrary />,
        path: '/dashboard/library'
    },
]
const navlinks = [
    {
        label: 'School Information',
        icon: <BiSolidSchool />,
        path: ''
    },
    {
        label: 'Account Information',
        icon: <Image alt='' src={'/icons/nav/security-user.svg'} height={24} width={24} />,
        path: ''
    },
]
function NavBarMob() {
    const path = usePathname()
    const [adder, setAdder] = useState(false)
    const [rolenav, setRolenav] = useState(adminlinks)
    const [addmanually, setAddmanually] = useState(false)
    const addermenuref = useRef()
    const addmenuref = useRef()
    const { setnav } = useContext(UserContext)
    useEffect(() => {
        const handler = (e) => {
            try {
                if (!addermenuref.current.contains(e.target) && !addmenuref.current.contains(e.target)) {
                    setAdder(false)
                }
            } catch (error) {
                return
            }
        }
        window.addEventListener('mousedown', handler)
    })
    return (
        <div className={`min-w-[280px] h-full overflow-hidden transition-all duration-500 flex flex-col py-4 justify-start`}>
            <ul className='relative flex w-full items-center font-light flex-col justify-center'>
                <button ref={addmenuref} onClick={() => setAdder(!adder)} className='bg-white px-2 shadow rounded-lg text-[--web-primary-color] hover:text-teal-400 w-[80%] py-2 flex items-center justify-center gap-3'><GoPlus className='text-xl' /><span>Add Member</span></button>
                <AnimatePresence mode='wait'>
                    {
                        adder && (
                            <motion.div initial={{ opacity: 0.5, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: .2, type: 'spring' }} ref={addermenuref} className="absolute border -bottom-[200%] py-2 w-[80%] px-4 bg-white flex flex-col gap-2 shadow-sm mt-3 z-[2] rounded-lg">
                                <button className='cursor-pointer' onClick={() => setAddmanually(true)}>Add Manually</button>
                                <AnimatePresence mode='wait'>
                                    {
                                        addmanually && (
                                            <ManualAdder close={setAddmanually} />
                                        )
                                    }
                                </AnimatePresence>
                                <button>Request</button>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </ul>
            <div className="border-b py-2 mt-2 flex flex-col items-center gap-2">
                {
                    rolenav.map((items) => {
                        if (items.path == path) {
                            return <Link
                                key={items.label}
                                href={items?.path}
                                onClick={() => setnav(false)}
                                className='w-[90%] h-fit text-white bg-[--web-primary-color]  justify-start transition-color duration-500 py-4 rounded-lg text-left px-4 flex  gap-2 items-center'>
                                <span className='text-2xl'>
                                    {items.icon}
                                </span>
                                <span>
                                    {
                                        items.label
                                    }
                                </span>
                            </Link>
                        } else {
                            return <Link
                                key={items.label}
                                href={items?.path}
                                onClick={() => setnav(false)}
                                className='w-[90%] h-fit text-[--text-primary] hover:bg-gray-200 justify-start transition-color duration-500 py-4 rounded-lg text-left px-4 flex  gap-2 items-center'>
                                <span className='text-2xl'>
                                    {items.icon}
                                </span>
                                <span>
                                    {
                                        items.label
                                    }
                                </span>
                            </Link>
                        }
                    })
                }
            </div>
            <div className="border-b py-2 flex flex-col items-center gap-2 ">
                {
                    navlinks.map((links) => {
                        return <Link
                            href={links?.path}
                            key={links.label}
                            onClick={() => setnav(false)}
                            className='w-[90%] h-fit text-[--text-primary] hover:bg-gray-200 justify-start transition-color duration-500 py-4 rounded-lg text-left px-4 flex  gap-2 items-center'>
                            <span className='text-2xl'>
                                {links.icon}
                            </span>
                            <span>
                                {
                                    links.label
                                }
                            </span>
                        </Link>
                    })
                }
            </div>
            <div className="py-2 flex items-center ">
                <button className='w-[90%] text-[--text-primary] hover:bg-gray-200 justify-start transition-color duration-500 py-4 rounded-lg text-left px-4 flex  gap-2 items-center' onClick={() => signOut()}> <Image alt='' src={'/icons/nav/login.svg'} height={24} width={24} /> <span>SignOut</span></button>
            </div>
        </div>
    )
}

export default NavBarMob