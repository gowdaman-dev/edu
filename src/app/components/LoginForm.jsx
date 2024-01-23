"use client";
import React, { useState } from "react";
import Link from "next/link";
import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation";
import Image from "next/image";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const res = await signIn('credentials',{
        email,password,redirect:false
      });
      if(res.error){
        setError("Invalid Email or Password")
        return;
      }
      router.replace('dashboard')
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className="flex">
      <div className="w-[50%] h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <Image src={'/logo.png'} height={180} width={250} />
          <h2 className="text-4xl text-[var(--web-primary-color)]">Hello!</h2>
          <p className="text-gray-400 font-light">Please login to continue to <span className="text-[var(--web-primary-color)]">Education</span></p>
        </div>
      </div>
      <div className="w-[50%] h-screen"></div>
    </div>
  );
}

export default LoginForm;