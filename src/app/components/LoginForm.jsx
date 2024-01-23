"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import Image from "next/image";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn('credentials', {
        email, password, redirect: false
      });
      if (res.error) {
        setError("Invalid Email or Password")
        return;
      }
      router.replace('dashboard')
    } catch (error) {
      console.log(error)
    }
  }
  const [exist, setexist] = useState(true)
  return (
    <div className="flex items-center justify-center p-4 w-screen h-screen bg-[#F3FFF8]">
      <div className="w-full h-full  flex ">
        <div className="w-[50%] h-screen flex flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <Image src={'/logos/logo.png'} height={180} width={250} />
            <h2 className="text-3xl font-light py-2 text-[#0B1770]">Hello!</h2>
            <p className="text-gray-400 font-light">Please login to continue to <span className="text-[#0B1770]">Education</span></p>
          </div>
        </div>
        <div className="h-full w-[50%] grid place-items-center">
          <div className="h-fit w-[500px] rounded-lg border-2 border-[var(--web-primary-color)] px-4 py-10 grid place-items-center">
            <div className="py-6">
              <h1 className="text-[var(--web-primary-color)]">Login</h1>
            </div>
            <form className="w-2/3 flex flex-col gap-4" action="" method="post">
              {
                !exist && (
                  <div className="bg-[var(--web-primary-color)] rounded-lg flex justify-between items-center w-full px-4 py-2">
                    <img src="/logos/google.png" alt="google icon" className="p-1 bg-white rounded-full" srcset="" />
                    <h1 className="w-full text-center text-white">SignIn With Google</h1>
                  </div>
                )
              }
              <p className="text-gray-400 text-center">Or login using email:</p>
              <div className="flex flex-col gap-4">
                {
                  !exist && (
                    <>
                      <input type="email" placeholder="Your Email" />
                      <div className="flex gap-2">
                        <input type="checkbox" name="remember" id="remember" />
                        <label htmlFor="remember">Remember Me</label>
                      </div>
                    </>

                  )
                }
                {
                  exist && (
                    <input type="email" placeholder="Your Email" />
                  )
                }
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;