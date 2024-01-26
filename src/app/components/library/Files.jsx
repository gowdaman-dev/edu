"use client"
import React, { useEffect, useState } from 'react'
import fetchFiles from '@/app/dashboard/library/FetchFiles'
import { FaPlus } from "react-icons/fa";
async function Files() {
const [data,setData]=useState([])
try{
  const fetchdata=await fetchFiles()
  setData(fetchdata)
}catch(err){
  console.log(err);
}
  function handleChange(e){
    let file=e.target.files[0]
    const fileData=new FormData
    fileData.append("file",file)
    sendData(fileData)
      }
      async function sendData(data){
        await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}api/files`,{
          method: "POST",
          body:data
        })
      }
      console.log(data);
  return (
    <div>
<ul className='flex items-center justify-between h-16 border-b-2 border-teal-700'>
<li>
  <b>Shared Files ({})</b>
</li>
<li>

    <input type="file" accept='application/pdf' onChange={(e)=>handleChange(e)} name="file" id='fileUpload' hidden />
    <label htmlFor="fileUpload" className=' mr-4 border-2 flex cursor-pointer text-[#008C8C] justify-between items-center px-6 py-2 border-[#008c8c] rounded-md active:scale-90 active:bg-[#92D1CD]'>
      <span className='inline-block text-[#008C8C] pr-4  '><FaPlus/>
        </span><span>Upload</span></label>
</li>

</ul>
        

    </div>
  )
}

export default Files