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
    <div className='min-w-screen overflow-x-hidden h-fit'>
      <div className="nav w-screen flex justify-between">
        <Image src={'/mailimg.jpg'} height={240} hidden width={850} alt=''></Image>
      </div>
      <div className={` homenav fixed px-8 w-screen py-4 flex items-center justify-between transition-color ease-linear duration-500 ${homemenusrl ? 'bg-white text-gray-800 border-b' : ''} `}>
        <div className="flex items-center justify-center gap-2">
          <Image src={'/logos/logo.svg'} height={40} width={40} alt='' />
          <h1 className='text-lg font-semibold text-[--web-primary-color] md:flex hidden'>EDULEARN</h1>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <div className={`md:flex hidden items-center justify-center gap-2 ${homemenusrl ? 'text-gray-800' : 'text-white'}`}>
            <Link className='p-2 px-4 tracking-widest hover:text-gray-300 transition-color duration-5000 ease' href={'#home'}>Home</Link>
            <Link className='p-2 px-4 tracking-widest hover:text-gray-300 transition-color duration-5000 ease' href={'#service'}>Service</Link>
            <Link className='p-2 px-4 tracking-widest hover:text-gray-300 transition-color duration-5000 ease' href={'#features'}>features</Link>
            <Link className='p-2 px-4 tracking-widest hover:text-gray-300 transition-color duration-5000 ease' href={'#contact'}>Content</Link>
          </div>
          <AnimatePresence mode='wait'>
            {
              homemenu && (
                <motion.div initial={{ y: "-100px", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100px", opacity: 0 }} transition={{ ease: 'linear', duration: .5 }} className="flex fixed top-0 right-0 w-screen h-fit bg-white border-b py-8 flex-col md:hidden items-center justify-center gap-2">
                  <Link onClick={() => setHomemenu(false)} className='p-2 px-4 tracking-widest text-gray-800 hover:text-[--web-primary-color] transition-color duration-5000 ease' href={'#home'}>Home</Link>
                  <Link onClick={() => setHomemenu(false)} className='p-2 px-4 tracking-widest text-gray-800 hover:text-[--web-primary-color] transition-color duration-5000 ease' href={'#service'}>Service</Link>
                  <Link onClick={() => setHomemenu(false)} className='p-2 px-4 tracking-widest text-gray-800 hover:text-[--web-primary-color] transition-color duration-5000 ease' href={'#features'}>features</Link>
                  <Link onClick={() => setHomemenu(false)} className='p-2 px-4 tracking-widest text-gray-800 hover:text-[--web-primary-color] transition-color duration-5000 ease' href={'#contact'}>Content</Link>
                </motion.div>
              )
            }
          </AnimatePresence>
          <Link className={`p-2 ${homemenusrl ? 'bg-[--web-primary-color] text-gray-800 border-none hover:bg-[--web-primary-color]' : 'border border-white'} px-4 tracking-widest rounded-xl hover:text-[--web-primary-color] hover:bg-white transition-color duration-500 ease-in-out text-white`} href={'/signin'}>SignIn</Link>
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
      <section id="trusted" className="py-20 bg-white text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-8">Trusted by over 2000+ Students</h2>
          <p className="text-lg text-gray-800">Our platform is trusted by over 2000 students to enhance their learning experience and achieve their educational goals. Join us today and be part of our growing community!</p>
        </div>
      </section>
      <section id="service" className="py-20 bg-blue-50">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="text-center md:text-left px-4 text-gray-800">
            <h2 className="text-4xl font-bold mb-4">Edulearn LMS</h2>
            <p className="text-lg mb-4 font-light">This LMS webpage is developed to enable schools to provide online access to their students. There are three roles in this web project: admin (principal or owner), teacher, and student. The uploaded PDFs can only be viewed by your school. We have integrated a voice API to read the notes in PDFs for you.</p>
          </div>
          <img src="/about01.png" alt="LMS Image" className="md:mr-auto max-w-full md:max-h-full" />
        </div>
      </section>
      <section id="features" className="py-8 px-8">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Admin Role</h3>
              <p className="text-gray-800">As the principal or owner, you have full control over the content and management of the platform. You can create and manage courses, monitor student progress, and customize the learning experience.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Teacher Role</h3>
              <p className="text-gray-800">Teachers can upload educational materials, create assignments, provide feedback to students, and communicate with parents. They can track student performance and collaborate with other educators.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Student Role</h3>
              <p className="text-gray-800">Students can access course materials, submit assignments, participate in discussions, and take assessments. They can track their progress, communicate with teachers, and collaborate with peers.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="services" className="bg-fixed bg-cover bg-[url('/about02.svg')] text-gray-900">
        <div className="container mx-auto text-center py-20 backdrop-blur-lg">
          <h2 className="text-4xl font-black mb-4">services EduLearn</h2>
          <p className="mb-8">EduLearn is a leading online learning platform that helps anyone learn business, software, technology, and creative skills to achieve personal and professional goals. Through individual, corporate, academic, and government subscriptions, members have access to the EduLearn portfolio of course content.</p>
        </div>
      </section>
      <section id="contact" className="py-20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Contact Us</h2>
          <div className="flex justify-center">
            <form className="w-full max-w-lg">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Your Name" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="email" placeholder="Your Email" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Your Message" required></textarea>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3 text-right">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Send Message</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2023 EduLearn. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default page