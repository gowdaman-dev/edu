'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState , useContext } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { grades } from './Navjson'
import { AnimatePresence, motion } from 'framer-motion'
import { UserContext } from '@/ContextUser'
function NavBar() {
    const [grade, setGrade] = useState(grades[0])
    const [showgrade, setShowGrade] = useState(false)
    const {nav , setnav} = useContext(UserContext)
    const grademenuref = useRef();
    const grademenulistref = useRef();
    useEffect(() => {
        let handler = (e) => {
            try {
                if (!grademenuref.current.contains(e.target) && !grademenulistref.current.contains(e.target)) {
                    setShowGrade(false)
                }
            } catch (error) {

            }
        }
        window.addEventListener('click', handler)
        window.addEventListener('resize',()=>{
            if(window.screenX <= 720){
                setnav(false)
            }
        })
    })
    return (
        <div className='w-screen py-2 flex justify-between px-10 items-center border-b border-gray-200/[.4]'>
            <div className="flex items-center justify-center gap-4">
                <AiOutlineMenu onClick={()=>setnav(!nav)} className='text-xl' />
                <Image src={'/logo.svg'} height={30} width={30}></Image>
                <h1 className='text-[--web-primary-color] text-xl font-bold'>EDULEARN</h1>
            </div>
            <div className="search md:flex hidden rounded-full bg-gray-200 px-4 py-2">
                <input type="text" placeholder='search...' className='bg-transparent outline-none text-sm' />
            </div>
            <div className="relative flex item-center justify-center">
                <button ref={grademenuref} onClick={() => setShowGrade(!showgrade)} className='p-2 bg-white rounded-full shadow text-gray-800'>{grade.label}</button>
                <AnimatePresence mode='wait'>
                    {
                        (showgrade) && (
                            <motion.div
                                initial={{ y: 10, opacity: .6 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 10, opacity: 0 }}
                                transition={{ duration: .5, type: 'spring' }}
                                ref={grademenulistref}
                                className="flex flex-col absolute top-full text-center bg-white rounded-lg shadow px-2 gap-4 py-2 mt-2 h-[300px] w-[90px] overflow-y-scroll">
                                {
                                    grades.map((item) => {
                                        return <p className='text-sm hover:bg-gray-200 p-1 rounded cursor-pointer' key={item.value}>{item.label}</p>
                                    })
                                }
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}

export default NavBar