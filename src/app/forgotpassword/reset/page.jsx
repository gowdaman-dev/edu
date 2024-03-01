"use client"
import React, { useState } from 'react'
import { webName } from "@/app/components/globalDetails";
import { AnimatePresence, motion } from 'framer-motion';

function page() {
    const [resetEmail, setResetEmail] = useState('')
    const [emailVerification, setEmailVerification] = useState(false)
    const [Resetpass, setResetpass] = useState(false)
    const [error, setError] = useState('')
    const VericationEvent = async (e) => {
        e.preventDefault()
        if (!resetEmail){
            setError("Please enter your email")
            setInterval(() => {
                setError('')
            }, 6000);
            return
        }
        await fetch('/api/userExists', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: resetEmail })
        }).then((data) => {
            if (data.status == 200) {
                setEmailVerification(true)
            }
            else {
                setError("Email doesn't exist!")
                setInterval(() => {
                    setError('')
                }, 4000)
            }
        })
    }
    return (
        <div className="grid place-items-center w-screen h-screen">
            <div className="flex flex-col gap-4 sm:w-[600px] w-full px-8 items-center justify-center">
                <AnimatePresence mode='wait'>
                    {
                        error && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ ease: "linear", duration: .5 }} className='px-10 py-4 border-b-2 border-[--web-primary-color] rounded-b-lg absolute top-0 mx-auto'>{error}</motion.p>
                        )
                    }
                </AnimatePresence>
                <div className='text-sm font-light text-center w-full' action="" method="post">
                    <h1 className='text-6xl font-semibold text-[--web-primary-color] mb-2'>{webName}</h1>
                    <h2 className='text-xl font-semibold text-gray-700'>RESET PASSWORD</h2>
                    {
                        !emailVerification && (
                            <>
                                <p className='text-sm font-light text-center'>Please enter your email address below.</p>
                                <form onSubmit={VericationEvent} className='flex flex-col gap-2 items-center py-4 w-full' method="post">
                                    <input onChange={(e) => setResetEmail(e.target.value)} type="email" className="border outline-none focus:outline focus:outline-blue-200 rounded-lg px-2 py-2 w-full " placeholder='Enter your email...' />
                                    <input type="submit" className="border outline-none focus:outline focus:outline-blue-200 rounded-lg px-2 py-1 bg-[--web-primary-color] text-white w-full py-3 trackint-widest " value={'submit'} />
                                </form>
                            </>
                        )
                    }
                    {
                        emailVerification && (
                            <>
                                <p className='text-sm font-light text-center'>Check your mail inbox ( <strong>{resetEmail}</strong> ) and Enter your One Time Password for verification</p>

                            </>
                        )
                    }
                    <p className='text-[10px] '>Once you've submitted your email address, you will receive instructions on how to reset your password via email. If you encounter any issues or need further assistance, please contact our support team at [support@example.com]. Thank you!</p>
                </div>
            </div>
        </div>
    )
}

export default page;