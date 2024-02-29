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
        <div className=" flex  items-center justify-center p-4 w-[100vw] h-[100vh] overflow-x-hidden bg-[#F3FFF8]">
            <div className="absolute top-0 left-0 z-0 w-screen h-screen overflow-hidden">
                <div className="absolute md:-top-[150px] md:-left-[150px] -top-[50px] -left-[50px] h-fit w-fit opacity-[.5]">
                    <div className="md:h-[300px] h-[150px] md:w-[300px] w-[150px] rounded-full bg-gradient-to-tr from-[--web-primary-color] to-[#F3FFF8] absolute top-0 md:left-[100px] left-[50px]"></div>
                    <div className="md:h-[300px] h-[150px] md:w-[300px] w-[150px] rounded-full bg-gradient-to-tr from-[--web-primary-color] to-[#F3FFF8] absolute md:top-[100px] top-[50px] left-0"></div>
                </div>
                <div className="absolute md:-bottom-[150px] md:-right-[150px] -bottom-[60px] -right-[60px] h-fit w-fit opacity-[.5] ">
                    <div className="md:h-[300px] h-[150px] md:w-[300px] w-[150px] rounded-full bg-gradient-to-tr from-[--web-primary-color] to-[#F3FFF8] absolute bottom-0 md:right-[100px] right-[50px]"></div>
                    <div className="md:h-[300px] h-[150px] md:w-[300px] w-[150px] rounded-full bg-gradient-to-tr from-[--web-primary-color] to-[#F3FFF8] absolute md:bottom-[100px] bottom-[50px] right-0"></div>
                </div>
            </div>
            <div className=" z-[2]  sm:w-[600px] w-full h-fit p-5">
                <div className="  flex flex-col justify-center items-center">
                    <h2 className="text-4xl font-semibold font-medium py-2 text-[--web-primary-color]">{webName}</h2>
                    <div className="flex items-center justify-center">
                        <h2 className="text-3xl font-medium py-2 text-[#0B1770]">Reset Password</h2>
                    </div>
                    <p className='text-sm font-light w-full py-2 text-center'>Welcome to the password reset page. Please enter your email address below to initiate the password reset process.</p>

                </div>
                {
                    Resetpass ?
                        <>
                            <div className="">
                                <form className="flex flex-col gap-2">
                                    <input type="text" name="reset password" placeholder="Enter New Password" className="border rounded-md p-2" />

                                    <input type="text" name="conform password" placeholder="Conform Password" className="border rounded-md p-2" />

                                    <button className="rounded-md p-2  bg-[--web-primary-color] text-white">
                                        Change Password
                                    </button>
                                </form>
                            </div>
                        </> :

                        <div className=" ">
                            <form onSubmit={handlesubmit} className="flex flex-col justify-center items-center gap-4">
                                <input type="text" name="ResetEmail" onChange={(e) => handleinput(e)} placeholder="Your Email .. " className="border rounded-md p-2 w-[70%]" />
                                <div className="w-full">
                                    {next ? <>
                                        <div className="flex gap-1">
                                            <form className='w-[80%]' action="/">
                                                <input type="text" name="otp" onChange={(e) => handleinput(e)} placeholder="Enter Valid OTP" className="border rounded-md p-2 " />
                                            </form>
                                            <div className="w-[20%]">
                                                <button className="w-full border p-2 rounded-md ">
                                                    Resend OTP
                                                </button>
                                            </div>
                                        </div>
                                    </> : null}
                                </div>
                                <button type="submit" onDoubleClick={handlefinal} className="p-2 rounded-md  w-[70%] bg-[--web-primary-color] text-white cursor-pointer  "  >Next</button>
                            </form>
                        </div>
                }
                <p className='py-2 text-[12px] font-light w-full text-gray-700 text-center mx-auto'>
                    Once you've submitted your email address, you will receive instructions on how to reset your password via email. If you encounter any issues or need further assistance, please contact our support team at [support@example.com]. Thank you!
                </p>
            </div>

        </div>
    )
}

export default page;