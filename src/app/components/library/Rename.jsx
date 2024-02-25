"use client"
//need to handle error
import axios from 'axios';
import React,{useState,useRef} from 'react'
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { AnimatePresence,motion } from "framer-motion";

 function Rename(props) {
  const id=props.id
  const refRename=useRef()
  const [fileName, setFileName] = useState(props.name)
  const handleChange = (e) => {
   refRename.current.classList.remove("border-[#ef233c]","border-[1px]","text-[#ef233c]")
    setFileName( e.target.value)
  }
    const rename=async()=>{
      console.log("rename called ");
    const fieldVal=refRename.current.value.trim()
 if(!fieldVal){
  console.log("yes no feild val");
   refRename.current.classList.add("border-[#ef233c]","border-[1px]","text-[#ef233c]")
   refRename.current.value="enter any text"
 }
 else{
  const data={
    id:id,
    name:fileName
  }
  console.log("date sent");
await axios.put("/api/files",data).then((res)=>{
  console.log("yes response came");
  if(res.status===200){
    props.update(fileName)
    props.animate(true)
    props.rename(false)

  }
})
 }

  }
  return (<motion.div initial={{ opacity: .4 }} animate={{ opacity: 1 }} transition={{ type: 'spring', duration: .5 }} exit={{ opacity: 0 }}   className='absolute p-4 md:p-6 grid  border-[2px] rounded-lg bg-white grid-cols-5 grid-rows-5'>


    <input type="text" ref={refRename} autoFocus className='row-span-2 bg-gray-100 rounded-full outline-none pl-6 inline-block col-span-5 ' value={fileName} onChange={(e) => handleChange(e)} />

    <button className='text-white  p-2 rounded-full col-end-6 bg-[--web-primary-color] active:bg-blue-400 col-span-2 row-span-2 row-end-6' onClick={()=>rename()}><span className='inline-block   text-end text-white '>

      <MdOutlineDriveFileRenameOutline />
    </span>
      Rename</button>

    <button className='text-black  p-2 rounded-full col-end-3 bg-gray-200 active:bg-blue-400 col-span-2 row-span-2 row-end-6' onClick={()=>props.rename(false)}><span className='inline-block   text-end text-white '>

</span>
cancel</button>
  </motion.div>
  )
}

export default Rename