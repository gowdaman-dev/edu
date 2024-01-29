"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react"
import Image from "next/image";
import LoaderPage from "./loader/LoadingPage";
import { useRouter } from "next/navigation";
function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()
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
      console.log('error :', error)
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
      console.log(error)
    }
  }
  const [exist, setexist] = useState(false)
  return (
    <>
      {
        loading ? <LoaderPage /> : ''
      }
      <div className="flex items-center justify-center p-4 w-[100vw] h-[100vh] overflow-x-hidden bg-[#F3FFF8]">
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
        <div className="absolute top-0 left-0 z-[1] w-full h-full flex items-center justify-center ">
          <div className="w-[50%] h-screen hidden lg:flex flex-col items-center justify-center">
            <div className="flex flex-col items-center">
              <Image src={'/logos/logo.svg'} height={280} width={350} alt="logo" />
              <h2 className="text-4xl font-light py-2 text-[#0B1770]">Hello!</h2>
              <p className="font-light text-gray-400">Please login to continue to <span className="text-[#0B1770]">Education</span></p>
            </div>
          </div>
          <div className="relative z-10 h-full lg:w-[50%] w-full md:px-0 px-4 grid place-items-center">
            <div className="h-fit lg:w-[500px] w-full rounded-lg md:border-2 border-none border-[var(--web-primary-color)] lg:px-4 px-2 py-10 grid place-items-center">
              <div className="py-6">
                <h1 className="text-[var(--web-primary-color)] lg:flex hidden text-2xl">Login</h1>
                <div className="flex flex-col items-center lg:hidden">
                  <Image src={'/logos/logo.png'} height={100} width={100} alt="logo" />
                  <h2 className="text-3xl font-light py-2 text-[#0B1770]">Hello!</h2>
                  <p className="font-light text-gray-400">Please login to continue to <span className="text-[#0B1770]">Education</span></p>
                </div>
              </div>
              <form onSubmit={exist ? handleSubmit : handleExist} className="flex flex-col w-full gap-4 " action="" method="post">
                <div className="flex flex-col gap-3">
                  {
                    !exist && (
                      <>
                        <input onChange={(e) => setEmail(e.target.value)} className="px-2 rounded-lg border border-[--web-primary-color] py-2 outline-none text-gray-700" type="email" placeholder="Your Email" />
                        {
                          error && (
                            <p className="text-[12px] px-2 font-light text-red-400">{error}</p>
                          )
                        }
                        <div className="flex gap-2">
                          <input type="checkbox" name="remember" id="remember" />
                          <label htmlFor="remember">Remember Me</label>
                        </div>
                      </>

                    )
                  }
                  <>
                    {
                      exist && (
                        <>
                          <input onChange={(e) => setPassword(e.target.value)} className="px-2 rounded-lg border border-[--web-primary-color] py-2 outline-none text-gray-700" type="password" placeholder="Your Password" />
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
                      <button className="w-full text-center rounded-lg bg-[--web-primary-color] text-white py-2" type="submit">Next</button>
                    </> : <>
                      <button className="w-full text-center rounded-lg bg-[--web-primary-color] text-white py-2" type="submit">SignIn</button>
                    </>
                  }
                </div>
              </form>
              <p className="text-gray-500 py-2 font-light text-[12px]">If you not have account! contact your <span className="text-[--web-primary-color]">Educator</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginForm
