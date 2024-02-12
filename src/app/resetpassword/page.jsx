'use client'
import { useSession } from 'next-auth/react';
import React from 'react'
import { Resend } from 'resend';
const resend = new Resend('re_dk7dPiE8_JX8ttVjGpmmzqRJz8CvVGpTN');

function page() {
  const {data : session} = useSession()
  const mailnow = async (e) => {
    e.preventDefault();
    fetch('/api/mailer',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({email:session?.user?.email , name:session?.user?.name , id:session?.user?.acId})
    }).then(()=>alert('done')).catch((err)=>console.log(err))
  }
  console.log(session?.user)
  return (
    <div className='h-screen w-screen grid place-items-center'>
      <div className="h-fit md:w-[600px] w-[90%] border rounded-lg">
        <h1>Reset Your password</h1>
        <form onSubmit={mailnow} action="" method="post">
          <button type='submit'>send</button>
        </form>
      </div>
    </div>
  )
}

export default page