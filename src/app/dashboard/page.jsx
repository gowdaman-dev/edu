'use client'
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import LoaderPage from '../components/loader/LoadingPage';
function page() {
  const [userId, setUserId] = useState();
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    const userinfoga = async () => {
      try {
        const resUserExists = await fetch("/api/userinfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email:session?.user?.email })
        })
        const { user } = await resUserExists.json()
        if (user) {
          setUserId(user)
          router.replace(`/dashboard/${userId['_id']}`)
          console.log(user);
          return
        } else {
          signOut()
          console.log('error');
        }
      } catch (error) {
        console.log("error :", error);
      }
    }
    userinfoga()
  })
  console.log(userId);
  return (
    <LoaderPage/>
  )
}

export default page