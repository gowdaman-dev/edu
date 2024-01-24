<<<<<<< HEAD
"use client";
import React, { useContext, useEffect, useState } from "react";
import { signIn } from "next-auth/react"
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from 'next-auth/react';
import LoaderPage from "./loader/LoadingPage";
import { UserContext } from "@/ContextUser";
function LoginForm() {
  const { userData } = useContext(UserContext)
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleExist = async (e) => {
    e.preventDefault();
    setLoading(true);
=======
'use client'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import LoaderPage from './loader/LoadingPage'
function LoginForm () {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const handleExist = async e => {
    e.preventDefault()
    setLoading(true)
>>>>>>> d9c23bb0ed395fbaeb81a36123ed83730b721ef6
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
<<<<<<< HEAD
        const { _id } = user;
=======
>>>>>>> d9c23bb0ed395fbaeb81a36123ed83730b721ef6
        setexist(true)
        setError('')
        setLoading(false)
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
<<<<<<< HEAD
      setLoading(false);
      if(userData){
        console.log(userData._id);
      }
=======
      setLoading(false)
      router.replace('dashboard')
>>>>>>> d9c23bb0ed395fbaeb81a36123ed83730b721ef6
    } catch (error) {
      console.log(error)
    }
  }
  const [exist, setexist] = useState(false)
  return (
    <>
<<<<<<< HEAD
      {
        loading ? <LoaderPage /> : ''
      }
      {
        userData? router.replace(`/dashboard/${userData._id}`) :
          <div className="flex items-center justify-center p-4 w-[100vw] h-[100vh] overflow-x-hidden bg-[#F3FFF8]">
            <div className="h-screen w-screen absolute top-0 left-0 z-0 overflow-hidden">
              <div className="absolute md:-top-[150px] md:-left-[150px] -top-[50px] -left-[50px] h-fit w-fit opacity-[.5]">
                <div className="md:h-[300px] h-[150px] md:w-[300px] w-[150px] rounded-full bg-gradient-to-tr from-[--web-primary-color] to-[#F3FFF8] absolute top-0 md:left-[100px] left-[50px]"></div>
                <div className="md:h-[300px] h-[150px] md:w-[300px] w-[150px] rounded-full bg-gradient-to-tr from-[--web-primary-color] to-[#F3FFF8] absolute md:top-[100px] top-[50px] left-0"></div>
              </div>
              <div className="absolute md:-bottom-[150px] md:-right-[150px] -bottom-[60px] -right-[60px] h-fit w-fit opacity-[.5] ">
                <div className="md:h-[300px] h-[150px] md:w-[300px] w-[150px] rounded-full bg-gradient-to-tr from-[--web-primary-color] to-[#F3FFF8] absolute bottom-0 md:right-[100px] right-[50px]"></div>
                <div className="md:h-[300px] h-[150px] md:w-[300px] w-[150px] rounded-full bg-gradient-to-tr from-[--web-primary-color] to-[#F3FFF8] absolute md:bottom-[100px] bottom-[50px] right-0"></div>
=======
      {loading ? <LoaderPage /> : ''}
      {session?.user?.email ? (
        router.replace('/dashboard')
      ) : (
        <div className='flex items-center justify-center p-4 w-screen h-screen bg-[#F3FFF8]'>
          <div className='w-full h-full  flex '>
            <div className='w-[50%] h-screen flex flex-col items-center justify-center'>
              <div className='flex flex-col items-center'>
                <Image
                  src={'/logos/logo.png'}
                  height={180}
                  width={250}
                  alt='logo'
                />
                <h2 className='text-3xl font-light py-2 text-[#0B1770]'>
                  Hello!
                </h2>
                <p className='text-gray-400 font-light'>
                  Please login to continue to{' '}
                  <span className='text-[#0B1770]'>Education</span>
                </p>
>>>>>>> d9c23bb0ed395fbaeb81a36123ed83730b721ef6
              </div>
            </div>
            <div className='h-full w-[50%] grid place-items-center'>
              <div className='h-fit w-[500px] rounded-lg border-2 border-[var(--web-primary-color)] px-4 py-10 grid place-items-center'>
                <div className='py-6'>
                  <h1 className='text-[var(--web-primary-color)]'>Login</h1>
                </div>
                <form
                  onSubmit={exist ? handleSubmit : handleExist}
                  className='w-2/3 flex flex-col gap-4'
                  action=''
                  method='post'
                >
                  <div className='cursor-pointer bg-[var(--web-primary-color)] rounded-lg flex justify-between items-center w-full px-4 py-2'>
                    <Image
                      src={'/logos/google.png'}
                      height={30}
                      width={30}
                      alt='google icon'
                      className='p-1 bg-white rounded-full'
                    ></Image>
                    <h1
                      onClick={() => signIn('google')}
                      className='w-full text-center text-white'
                    >
                      SignIn With Google
                    </h1>
                  </div>
<<<<<<< HEAD
                  <form onSubmit={exist ? handleSubmit : handleExist} className="md:w-2/3  w-full flex flex-col gap-4" action="" method="post">
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
=======
                  <p className='text-gray-400 text-center'>
                    Or login using email:
                  </p>
                  <div className='flex flex-col gap-3'>
                    {!exist && (
                      <>
                        <input
                          onChange={e => setEmail(e.target.value)}
                          className='px-2 rounded-lg border border-[--web-primary-color] py-2 outline-none text-gray-700'
                          type='email'
                          placeholder='Your Email'
                        />
                        {error && (
                          <p className='text-[12px] px-2 font-light text-red-400'>
                            {error}
                          </p>
                        )}
                        <div className='flex gap-2'>
                          <input
                            type='checkbox'
                            name='remember'
                            id='remember'
                          />
                          <label htmlFor='remember'>Remember Me</label>
                        </div>
                      </>
                    )}
                    {exist && (
                      <>
                        <input
                          onChange={e => setPassword(e.target.value)}
                          className='px-2 rounded-lg border border-[--web-primary-color] py-2 outline-none text-gray-700'
                          type='password'
                          placeholder='Your Password'
                        />
                        {error && (
                          <p className='text-[12px] px-2 font-light text-red-400'>
                            {error}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                  <div className=''>
                    {!exist ? (
                      <>
                        <button
                          className='w-full text-center rounded-lg bg-[--web-primary-color] text-white py-2'
                          type='submit'
                        >
                          Next
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className='w-full text-center rounded-lg bg-[--web-primary-color] text-white py-2'
                          type='submit'
                        >
                          SignIn
                        </button>
                      </>
                    )}
                  </div>
                </form>
                <p className='text-gray-500 py-2 font-light text-[12px]'>
                  If you not have account! contact your{' '}
                  <span className='text-[--web-primary-color]'>Educator</span>
                </p>
>>>>>>> d9c23bb0ed395fbaeb81a36123ed83730b721ef6
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LoginForm
