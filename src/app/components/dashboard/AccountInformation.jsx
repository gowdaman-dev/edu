'use client'
import React, { useContext, useEffect, useState } from 'react'
import { TbRefresh } from "react-icons/tb";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { UserContext } from '@/ContextUser';
import { motion } from 'framer-motion';
function Accountinformation() {
    const { showAccInfo, setShowAccInfo } = useContext(UserContext)
    const [gradeinfo, setGradeinfo] = useState({})
    const { data: session } = useSession()
    const infofetch = async () => {
        const res = await fetch('/api/userinfo', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email: session?.user?.email })
        })
        const { user } = await res.json();
        return user
    }
    const { data: userdata } = useSWR('user info', infofetch);
    useEffect(() => {
        console.log(userdata);
    }, [userdata])
    return (
        <motion.div initial={{ opacity: .4 }} animate={{ opacity: 1 }} transition={{ type: 'spring', duration: .5 }} exit={{ opacity: 0 }} className='flex fixed w-screen top-0 left-0 justify-center h-[100vh]  bg-slate-200/[.5] backdrop-blur-sm flex items-center justify-center '>
            <motion.div initial={{ scale: .7, opacity: .4 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', duration: .5 }} exit={{ scale: .7, opacity: 0 }} className='h-[500px] md:w-[600px] w-[90%] text-gray-800 flex flex-col items-start bg-white p-4 overflow-hidden rounded-lg shadow-xl shadow-slate-800/20 relative '>
                <div className='flex h-fit w-full justify-between items-center py-2  border-b'>
                    <h1 className='text-lg font-semibold text-gray-700'>
                        Acount Information
                    </h1>
                </div>
                <div className='h-fit flex p-3  items-center gap-4'>
                    <h1 className='text-lg font-medium'>
                        Name :
                    </h1>
                    {session?.user?.name}
                </div>
                <div className='h-fit flex p-3 flex-warp items-center gap-4'>
                    <h1 className='text-lg font-medium'>
                        Email :
                    </h1>
                    {session?.user?.email}
                </div>
                <button className='text-purple-800 w-fit px-4'>
                    Change Password
                </button>
                {
                    session?.user?.role == "teacher" && (
                        <div className='h-fit flex p-3   '>
                            <div className='flex w-full h-fit gap-4 items-center'>
                                <h1 className='text-lg font-medium'>
                                    Grade :
                                </h1>
                                <h3>
                                    grade {
                                        userdata && (
                                            userdata.standard
                                        )
                                    }
                                </h3>
                            </div>
                        </div>
                    )
                }
                <div className='h-fit flex p-3'>
                    <div className='flex w-full h-fit gap-4 items-center'>
                        <h1 className='text-lg font-medium'>
                            Account Type :
                        </h1>
                        <h3>
                            {session?.user?.role}
                        </h3>
                    </div>
                </div>
                <footer className=' h-fit justify-end p-3  flex w-[100%] right-0 bottom-0 border-t absolute'>
                    <button onClick={() => setShowAccInfo(false)} className='text-purple-700 font-normal'>
                        Cancel
                    </button>
                </footer>
            </motion.div>
        </motion.div>

    )
}

export default Accountinformation