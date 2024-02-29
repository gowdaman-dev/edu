"use client"
import { GiPadlock } from "react-icons/gi";
import React, { useState } from 'react'
import Image from 'next/image';


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
            <div className=" z-[2]  w-[80%] h-fit p-5">
                <div className="  flex flex-col justify-center items-center">
                    <GiPadlock size={50} />
                    <h2 className="text-3xl font-medium py-2 text-[#0B1770]">Reset Password</h2>

                </div>
                {
                    Resetpass ?
                        <>
                            <div className="">
                                <form action="" className="flex flex-col gap-2">
                                    <input type="text" name="reset password" placeholder="Enter New Password" className="border rounded-md p-2" />

                                    <input type="text" name="conform password" placeholder="Conform Password" className="border rounded-md p-2" />

                                    <button className="rounded-md p-2  bg-[--web-primary-color] text-white">
                                        Change Password
                                    </button>
                                </form>
                            </div>
                        </> :

                        <div className=" ">
                            <form action="/" onSubmit={handlesubmit} className="flex flex-col justify-center items-center gap-4">
                                <input type="text" name="ResetEmail" onChange={(e) => handleinput(e)} placeholder="Your Email .. " className="border rounded-md p-2 w-[70%]" />
                                <div className="w-[70%]">

                                    {next ? <>
                                        <div className="flex gap-1">
                                            <form action="/">
                                                <input type="text" name="otp" onChange={(e) => handleinput(e)} placeholder="Enter Valid OTP" className="border rounded-md p-2 " />
                                            </form>
                                            <div className="">
                                                <button className="border p-2 rounded-md  ">
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


            </div>

        </div>
    )
}

export default page;