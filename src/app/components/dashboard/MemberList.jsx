'use client'
import React, { useEffect, useRef, useState } from 'react'
import { IoFilter, IoReload } from "react-icons/io5";
import { AiOutlineExport } from "react-icons/ai";
function MemberList() {
    const [role, setRole] = useState('')
    const [filter, setFilter] = useState(false)
    const [acclist, setAcclist] = useState([])
    const filterrefmenu = useRef();
    const filterreflist = useRef();
    useEffect(() => {
        fetch('/api/memberlist')
            .then((data) => data.json())
            .then((data) => {
                setAcclist(data);
            })
    },[])
    useEffect(() => {
        let handler = (e) => {
            try {
                if (!filterrefmenu.current.contains(e.target)) {
                    setFilter(false)
                }
            } catch (error) {

            }
        }
        window.addEventListener('click', handler)
    })
    return (
        <div className='w-full flex flex-col  '>
            <div className="w-full py-2 border-b flex justify-between items-center">
                <h1 className='text-xl text-gray-800 font-normal'>MemberList</h1>
                <div className="flex items-center justify-center gap-4">
                    <div className="relative flex flex-col">
                        <div ref={filterrefmenu} onClick={() => setFilter(!filter)} className="cursor-pointer relative filter flex items-center text-sm gap-2 text-[--web-primary-color]">
                            <IoFilter className='text-xl' />
                            <span className='uppercase'>Filter</span>
                        </div>
                        {
                            (filter) && (
                                <div ref={filterreflist} className="absolute top-full bg-white rounded-lg mt-4 text-center text-gray-800 p-2 flex flex-col rounded-lg border gap-2">
                                    <p onClick={() => setRole("")} className='cursor-pointer'>all</p>
                                    <p onClick={() => setRole("student")} className='cursor-pointer'>Student</p>
                                    <p onClick={() => setRole("teacher")} className='cursor-pointer'>Teacher</p>
                                </div>
                            )
                        }
                    </div>
                    <div className="cursor-pointer export flex items-center text-sm gap-2 text-[--web-primary-color]">
                        <AiOutlineExport className='text-xl' />
                        <span className='uppercase'>export</span>
                    </div>
                    <div className="reload p-2 hover:bg-gray-100 rounded-full">
                        <IoReload className='text-xl' />
                    </div>
                </div>
            </div>
            <div className={`flex flex-col w-full`}>
                <table>
                    <thead>
                        <tr>
                            <td>name</td>
                            <td>Email</td>
                            <td>Standard</td>
                            <td>role</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            acclist.filter((data)=>{
                                return role === '' ? data : data.role.includes(role)
                            }).map((item) => {
                                return <tr key={item.email}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.standard}</td>
                                    <td>{item?.role}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MemberList