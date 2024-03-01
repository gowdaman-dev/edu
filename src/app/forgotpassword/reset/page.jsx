"use client"
import React, { useEffect, useState } from 'react'
import { webName } from "@/app/components/globalDetails";
import { AnimatePresence, motion } from 'framer-motion';
import { OtpFields } from 'react-simple-otp-fields';
import { Asul } from 'next/font/google';
import { useRouter } from 'next/navigation';

function page() {
    const [resetEmail, setResetEmail] = useState('')
    const [sendoptstatus, setSendOptStatus] = useState(false)
    const [emailVerification, setEmailVerification] = useState(false)
    const [resetter, setResetter] = useState(false)
    const [newPassword, setNewPassword] = useState(true)
    let [otpResendTimer, setOptResendTimer] = useState(30)
    const [otp, setOtp] = useState([])
    const [otpVerifier, setOtpVerifier] = useState(0)
    const router = useRouter()
    function handleOnChange(val) {
        setOtp(val);
    }

    function handleOnComplete() {
        console.log("Completed");
    }
    useEffect(() => {
        if (otpResendTimer === 0) return;

        const timer = setInterval(() => {
            setOptResendTimer((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [otpResendTimer]);
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };
    const [error, setError] = useState('')
    const VericationEvent = async (e) => {
        setSendOptStatus(true)
        e.preventDefault()
        try {
            if (!resetEmail) {
                setError("Please enter your email")
                setSendOptStatus(false)
                setInterval(() => {
                    setError('')
                }, 6000);
                return
            }
            const existcheck = await fetch('/api/userExists', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: resetEmail })
            })
            if (existcheck.status == 400) {
                setSendOptStatus(false)
                setError("Email doesn't exist!")
                setInterval(() => {
                    setError('')
                }, 4000)
                return
            }
            const sendOTP = await fetch('/api/otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: resetEmail })
            })
            const res = await sendOTP.json()
            if (sendOTP.ok) {
                setOtpVerifier(res.otp)
                setEmailVerification(true)
                setSendOptStatus(false)
                return
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    const resendOTP = async (e) => {
        e.preventDefault()
        const sendOTP = await fetch('/api/otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: resetEmail })
        })
        const res = await sendOTP.json()
        if (sendOTP.ok) {
            setOtpVerifier(res.otp)
            setOptResendTimer(30)
            return
        }
    }
    const otpVerfication = async(e)=>{
        e.preventDefault()
        setSendOptStatus(true)
        if(otp[0]+otp[1]+otp[2]+otp[3] == otpVerifier){
            setResetter(true)
            setSendOptStatus(false)
        }
        else{
            setError('Incorrect OTP')
            setInterval(() => {
                setError('')
            }, 6000);
            setSendOptStatus(false)
            return
        }
    }
    const resetPassword = async(e)=>{
        e.preventDefault()
        setSendOptStatus(true)
        const resetreq = await fetch('/api/forgotpassword',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({password:newPassword , email:resetEmail})
        })
        if (resetreq.ok) {
            router.replace('/signin')
            setSendOptStatus(false)
        }
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
                                    <input onChange={(e) => setResetEmail(e.target.value)} type="email" autoFocus className="border outline-none focus:outline focus:outline-blue-200 rounded-lg px-2 py-2 w-full " placeholder='Enter your email...' />
                                    <input type="submit" className="focus:bg-[--web-primary-color]/[.8]  border outline-none focus:outline focus:outline-blue-200 rounded-lg px-2 py-1 bg-[--web-primary-color] text-white w-full py-3 trackint-widest" disabled={sendoptstatus} value={sendoptstatus ? "processing..." : 'submit'} />
                                </form>
                            </>
                        )
                    }
                    {
                        (emailVerification && !resetter) && (
                            <>
                                <p className='text-sm font-light text-center'>Check your mail inbox ( <strong>{resetEmail}</strong> ) and Enter your One Time Password for verification</p>
                                <form onSubmit={otpVerfication} className='flex flex-col gap-2 items-center py-4 w-full' method="post">
                                    <div className="flex gap-4 sm:justify-between justify-center w-full ">
                                        <OtpFields
                                            containerClasses='w-[80%]'
                                            length={4}
                                            gap={8}
                                            otp={otp}
                                            inputClasses='md:py-2 py-1 w-[50px] sm:w-[100px] border rounded-lg'
                                            onChange={handleOnChange}
                                            onComplete={handleOnComplete}
                                            autoFocus
                                            inputAttr={{
                                                maxLength: 1,
                                                "aria-valuemax": 1,
                                                placeholder: '0',
                                                type: 'number',
                                                pattern: "[0-9]{4}"
                                            }}
                                        />
                                        <button disabled={otpResendTimer}>
                                            <motion.div
                                                onClick={resendOTP}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.5 }}
                                                className="border-blue-400 text-blue-500 cursor-pointer font-sm text-white py-1 px-2 rounded-md w-[140px] sm:w-full text-center"
                                            >
                                                {otpResendTimer ? "Resend in " + formatTime(otpResendTimer) : "resend"}
                                            </motion.div>
                                        </button>
                                    </div>
                                    <input type="submit" value={sendoptstatus ? "Verifing..." : 'Verify'} className="focus:bg-[--web-primary-color]/[.8]  border outline-none focus:outline focus:outline-blue-200 rounded-lg px-2 py-1 bg-[--web-primary-color] text-white w-full py-3 trackint-widest" disabled={sendoptstatus} />
                                </form>
                            </>
                        )
                    }
                    {
                        (resetter) && (
                            <>
                                <p className='text-sm font-light text-center'>Please enter your email address below.</p>
                                <form onSubmit={resetPassword} className='flex flex-col gap-2 items-center py-4 w-full' method="post">
                                    <input onChange={(e) => setNewPassword(e.target.value)} type="password" autoFocus className="border outline-none focus:outline focus:outline-blue-200 rounded-lg px-2 py-2 w-full " placeholder='Enter your email...' />
                                    <input type="submit" className="focus:bg-[--web-primary-color]/[.8]  border outline-none focus:outline focus:outline-blue-200 rounded-lg px-2 py-1 bg-[--web-primary-color] text-white w-full py-3 trackint-widest" disabled={sendoptstatus} value={sendoptstatus ? "resetting..." : 'Reset Password'} />
                                </form>
                            </>
                        )
                    }
                    <p className='text-[10px] '>Once you've submitted your email address, you will receive instructions on how to reset your password via email. If you encounter any issues or need further assistance, please contact our support team at [support@example.com]. Thank you!</p>
                </div>
            </div>
        </div>
    )
}

export default page