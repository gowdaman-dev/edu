'use client'
import React, { useEffect, useState } from 'react'
import bcrypt from 'bcryptjs'
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
function page({ params }) {
    const { user } = params;
    const [currentpass, setCurrentpass] = useState({
        password: "",
        conform: ""
    })
    const router = useRouter()
    const [oldpass, setoldpass] = useState('')
    const [status, setstatus] = useState('')
    const [error, seterror] = useState('')
    const {data : session } = useSession()
    const resetPassword = async (e) => {
        setstatus('resetting password')
        e.preventDefault();
        const match = await currentpass.password === currentpass.conform;
        if (!match) {
            seterror("your new password dosen't match")
            setstatus('')
            return
        }
        try {
            const res = await fetch('/api/userinfo', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: user })
            })
            const { password } = await res.json();
            console.log(password, user);
            const passverify = await bcrypt.compare(oldpass, password);
            if (!passverify) {
                setstatus('')
                console.log(passverify);
                seterror('Invalid password')
                return
            }
            console.log(passverify);
            const resreset = await fetch('/api/resetpassword', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: user, password: currentpass.password , email:session?.user?.email , name:session?.user?.name })
            })
            if (resreset.ok) {
                console.log("success");
                setstatus('')
                signOut()
                router.replace('/signin')
                return
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='h-screen w-screen grid place-items-center'>
            {
                error && (
                    <p className='absolute top-0 mx-auto py-3 px-4 bg-white rounded-b min-w-[200px] text-center border-b-2 border-purple-800 shadow'>{error}</p>
                )
            }
            <div className="flex flex-col items-center justify-center rounded-lg p-4 md:max-w-[600px] w-[90%] gap-2">
                <h1 className='text-purple-800 text-6xl uppercase font-bold'>Edulearn</h1>
                <h2 className='text-2xl text-gray-900 font-semibold'>Reset your Password</h2>
                <p className='text-gray-800 font-[200] text-[12px]'>Caution : don't share your reset password link .</p>
                <form onSubmit={resetPassword} action="" className='flex flex-col items-center justify-center gap-4 w-full' method="post">
                    <input onChange={(e) => setoldpass(e.target.value)} type="password" className='md:w-[300px] rounded-lg w-full outline-none border p-2' placeholder='Current Password' />
                    <input onChange={(e) => setCurrentpass({ ...currentpass, password: e.target.value })} type="password" className='md:w-[300px] rounded-lg w-full outline-none border p-2' placeholder='New Password' />
                    <input onChange={(e) => setCurrentpass({ ...currentpass, conform: e.target.value })} type="password" className='md:w-[300px] rounded-lg w-full outline-none border p-2' placeholder='Conform New Password' />
                    <input type="submit" className='cursor-pointer md:w-[300px] rounded-lg w-full outline-none border p-2 bg-purple-800 text-white' value={status?status:'reset password'} />
                </form>
            </div>
        </div>
    )
}

export default page