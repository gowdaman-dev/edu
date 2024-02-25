import { AiOutlineClose } from "react-icons/ai"; 
import { IoMdCheckmark } from "react-icons/io"; 
import { IoMdCloudDone } from "react-icons/io"; 
import React, { useEffect, useState } from 'react'

function ProgressComp ({ progressChange,click,title ,icon}) {
const [complete,setComplete]=useState(0)
useEffect(()=>{

  setComplete(progressChange)
},[progressChange])
const iconRender_progress=(
  complete==100 ? icon=="upload"?<IoMdCloudDone />:<IoMdCheckmark />: <span className=" h-10 w-10 md:h-20 md:w-20 rounded-full bg-[--web-primary-color] animate-pulse ">

  </span>
)

  return (
    <div className='relative flex justify-center '>
      <div className='absolute  items-center justify-center md:h-52  md:w-96 backdrop-blur-sm top-7 z-[60] rounded-2xl  border-gray-200 border-2 w-52 h-36 grid grid-cols-4 grid-rows-9 grid-flow-col bg-white'>
        <span className='flex justify-end col-span-1 col-end-5 text-2xl p-2  mt-4 text-gray-500' onClick={()=>click(false)}>
         <AiOutlineClose />
        </span>
        <span className='row-span-4 col-span-4 text-5xl text-[--web-primary-color] flex justify-center'>{iconRender_progress}

        </span>
        <section className='flex flex-col justify-center h-full col-span-4 row-span-4 gap-5'>
          <span className='self-center duration-1000 ease-in ransition-all'>
            {title}{progressChange}%
          </span>
          <span className='w-[80%] flex ml-[10%]'>
            <span
              style={{ width: progressChange + '%' }}
              className='self-start block h-2 transition-all duration-500 ease-in bg-[--web-primary-color] rounded-3xl'
            ></span>
          </span>
        </section>
      </div>
    </div>
  )
}

export default ProgressComp
