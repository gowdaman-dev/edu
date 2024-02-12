'use client'
import React, { useEffect, useState } from 'react'
import bcrypt from 'bcryptjs'
function page({ params }) {
    const { user } = params;
    const [currentpass, setCurrentpass] = useState({
        password: "",
        conform: ""
    })
    const [error, seterror] = useState('')
    console.log(user)
    const resetPassword = async (e)=>{
        e.preventDefault();
        const match = await currentpass.password === currentpass.conform;
        if(!match){
            seterror("your new password dosen't match")
            return
        }
        try{
            const res = await fetch('/api/userinfo' , {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({id:user})
            })
            const {password} = await res.json();
            const passverify = bcrypt.compare(currentpass.password , password);
            if(!passverify){
                seterror('Invalid password')
                return
            }
            
        }catch(err){

        }
    }
    return (
        <div className='h-screen w-screen grid place-items-center'>
            <div className="flex flex-col items-center justify-center rounded-lg p-4 md:max-w-[600px] w-[90%] gap-2">
                <h1 className='text-purple-800 text-6xl uppercase font-bold'>Edulearn</h1>
                <h2 className='text-2xl text-gray-900 font-semibold'>Reset your Password</h2>
                <p className='text-gray-800 font-[200] text-[12px]'>Caution : don't share your reset password link .</p>
                <form onSubmit={resetPassword} action="" className='flex flex-col items-center justify-center gap-4 w-full' method="post">
                    <input type="password" className='md:w-[300px] rounded-lg w-full outline-none border p-2' placeholder='Current Password' />
                    <input onChange={(e) => setCurrentpass({ ...currentpass, password: e.target.value })} type="password" className='md:w-[300px] rounded-lg w-full outline-none border p-2' placeholder='New Password' />
                    <input onChange={(e) => setCurrentpass({ ...currentpass, conform: e.target.value })} type="password" className='md:w-[300px] rounded-lg w-full outline-none border p-2' placeholder='Conform New Password' />
                    <input type="submit" className='cursor-pointer md:w-[300px] rounded-lg w-full outline-none border p-2 bg-purple-800 text-white' value={'reset password'} />
                </form>
            </div>
        </div>
    )
}

export default page