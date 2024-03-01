"use client"
import React, { useState } from 'react'
import { webName } from "@/app/components/globalDetails";


function page() {
    const [next, setNext] = useState(false)
    const [Resetpass, setResetpass] = useState(false)

    function handlesubmit(e) {
        e.preventDefault();
        if (e.target.ResetEmail != "") {
            setNext(true)
        }

    }
    function handlefinal(e) {
        if (e.target.otp != "") {
            setResetpass(true)
        }


    }

    return (
        <div className="grid place-items-center w-screen h-screen">
            <div className="flex flex-col gap-4 sm-[600px] w-full px-8 items-center justify-center">
                <div className='text-sm font-light text-center w-full' action="" method="post">
                    <h1 className='text-6xl font-semibold text-[--web-primary-color] mb-2'>{webName}</h1>
                    <h2 className='text-xl font-semibold text-gray-700'>RESET PASSWORD</h2>
                    <p className='text-sm font-light text-center'>Please enter your email address below.</p>
                    <form action="" className='flex flex-col gap-2 items-center py-4 w-full' method="post">
                        <input type="email" className="border outline-none focus:outline focus:outline-blue-200 rounded-lg px-2 py-2 w-full " placeholder='email' />
                        <input type="submit" className="border outline-none focus:outline focus:outline-blue-200 rounded-lg px-2 py-1 bg-[--web-primary-color] text-white w-full py-3 trackint-widest " value={'submit'} />
                    </form>
                    <p className='text-[10px] '>Once you've submitted your email address, you will receive instructions on how to reset your password via email. If you encounter any issues or need further assistance, please contact our support team at [support@example.com]. Thank you!</p>
                </div>
            </div>
        </div>
    )
}

export default page;