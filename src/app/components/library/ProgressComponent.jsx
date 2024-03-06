import { AiOutlineCloudUpload } from "react-icons/ai"; 
import { CgTranscript } from "react-icons/cg"; 
import { BsFillFileTextFill } from "react-icons/bs"; 
import { MdAudiotrack } from "react-icons/md"; 

import React, { useEffect, useState } from 'react'
import { AnimatePresence,motion } from "framer-motion";
function ProgressComp ({ progressChange}) {
const [complete,setComplete]=useState(0)
useEffect(()=>{

  setComplete(progressChange)
},[progressChange])
const iconRender_progress=(
  progressChange.icon=="extract"?<BsFillFileTextFill />:progressChange.icon=="audio"?<MdAudiotrack />:progressChange.icon=="upload"?<AiOutlineCloudUpload />:progressChange.icon=="transcript"?<CgTranscript />:""
 
)

  return (
    <motion.div initial={{ opacity: .4 }} animate={{ opacity: 1 }} transition={{ type: 'spring', duration: .5 }} exit={{ opacity: 0 }}  className='relative flex justify-center top-40 '>
      <div className='absolute   items-center justify-center md:h-52  md:w-96 backdrop-blur-sm top-7  rounded-2xl  border-gray-200 border-2 w-52 h-36 grid grid-cols-4 grid-rows-9 grid-flow-col bg-white'>
        
        <span className='row-span-4 col-span-4 text-5xl text-[--web-primary-color] flex justify-center'>{iconRender_progress}

        </span>
        <section className='flex flex-col justify-center h-full col-span-4 row-span-4 gap-5'>

          <span className='self-center duration-1000 ease-in ransition-all'>
            
            {progressChange.title}{`${ progressChange.state? progressChange.state +" %":progressChange.icon=="upload"?"0":""}`}
          </span>
          <span className='w-[80%] flex ml-[10%]'>
            <span
              style={{ width: progressChange.state + '%' }}
              className='self-start block h-2 transition-all duration-500 ease-in bg-[--web-primary-color] rounded-3xl'
            ></span>
          </span>
        </section>
      </div>
    </motion.div>
  )
}

export default ProgressComp
