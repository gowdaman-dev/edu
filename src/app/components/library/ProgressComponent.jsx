import { IoMdCloudDone } from "react-icons/io"; 
import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

function ProgressComp ({ progressChange,click }) {
const [complete,setComplete]=useState(0)
useEffect(()=>{

  setComplete(progressChange)
},[progressChange])
const iconRender_progress=(
  complete==100 ?<IoMdCloudDone />: <span className=" h-10 w-10 md:h-20 md:w-20 rounded-full bg-[#14b8a6] animate-pulse ">

  </span>
)

  return (
    <div className='relative flex justify-center '>
      <div className='absolute  items-center justify-center md:h-52  md:w-96 backdrop-blur-sm top-7 z-[60] rounded-2xl bg-[#f0e9e931] border-gray-200 border-2 w-52 h-36 grid grid-cols-4 grid-rows-9 grid-flow-col bg-white'>
        <span className='flex justify-end col-span-1 col-end-5 text-3xl ' onClick={()=>click(false)}>
          <AiOutlineCloseCircle />
        </span>
        <span className='row-span-4 col-span-4 text-5xl text-[#008c8c] flex justify-center'>{iconRender_progress}

        </span>
        <section className='flex flex-col justify-center h-full col-span-4 row-span-4 gap-5'>
          <span className='self-center duration-1000 ease-in ransition-all'>
            Uploading:{progressChange}%
          </span>
          <span className='w-[80%] flex ml-[10%]'>
            <span
              style={{ width: progressChange + '%' }}
              className='self-start block h-2 transition-all duration-500 ease-in bg-teal-400 rounded-3xl'
            ></span>
          </span>
        </section>
      </div>
    </div>
  )
}

export default ProgressComp
