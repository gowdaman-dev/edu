'use client'
import React, { useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
function page() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <>
      {
        (session?.user?.email)?router.replace('/dashboard'): (
          <div>
            <LoginForm />
          </div>
        )
      }
    </>
  )
}

export default page