'use client'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FaBars, FaCircleChevronRight } from 'react-icons/fa6'
function page() {
  const [homemenusrl, setHomemenusrl] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', async () => {
      if (window.scrollY >= 50) {
        await setHomemenusrl(true)
        console.log(homemenusrl);
        return
      } if (window.scrollY <= 49) {
        await setHomemenusrl(false);
        console.log(homemenusrl);
      }
      console.log(window.scrollY);
      return
    })
  })
  const [homemenu, setHomemenu] = useState(false)
  return (
    <div className='w-screen h-fit'>
      <div className="nav w-screen flex justify-between">
        <Image src={'/mailimg.jpg'} height={240} hidden width={850} alt=''></Image>
      </div>
      <div className={` homenav fixed px-8 w-screen py-4 flex items-center justify-between transition-color ease-linear duration-500 ${homemenusrl?'bg-white text-gray-800 border-b':''} `}>
        <div className="flex items-center justify-center gap-2">
          <Image src={'/logos/logo.svg'} height={40} width={40} alt='' />
          <h1 className='text-lg font-semibold text-[--web-primary-color] md:flex hidden'>EDULEARN</h1>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <div className={`md:flex hidden items-center justify-center gap-2 ${homemenusrl?'text-gray-800':'text-white'}`}>
            <Link className='p-2 px-4 tracking-widest hover:text-gray-300 transition-color duration-5000 ease' href={'#home'}>Home</Link>
            <Link className='p-2 px-4 tracking-widest hover:text-gray-300 transition-color duration-5000 ease' href={'#service'}>Service</Link>
            <Link className='p-2 px-4 tracking-widest hover:text-gray-300 transition-color duration-5000 ease' href={'#contact'}>Content</Link>
          </div>
          <AnimatePresence mode='wait'>
            {
              homemenu && (
                <motion.div initial={{ y: "-100px", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100px", opacity: 0 }} transition={{ ease: 'linear', duration: .5 }} className="flex fixed top-0 right-0 w-screen h-fit bg-white border-b py-8 flex-col md:hidden items-center justify-center gap-2">
                  <Link onClick={() => setHomemenu(false)} className='p-2 px-4 tracking-widest text-gray-800 hover:text-[--web-primary-color] transition-color duration-5000 ease' href={'#home'}>Home</Link>
                  <Link onClick={() => setHomemenu(false)} className='p-2 px-4 tracking-widest text-gray-800 hover:text-[--web-primary-color] transition-color duration-5000 ease' href={'#service'}>Service</Link>
                  <Link onClick={() => setHomemenu(false)} className='p-2 px-4 tracking-widest text-gray-800 hover:text-[--web-primary-color] transition-color duration-5000 ease' href={'#contact'}>Content</Link>
                </motion.div>
              )
            }
          </AnimatePresence>
          <Link className={`p-2 ${homemenusrl?'bg-[--web-primary-color] text-gray-800 border-none hover:bg-[--web-primary-color]':'border border-white'} px-4 tracking-widest rounded-xl hover:text-[--web-primary-color] hover:bg-white transition-color duration-500 ease-in-out text-white`} href={'/signin'}>SignIn</Link>
          {homemenu ? <AiOutlineClose onClick={() => setHomemenu(false)} className='relative z-[10] block md:hidden text-2xl' /> : <FaBars onClick={() => setHomemenu(true)} className='relative z-[10] block md:hidden text-2xl' />}
        </div>
      </div>
      <section id="home" className='w-screen h-fit flex md:flex-row flex-col px-8 py-8 py-[6rem] bg-[url(/hero_shape.png)] bg-[center] bg-cover bg-blue-300 items-center md:justify-between justify-center'>
        <div className="md:w-[50%] w-full h-full grid place-items-center">
          <div className="flex w-full flex-col items-start gap-2">
            <h1 className='md:text-6xl space-2 text-4xl tracking-wide text-gray-700 font-black'>Welcome <br />To Our Best <br /> E Learning Platform </h1>
            <Link href={'/recomend'} className='flex items-center justify-center gap-2 px-6 py-4 mt-2 text-white rounded-full bg-[--web-primary-color]'>Get Start your journey<FaCircleChevronRight /></Link>
            <p className='px-6'>Are You A User? <Link href={'signin'} className='text-[--web-primary-color]'>SignIn here!</Link></p>
          </div>
        </div>
        <div className=" md:w-[50%] w-full px-8 h-full">
          <Image src={'/homeimg.svg'} width={200} height={200} className='h-full w-full' alt='' />
        </div>
      </section>
      <section className='flex w-screen min-h-screen p-8 bg-blue-50' id='service'>
        <div className="flex flex-col gap-4">
          <h2 className='text-4xl text-gray-800 font-semibold'>We have
            The Most Quality
            Featured LMS</h2>
          <p className='text-xl text-gray-600 font-light'>Gain access to a vast repository of educational resources uploaded by your school's dedicated teachers. From lecture notes to study guides, our platform ensures you never miss important materials.</p>
        </div>
      </section>
    </div>
  )
}

export default page