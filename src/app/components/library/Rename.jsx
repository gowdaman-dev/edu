"use client"
//need to handle error
import axios from 'axios';
import React,{useState,useRef} from 'react'
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
 function Rename(props) {
  const id=props.id
  const refRename=useRef()
  const [fileName, setFileName] = useState(props.name)
  const handleChange = (e) => {
   refRename.current.classList.remove("border-[#ef233c]","border-[1px]","text-[#ef233c]")
    setFileName( e.target.value)
  }
    const rename=async()=>{
    const fieldVal=refRename.current.value.trim()
 if(!fieldVal){
   refRename.current.classList.add("border-[#ef233c]","border-[1px]","text-[#ef233c]")
   refRename.current.value="enter any text"
 }
 else{
  const data={
    id:id,
    name:fileName
  }
await axios.put("http://localhost:3000/api/files",data).then((res)=>{
  if(res.status===200){
    props.update(fileName)
    props.closePop(null)
    props.animate(true)

  }
})
 }

  }
  return (<div className='absolute p-4 md:p-6 grid grid-flow-col bg-[#e5e7eb] rounded-md grid-cols-5'>


    <input type="text" ref={refRename} autoFocus className='h-10 rounded-tl-full rounded-bl-full outline-none pl-6 inline-block col-span-3 md:col-span-4' value={fileName} onChange={(e) => handleChange(e)} />

    <button className='text-white h-10 p-2 rounded-tr-full rounded-br-full bg-[#008c8c] active:bg-[#89dbd2] col-span-2 md:col-span-1' onClick={()=>rename()}><span className='inline-block   text-end text-white '>

      <MdOutlineDriveFileRenameOutline />
    </span>
      Rename</button>
  </div>
  )
}

export default Rename