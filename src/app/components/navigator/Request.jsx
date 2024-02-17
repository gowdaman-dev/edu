import React, { useEffect, useRef, useState } from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
function Requestform({ close }) {
    const inner = useRef()
    const {data:session} = useSession()
    const RejectedRequest = async () =>{
        try {
            const resexist = await fetch('/api/userExists', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ email })
            })
            const { user } = await resexist.json()
            if (user !== null) {
                setError('Account Already exist')
                return
            }
        } catch (error) {
            console.log(error);
        }
    }
    const Acceptedrequest = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ name, email, password, standard , school:session?.user?.school, role })
            })
            if (res.ok) {
                const form = await e.target;
                form.reset();
                close(false)
                return
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        let handler = (e) => {
            try {
                if (!inner.current.contains(e.target)) {
                    close(false)
                }
            } catch (error) {

            }
        }
        window.addEventListener('mousedown', handler)
    })
    return (
        <motion.div initial={{ opacity: .4 }} animate={{ opacity: 1 }} transition={{ type: 's pring', duration: .5 }} exit={{ opacity: 0 }} className='fixed top-0 left-0 h-full w-full bg-gray-600/[.6] grid place-items-center'>
            <div className="absolute top-0">
                {
                    error && (
                        <motion.p initial={{ opacity: .5, y: '-40px' }} animate={{ opacity: 1, y: '0px' }} transition={{ type: 'spring', duration: .5 }} className='text-red-400 bg-white px-4 py-2 border-b rounded-lg border-red-500'>{error}</motion.p>
                    )
                }
            </div>
            <motion.div initial={{ scale: .7, opacity: .4 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', duration: .5 }} exit={{ scale: .7, opacity: 0 }} ref={inner} className="md:w-1/2 h-fit overflow-y-scroll bg-white rounded-lg flex flex-col p-2 py-4">
                <IoIosCloseCircleOutline className='text-2xl' onClick={() => close(false)} />
                <h1 className='text-center text-xl text-gray-700 font-medium py-2'>Add User Manually</h1>
                <div className=""></div>
            </motion.div>
        </motion.div>
    )
}

export default Requestform