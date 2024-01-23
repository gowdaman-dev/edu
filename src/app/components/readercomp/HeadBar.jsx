'use client'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { FaRegCirclePause } from "react-icons/fa6";
import { MdOutlineReplay } from "react-icons/md";
import { FaPlayCircle,FaBackward,FaForward } from 'react-icons/fa'
function HeadBar () {
  const [isPlay, setIsPlay] = useState(false)

  return (
    
      <ul className='flex justify-around items-center h-full '>
        <li className='grow  flex justify-center gap-x-10 sm:gap-x-20'>
           {/*  //backword */}
          <span className='text-3xl mt-[6px] text-[#008C8C]'><FaBackward /></span>
          <span onClick={()=>setIsPlay(!isPlay)} className='text-[#008C8C] text-4xl'>{isPlay ?<FaRegCirclePause />:<FaPlayCircle />}</span>
          {/* forward */}
          <span  className='text-3xl mt-[6px] text-[#008C8C]'><FaForward /></span>

        </li>
        <li className='text-black text-3xl mr-4'>
          <BsThreeDots />
        </li>
      </ul>
 
  )
}

export default HeadBar
