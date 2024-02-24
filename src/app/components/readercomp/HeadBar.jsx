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
        <li className='flex justify-center grow gap-x-10 sm:gap-x-20 text-[--web-primary-color]'>
           {/*  //backword */}
          <span className='text-2xl mt-[6px] '><FaBackward /></span>
          <span onClick={()=>setIsPlay(!isPlay)} className=' text-3xl'>{isPlay ?<FaRegCirclePause />:<FaPlayCircle />}</span>
          {/* forward */}
          <span  className='text-2xl mt-[6px] '><FaForward /></span>

        </li>
      
      </ul>
 
  )
}

export default HeadBar