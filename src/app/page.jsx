import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaCircleChevronRight } from 'react-icons/fa6'
function page() {
  return (
    <div className='w-screen h-fit'>
      <div className="nav w-screen flex justify-between">
        <Image src={'/mailimg.jpg'} height={240} hidden width={850}></Image>
      </div>
      <div className="homenav fixed px-4 w-screen py-4 flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <Image src={'/logos/logo.svg'} height={40} width={40} />
          <h1 className='text-lg font-semibold text-[--web-primary-color]'>EDULEARN</h1>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Link className='p-2 px-4 tracking-widest text-white hover:text-gray-300 transition-color duration-5000 ease' href={'#home'}>Home</Link>
          <Link className='p-2 px-4 tracking-widest text-white hover:text-gray-300 transition-color duration-5000 ease' href={'#service'}>Service</Link>
          <Link className='p-2 px-4 tracking-widest text-white hover:text-gray-300 transition-color duration-5000 ease' href={'#contact'}>Content</Link>
          <Link className='p-2 px-4 tracking-widest shadow rounded-xl hover:text-purple-800 hover:bg-white transition-color duration-500 ease-in-out text-white border border-white' href={'/signin'}>SignIn</Link>
        </div>
      </div>
      <section id="home" className='w-screen min-h-screen flex md:flex-row flex-col px-4 bg-[url(/hero_shape.png)] bg-[left] bg-cover bg-[--web-primary-color] items-center justify-between'>
        <div className="w-[50%] h-full grid place-items-center">
          <div className="flex flex-col items-start gap-2">
            <h1 className='text-6xl tracking-wide text-gray-800 font-black'>Welcome <br />To Our Best <br /> E Learning Platform </h1>
            <Link href={'/recomend'} className='flex items-center justify-center gap-2 px-6 py-4 mt-2 text-white rounded-full bg-purple-800'>Get Start your journey<FaCircleChevronRight /></Link>
            <p className='px-6'>Are You A User? <Link href={'signin'}>SignIn here!</Link></p>
          </div>
        </div>
        <div className="w-[50%] h-full">
          <Image src={'/homeimg.svg'} width={200} height={200} className='h-full w-full' />
        </div>
      </section>
    </div>
  )
}

export default page