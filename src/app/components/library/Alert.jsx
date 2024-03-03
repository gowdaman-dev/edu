import React from 'react'

function Alert({msg,title,click}) {
  return (
    <div className='absolute flex justify-center top-10 '>
    <div className='  items-center justify-center h-52  w-96 backdrop-blur-sm  z-[60] rounded-2xl  border-gray-200 border-2   grid grid-cols-6 grid-rows-10 grid-flow-col bg-white'>
    
      <span className='row-span-2 col-span-6 text-3xl text-[--web-primary-color] text-red-600 flex 
      justify-center '>
{title}
      </span>
      <span className='flex flex-col justify-center h-full col-span-6 row-span-5 gap-5 text-center text-sm md::text-base bg-red-100 rounded-lg mx-2 px-4'>
          {msg}
       
       
      </span>
      <button className='bg-red-500 p-2 rounded-lg text-white  row-start-9 col-start-3 col-span-2  ' onClick={()=>click(false)}>
        Okay
      </button>
    </div>
  </div>
  )
}

export default Alert