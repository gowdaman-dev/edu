'use client'
import { InlineIcon } from '@iconify/react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useRef, useState } from 'react'
const navlinks = [
    {
        label: 'Member List',
        icon: <Image alt='' src={'/icons/nav/frame.svg'} height={24} width={24} />,
        path: '/dashboard'
    },
    {
        label: 'Shared Library',
        icon: <Image alt='' src={'/icons/nav/bookmark.svg'} height={24} width={24} />,
        path: '/dashboard/library'
    },
    {
        label: 'School Information',
        icon: <Image alt='' src={'/icons/nav/note-2.svg'} height={24} width={24} />,
        path: ''
    },
    {
        label: 'Account Information',
        icon: <Image alt='' src={'/icons/nav/security-user.svg'} height={24} width={24} />,
        path: ''
    },
]
function AdminNavbar() {
    const router = useRouter()
    const [adder, setAdder] = useState(false)
    const addermenuref = useRef()
    const addmenuref = useRef()
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
        <div className={`min-w-[280px] border-r h-full overflow-hidden transition-all duration-500 flex flex-col gap-6 justify-start`}>
            <ul className='relative flex w-full items-center font-light flex-col  justify-center'>
                <button ref={addmenuref} onClick={() => setAdder(!adder)} className='bg-white px-2 rounded-lg text-[--web-primary-color] hover:text-teal-400 shadow-[0px_0px_4px_0px] shadow-[--web-primary-color] w-full py-2 text-xl flex items-center justify-center gap-3'><InlineIcon icon="ph:plus-bold" height="20" width="20" /><span>Add Member</span></button>
                {
                    adder && (
                        <div ref={addermenuref} className="absolute -bottom-[300%] py-2 px-4 bg-white flex flex-col gap-2 bg-transparent mt-3 z-[2] rounded-lg shadow">
                            <button>Add Manually</button>
                            <button>Request</button>
                        </div>
                    )
                }
            </ul>
            {
                navlinks.map((links) => {
                    return <Link
                        href={links?.path}
                        className='w-[90%] h-fit text-[--text-primary] hover:bg-gray-200 justify-start transition-color duration-500 py-4 rounded-r-full text-left px-4 flex  gap-2 items-center'>
                        <span>
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
            <button className='w-fit text-[--text-primary] hover:bg-gray-200 justify-start transition-color duration-500 py-2 rounded-lg text-left px-4 flex  gap-2 items-center' onClick={() => signOut()}> <Image alt='' src={'/icons/nav/login.svg'} height={24} width={24} /> <span>SignOut</span></button>
        </div>
    )
}

export default AdminNavbar