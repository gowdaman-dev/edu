'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState, useContext } from 'react'
import { AiOutlineDown, AiOutlineMenu, AiOutlineSearch, AiOutlineUp } from 'react-icons/ai'
import { grades } from './Navjson'
import { AnimatePresence, motion } from 'framer-motion'
import { UserContext } from '@/ContextUser'
import { useSession } from 'next-auth/react'
import { AiOutlineClose } from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import useSWR from 'swr'
function NavBar() {
    const { data: session } = useSession();
    const [grade, setGrade] = useState(grades[0])
    const [showgrade, setShowGrade] = useState(false)
    const {
        nav,
        setnav,
        navmob,
        setnavmob,
        setNavSearch,
        navGrade,
        setNavGrade,
        schoolfiltertoggle,
        schoolFilter,
        setSchoolFilter
    } = useContext(UserContext)
    const grademenuref = useRef();
    const grademenulistref = useRef();
    const path = usePathname();
    useEffect(() => {
        let handler = (e) => {
            try {
                if (!grademenuref.current.contains(e.target)) {
                    setShowGrade(false)
                }
            } catch (error) {

            }
        }
        window.addEventListener('click', handler)
        window.addEventListener('resize', () => {
            if (window.screenX <= 720) {
                setnav(false)
            }
        })
    })
    const { data: schoolListData } = useSWR('/api/schoolList', async () => {
        const response = await fetch('/api/schoolList', {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json'
            },
            cache: 'no-store', next: { revalidate: 0 }
        });
        const data = await response.json();
        return data;
    });
    const [schoolfilterdata, setSchoolFilterData] = useState({})

    useEffect(() => {
        fetch('/api/schoolList', {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json'
            },
            cache: 'no-store', next: { revalidate: 0 }
        }).then((data) => data.json()).then((values) => { setSchoolFilterData(values); }).catch((err) => { })
    }, [schoolfiltertoggle])
    const [popsearch, setPopSearch] = useState(false)
    const schoolFilterRef = useRef(null);
    const [schoolFilterToggle, setSchoolFilterToggle] = useState(false);
    return (
        <div className='w-screen py-4 flex justify-between px-4 items-center border-b border-gray-200/[.4]'>
            <div className="flex items-center justify-center gap-4">
                <AiOutlineMenu onClick={() => { setnav(!nav); setnavmob(!navmob) }} className='text-2xl' />
                <Image src={'/logo.svg'} height={34} width={34} alt="" />
                <h1 className='text-[--web-primary-color] text-2xl font-bold md:flex hidden'>
                    <Image src={'/logo2.svg'} height={34} width={68} alt="" />
                </h1>
            </div>
            {
                path == "/dashboard" && (
                    <div className="search md:flex hidden rounded-full bg-gray-200 px-4 py-2">
                        <input onChange={(e) => { setNavSearch(e.target.value) }} type="text" placeholder='search...' className='bg-transparent outline-none text-sm' />
                    </div>
                )
            }
            <AiOutlineSearch className='text-xl md:hidden block' onClick={() => setPopSearch(true)} />
            {
                (popsearch && path == "/dashboard") && (
                    <div className="md:hidden w-screen flex absolute z-[12] top-0 left-0 py-5 bg-white items-center justify-between px-4">
                        <input onChange={(e) => { setNavSearch(e.target.value) }} type="text" placeholder='search...' className='bg-transparent outline-none text-sm' />
                        <AiOutlineClose className="text-xl" onClick={() => setPopSearch(false)} />
                    </div>
                )
            }
            {
                session?.user?.role !== "superadmin" && (
                    <div className="relative flex item-center justify-center">
                        <button ref={grademenuref} onClick={() => setShowGrade(!showgrade)} className='p-2 bg-white rounded-lg shadow text-gray-800'>Grade {navGrade}</button>
                        <AnimatePresence mode='wait'>
                            {
                                (showgrade) && (
                                    <motion.div
                                        initial={{ y: 10, opacity: .6 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 10, opacity: 0 }}
                                        transition={{ duration: .5, type: 'spring' }}
                                        className="flex flex-col z-[4] absolute top-full text-center bg-white rounded-lg shadow px-2 gap-4 py-2 mt-2 h-[300px] w-[90px] overflow-y-scroll">
                                        {
                                            grades.map((item) => {
                                                return <p onClick={() => setNavGrade(item.value)} className='text-sm hover:bg-gray-200 p-1 rounded cursor-pointer' key={item.value}>{item.label}</p>
                                            })
                                        }
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                    </div>
                )
            }
            {
                (path == "/dashboard/library") && (
                    (session?.user?.role === 'superadmin') && (
                        <div className="flex items-center justify-center gap-4" >
                            <div className="relative flex items-center justify-center">
                                <div className=" relative flex flex-col justify-right">
                                    <button
                                        onClick={() => { setSchoolFilterToggle(!schoolFilterToggle); }}
                                        ref={schoolFilterRef}
                                        className='bg-white text-gray-800 p-2 rounded-lg border flex items-center md:text-md text-sm gap-2'
                                    >
                                        {
                                            schoolFilter ? <p className=' max-w-[100px] text-ellipsis whitespace-nowrap overflow-hidden'>{schoolFilter}</p> : ""
                                        }
                                        {
                                            !schoolFilter && (
                                                <p className='flex items-center justify-center'>Filter School {schoolfiltertoggle ? <AiOutlineUp /> : <AiOutlineDown />}</p>
                                            )
                                        }
                                    </button>
                                    {
                                        schoolFilterToggle && (
                                            <div className="absolute right-0 top-full z-[8] mt-2 min-w-[180px] flex flex-col px-2 py-2 bg-white rounded-lg border">
                                                {
                                                    schoolfilterdata.map((item, i) => {
                                                        return <button key={i} onClick={() => { setSchoolFilter(item.schoolname); setSchoolFilterToggle(false) }} className='text-sm text-gray-800 rounded-lg py-1 px-2 text-left px-2 hover:bg-gray-100'>{item.schoolname}</button>
                                                    })
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="relative flex item-center justify-center">
                                <button ref={grademenuref} onClick={() => setShowGrade(!showgrade)} className='p-2 bg-white rounded-lg shadow text-gray-800'>Grade {navGrade}</button>
                                <AnimatePresence mode='wait'>
                                    {
                                        (showgrade) && (
                                            <motion.div
                                                initial={{ y: 10, opacity: .6 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: 10, opacity: 0 }}
                                                transition={{ duration: .5, type: 'spring' }}
                                                className="flex flex-col z-[4] absolute top-full text-center bg-white rounded-lg shadow px-2 gap-4 py-2 mt-2 h-[300px] w-[90px] overflow-y-scroll">
                                                {
                                                    grades.map((item) => {
                                                        return <p onClick={() => setNavGrade(item.value)} className='text-sm hover:bg-gray-200 p-1 rounded cursor-pointer' key={item.value}>{item.label}</p>
                                                    })
                                                }
                                            </motion.div>
                                        )
                                    }
                                </AnimatePresence>
                            </div>
                        </div>
                    )
                )
            }
        </div>
    )
}

export default NavBar