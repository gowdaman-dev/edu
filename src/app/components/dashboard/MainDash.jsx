'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoFilter, IoReload } from "react-icons/io5";
import { AiFillCloseCircle, AiOutlineExport } from "react-icons/ai";
import { UserContext } from '@/ContextUser';
import { useSession } from 'next-auth/react';
function MainDash() {
    const [filter, setFilter] = useState(false)
    const { data: session } = useSession()
    const filterrefmenu = useRef();
    const filterrefmenulist = useRef();
    const { fetchrole, setFetchrole, setCount, count, setExporter } = useContext(UserContext);
    useEffect(() => {
        let handler = (e) => {
            try {
                if (!filterrefmenu.current.contains(e.target) && !filterrefmenulist.current.contains(e.target)) {
                    setFilter(false)
                }
            } catch (error) {

            }
        }
        window.addEventListener('click', handler)
    })
    return (
        <div className='w-full flex flex-col'>
            <div className="w-full py-2 border-b flex justify-between px-3 items-center">
                <h1 className='text-xl text-gray-800 font-normal'>MemberList</h1>
                <div className="flex items-center justify-center gap-4">
                    {
                        (session?.user?.role == 'admin') && (
                            <div className="relative flex flex-col">
                                {
                                    !fetchrole && (
                                        <div ref={filterrefmenu} onClick={() => setFilter(!filter)} className="cursor-pointer relative filter flex items-center text-sm gap-2 text-[--web-primary-color]">
                                            <IoFilter className='text-xl' />
                                            <span className='uppercase'>Filter</span>
                                        </div>
                                    )
                                }
                                {
                                    fetchrole && (
                                        <button
                                            className='bg-gray-300 text-gray-600 px-2 rounded-full flex gap-2 items-center'
                                            onClick={() => setFetchrole('')}
                                        >
                                            {fetchrole}
                                            <AiFillCloseCircle className='text-gray-400' />
                                        </button>
                                    )
                                }
                                {
                                    (filter) && (
                                        <div ref={filterrefmenulist} className="absolute top-full bg-white rounded-lg z-[2] mt-4 text-center text-gray-800 p-2 flex flex-col rounded-lg border gap-2">
                                            <p onClick={() => { setFetchrole("student"); setFilter(false) }} className='cursor-pointer'>Student</p>
                                            <p onClick={() => { setFetchrole("teacher"); setFilter(false) }} className='cursor-pointer'>Teacher</p>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                    <div onClick={() => setExporter("export")} className="cursor-pointer export flex items-center text-sm gap-2 text-[--web-primary-color]">
                        <AiOutlineExport className='text-xl' />
                        <span className='uppercase'>export</span>
                    </div>
                    <div className="reload p-2 hover:bg-gray-100 rounded-full">
                        <IoReload onClick={() => setCount(count + 1)} className='text-xl' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainDash