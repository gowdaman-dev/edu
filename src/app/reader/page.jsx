import React from 'react'
import { IoClose } from "react-icons/io5";

import Navbar from '../components/readercomp/Navbar'
import HeadBar from '../components/readercomp/HeadBar'
function page() {

/* const shadow = {
 
  background: '#f3fff8',
  WebkitBoxShadow: '12px 12px 6px #c2ccc6, -12px -12px 6px #ffffff',
  boxShadow: '12px 12px 6px #c2ccc6, -12px -12px 6px #ffffff',
}; */

  return (
    <div className="h-screen">
      <header className='h-[60px] border-b-[1px] border-[#008C8C] '>
      <HeadBar/>
      </header>
      <main  className='flex justify-center h-[90%] '>
      <section style={shadow} className='h-full sm:h-[500px] md:drop-shadow-none w-screen md:w-[70%] xl:w-[840px]  mt-20 md:rounded-xl '>

        <section className='flex items-center justify-end h-12 pr-2 text-2xl'>
<IoClose />


        </section>
        <section className='h-full'>
<textarea className='w-full h-full ml-4 bg-transparent outline-none resize-none'/>
        </section>
      </section>
      </main>
    </div>
  )
}

export default page