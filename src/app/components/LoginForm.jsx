"use client";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react"
import Image from "next/image";
import LoaderPage from "./loader/LoadingPage";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()
  const { data: session } = useSession();
  const handleExist = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resUserExists = await fetch('/api/userExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })
      const { user } = await resUserExists.json()
      if (user) {
        setexist(true)
        setError('')
        setLoading(false);
        return
      } else {
        setError("Email does'nt exist")
        setLoading(false)
      }
    } catch (error) {
    }
  }
  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false
      })
      if (res.error) {
        setError('Invalid Password')
        setLoading(false)
        return
      }
      setLoading(false);
      router.replace('/dashboard')
    } catch (error) {
    }
  }
  const [exist, setexist] = useState(false)
  return (
    <>
      {
        loading ? <LoaderPage /> : ''
      }
      <div className="flex items-center bg-left bg-contain  bg-no-repeat justify-center min-w-[100vw] h-[100vh] overflow-x-hidden ">
        <div className="absolute top-0 left-0 z-[1] w-full h-full flex items-center justify-center">
          <div className="w-[60%] h-screen  bg-contain bg-right bg-no-repeat hidden xl:flex flex-col items-start justify-center">
            <div className="px-10 w-[80%] grid place-items-center">
              <Image src={'/loginlogo.svg'} height={500} width={500} className="hidden xl:block" alt="" />
            </div>
          </div>
          <div className="relative  z-10 h-full xl:w-[50%]  bg-left w-full md:px-0 px-4 flex items-center justify-center">
            <div className="h-fit lg:w-[500px] h-screen flex flex-col items-center justify-center rounded-lg lg:px-4 px-2 py-10 gap-2 ">
              <div className="py-6">
                <div className="flex flex-col items-center ">
                  <Image src={'/logos/logo.svg'} height={150} width={150} alt="logo" />
                  <h2 className="text-4xl py-2 text-[--web-primary-color] font-bold">Login</h2>

                  {
                    (session?.user) ? <p className="font-light text-gray-400"><strong>Redirecting....</strong></p> :
                      <p className="font-light text-gray-400">Please <strong>login</strong> to continue to <span className="text-[#0B1770]">Education</span></p>
                  }
                </div>
              </div>
              <form onSubmit={exist ? handleSubmit : handleExist} className="flex flex-col w-full gap-6 " action="" method="post">
                <div className="flex flex-col gap-3">
                  {
                    !exist && (
                      <>
                        <input autoFocus onChange={(e) => setEmail(e.target.value)} className="px-2 rounded-lg border border-[--web-primary-color] py-2 outline-none text-gray-700" type="email" placeholder="Your Email" />
                        {
                          error && (
                            <p className="text-[12px] px-2 font-light text-red-400">{error}</p>
                          )
                        }
                      </>
                    )
                  }
                  <>
                    {
                      exist && (
                        <>
                          <input autoFocus onChange={(e) => setPassword(e.target.value)} className="px-2 rounded-lg border border-[--web-primary-color] py-2 outline-none text-gray-700" type="password" placeholder="Your Password" />
                          {
                            error && (
                              <p className="text-[12px] px-2 font-light text-red-400">{error}</p>
                            )
                          }
                        </>
                      )
                    }
                  </>
                </div>
                <div className="">
                  {
                    !exist ? <>
                      <button className="w-full text-center rounded-lg bg-[--web-primary-color]  text-white py-2" type="submit">Next</button>
                    </> : <>
                      <button className="w-full text-center rounded-lg bg-[--web-primary-color] text-white py-2" type="submit">SignIn</button>
                    </>
                  }
                </div>
              </form>
              <div className="flex w-full justify-between items-center ">
                <p className=" text-gray-500 py-2 font-light text-[12px]">If you not have account! contact <a href="/new/member/request" className="md:text-black text-[--web-primary-color]">here</a></p>
                <a href="/forgotpassword/reset" className="text-[12px] font light text-gray-500 capitalize">reset password</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginForm
