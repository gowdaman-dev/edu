'use client'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { FaRegCirclePause } from "react-icons/fa6";
import { MdOutlineReplay } from "react-icons/md";
import { FaPlayCircle,FaBackward,FaForward } from 'react-icons/fa'
function HeadBar () {
  const [isPlay, setIsPlay] = useState(false)

  return (
    
      <ul className='flex items-center justify-around h-full '>
        <li className='flex justify-center grow gap-x-10 sm:gap-x-20'>
           {/*  //backword */}
          <span className='text-2xl mt-[6px] text-[#008C8C]'><FaBackward /></span>
          <span onClick={()=>setIsPlay(!isPlay)} className='text-[#008C8C] text-3xl'>{isPlay ?<FaRegCirclePause />:<FaPlayCircle />}</span>
          {/* forward */}
          <span  className='text-2xl mt-[6px] text-[#008C8C]'><FaForward /></span>

        </li>
        <li className='mr-4 text-2xl text-gray-700'>
          <BsThreeDots />
        </li>
      </ul>
 
  )
}

export default HeadBar