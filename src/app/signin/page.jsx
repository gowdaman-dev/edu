'use client'
import React from 'react'
import LoginForm from '../components/LoginForm'

function page() {

  return (
          <div>
            <LoginForm />
          </div>
  )
}

export default page
<>
            <div className="">
                <form action="" className="flex flex-col gap-2">
                    <input type="text" name="reset password"  placeholder="Enter New Password" className="border rounded-md p-2"/>

                    <input type="text" name="conform password"  placeholder="Conform Password" className="border rounded-md p-2"/>

                    <button className="rounded-md p-2  bg-[--web-primary-color] text-white">
                        Change Password
                    </button>
                </form>
            </div>
            </>