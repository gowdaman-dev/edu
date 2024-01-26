'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { InlineIcon } from '@iconify/react'
import { motion } from 'framer-motion'
function Navigator({ children }) {
    const [adder, setAdder] = useState(false)
    const addervarient = {
        initial: {
            width: 0,
            opacity: 0,
            transition: { duration: .5, ease: 'linear' }
        },
        enter: {
            width: '100%',
            opacity: 1,
            transition: { duration: .5, ease: 'linear' }
        },
    };
    const addermenuref = useRef('')
    useEffect(()=>{
        let handler = (e)=>{
            if (!addermenuref.current.contains(e.target)){
                setAdder(false)
                console.log(addermenuref.current);
            }
        }
        document.addEventListener("mousedown",handler)
    })
    return (
        <div className='w-screen h-fit'>
            <div className="flex px-10 py-4 justify-between items-center">
                <div className=" flex items-center justify-center gap-2">
                    <Image className='' src={'/icons/menu.svg'} height={30} width={30} alt='menu' />
                    <div className=" flex items-center justify-center gap-2">
                        <Image src={'/logos/logo.svg'} height={30} width={30} alt='logo' />
                        <h1 className='font-bold tex-gray-900 text-lg'>Edulearn</h1>
                    </div>
                </div>
                <div className="flex bg-[#92D1CD99] px-2 rounded-lg items-center">
                    <InlineIcon className='text-gray-600' icon="tdesign:search" height="25" width="25" />
                    <input type="text" className='w-[300px] bg-transparent outline-none px-2 py-1 text-gray-700' placeholder='Search' />
                </div>
                <div className="flex">
                    <select className='px-2 py-2 rounded-lg bg-white shadow-[0px_0px_2px_0px_var(--green-mild)] ' name="" id="">
                        <option value="1">Grade 1 </option>
                        <option value="add"> Add Grade </option>
                    </select>
                </div>
            </div>
            <div className="flex">
                <div className="navbar min-w-[300px] h-screen">
                    <div className="w-[100%] flex justify-center">
                        <ul className='flex item-center font-light flex-col py-4 justify-center gap-0'>
                            <button onClick={() => setAdder(!adder)} className='bg-white px-2 rounded-full text-[--web-primary-color] hover:text-teal-400 shadow-[0px_0px_4px_0px] shadow-[--web-primary-color] w-fit text-xl flex items-center justify-center gap-3'><InlineIcon icon="ph:plus-bold" height="20" width="20" /> Add Member</button>
                            {
                                adder && (
                                    <motion.div ref={addermenuref} animate={adder ? 'enter' : 'initial'} variants={addervarient} className="py-2 px-4 bg-white flex flex-col gap-2 bg-transparent mt-3 z-[2] relative rounded-lg shadow">
                                        <button>Add Manually</button>
                                        <button>Request</button>
                                    </motion.div>
                                )
                            }
                        </ul>
                    </div>
                </div>
                <div className="w-[100%] min-h-screen">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Navigator