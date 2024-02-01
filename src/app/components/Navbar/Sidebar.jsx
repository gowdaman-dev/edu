import React from 'react'
import Link from 'next/link'
import { IoMdPerson } from "react-icons/io";
import { IoLibrarySharp,IoSchoolSharp } from "react-icons/io5";
import { MdSupervisorAccount } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import "./nav.css"

import { InlineIcon } from '@iconify/react'
function Slidebar({show}) {

  return (
    <div className={ show ? 'flex show active':'show'}>
    <div className="navbar min-w-[300px] h-screen">
        <div className="w-[100%] flex justify-center">
            <ul className='w-[100%] flex flex-col ' >
                <button className='bg-white px-3 mb-5 ml-5  rounded-full text-[--web-primary-color] hover:text-teal-400 shadow-[0px_0px_4px_0px] shadow-[--web-primary-color] w-fit text-lg font-semibold flex items-center justify-center gap-2'><InlineIcon icon="ph:plus-bold" height="20" width="20" /> Add Member</button>
                <li className='w-[80%] p-[10px] mb-1 rounded-r-full text-lg hover:text-white  hover:bg-teal-700  '>

                    <Link href={"/"} className='flex items-center gap-3 ' >
                    <MdSupervisorAccount size={25} />

                        <h2>Member List</h2>
                    </Link>
                </li>
                <li className=' w-[80%] p-[10px] mb-1 rounded-r-full text-lg hover:text-white hover:bg-teal-700 '>

                    <Link href={"/"} className='flex items-center gap-3 ' >
                    <IoLibrarySharp  size={25}/>
                            
                        <h2>Shared library</h2>
                    </Link>
                </li>
                <li className=' w-[80%] p-[10px] mb-1 rounded-r-full text-lg hover:text-white hover:bg-teal-700 '>

                    <Link href={"/"} className='flex items-center gap-3 ' >
                    <IoSchoolSharp size={25} />

                        <h2>school information</h2>
                    </Link>
                </li>
                <li className=' w-[80%] p-[10px] mb-1 rounded-r-full text-lg hover:text-white hover:bg-teal-700 '>

                    <Link href={"/"} className='flex items-center gap-3 ' >
                        <IoMdPerson size={25} />

                        <h2>Acount Information</h2>
                    </Link>
                </li>
                <li className=' w-[80%] p-[10px] mb-3 rounded-r-full text-lg hover:text-white hover:bg-teal-700 '>

                    <Link href={"/"} className='flex items-center gap-3 ' >
                    <RiLogoutCircleRLine size={25} />

                        <h2>Logout</h2>
                    </Link>
                </li>
            </ul>

        </div>
    </div>
   
</div>
  )
}

export default Slidebar