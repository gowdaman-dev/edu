'use client'
import React from 'react'
import { IoFilter , IoReload } from "react-icons/io5";
import { AiOutlineExport } from "react-icons/ai";
import AccList from './AccList';
function MemberList() {
    return (
        <div className='w-full flex flex-col  '>
            <div className="w-full py-2 border-b flex justify-between items-center">
                <h1 className='text-xl text-gray-800 font-normal'>MemberList</h1>
                <div className="flex items-center justify-center gap-4">
                    <div className="cursor-pointer filter flex items-center text-sm gap-2 text-[--web-primary-color]">
                        <IoFilter className='text-xl' />
                        <span className='uppercase'>Filter</span>
                    </div>
                    <div className="cursor-pointer export flex items-center text-sm gap-2 text-[--web-primary-color]">
                        <AiOutlineExport className='text-xl' />
                        <span className='uppercase'>export</span>
                    </div>
                    <div className="reload p-2 hover:bg-gray-100 rounded-full">
                        <IoReload className='text-xl'/>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <AccList role={'teacher'} grade={'12'}/>
            </div>
        </div>
    )
}

export default MemberList