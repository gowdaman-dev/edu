import Image from 'next/image'
import React from 'react'
function page() {
  return (
    <div className='w-screen'>
      <div className="nav w-screen py-2 flex justify-between">
        <Image src={'/mailimg.jpg'} height={240} hidden width={850}></Image>
      </div>
    </div>
  )
}

export default page